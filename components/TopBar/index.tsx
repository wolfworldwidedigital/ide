import { ModalContext } from '@/contexts/ModalContext';
import { toPng } from 'html-to-image';
import React from 'react';
import { getRectOfNodes, getTransformForBounds, useReactFlow } from 'reactflow';

import { GETTING_STARTED_GUIDE_URL } from '@/commons/constants';
import { ContextMenuItemType } from '@/commons/types';
import ContextMenuModal from '@/components/modals/ContextMenu/ContextMenuModal';
import ToastMessageModal from '@/components/modals/ToastMessageModal';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useAppStore from '@/stores/useAppStore';
import useDnDStore from '@/stores/useDnDStore';
import { CODE_BUILDER } from '@/transpiler/primitive';

type MenuItemProps = React.HTMLProps<HTMLDivElement> & {
  name: string;
};
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { name } = props;
  return (
    <div {...props}>
      <div className="bg-gray-100 border border-gray-300 rounded skew-x-12 cursor-pointer hover:bg-gray-200 hover:border-gray-400">
        <p className="-skew-x-12 pr-8 pl-2 text-gray-700 font-medium text-sm">{name}</p>
      </div>
    </div>
  );
};

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 768;

const TopBar: React.FC = () => {
  const { setModal } = React.useContext(ModalContext);
  const { getNodes, getEdges } = useReactFlow();
  const { nodes, clearGraph } = useDnDStore();
  const { oaiKey } = useAppStore();
  const { validate } = React.useContext(ValidatorContext);

  const onClickExportAsPython = () => {
    const isValid = validate(nodes);
    if (!isValid) {
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([CODE_BUILDER(getNodes(), getEdges(), oaiKey)], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = 'my x-force workflow.py';
    document.body.appendChild(element);
    element.click();
  };
  const onClickExportAsPNG = async () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, IMAGE_WIDTH, IMAGE_HEIGHT, 0.5, 2);
    const viewport = document.querySelector('.react-flow__viewport');
    if (!viewport) return null;
    const png = await toPng(viewport as HTMLElement, {
      backgroundColor: '#fff',
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      style: {
        width: '1024',
        height: '768',
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    });
    const a = document.createElement('a');
    a.setAttribute('download', 'my x-force workflow.png');
    a.setAttribute('href', png);
    a.click();
  };

  const onSave = () => {
    setModal(<ToastMessageModal msg="Your changes are automatically saved." style={{ bottom: 44, right: 44 }} />);
  };
  const onClearGraph = () => {
    if (nodes) {
      if (confirm('Alle wijzigingen worden ongedaan gemaakt. Weet je zeker dat je een nieuw werkstation wilt maken?')) {
        clearGraph();
      }
    }
  };
  const CTX_MENU__FILE: ContextMenuItemType[] = [
    { item: 'New', onClick: onClearGraph },
    { item: 'Save', onClick: onSave },
    {
      item: 'Export As',
      subs: [
        { item: 'Python Code...', onClick: onClickExportAsPython },
        { item: 'PNG...', onClick: onClickExportAsPNG },
      ],
    },
  ];

  const onClickFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(<ContextMenuModal menu={CTX_MENU__FILE} style={{ left: e.pageX, top: e.pageY }} />);
  };
  return (
    <div className={`absolute top-0 w-[calc(100vw-320px)] bg-gray-50 h-11 border-b border-b-gray-200 z-10 opacity-95`}>
      <div className="flex h-11 items-center px-4 justify-between">
        <div>
          <MenuItem name="File" onClick={onClickFile} />
        </div>
        <div className="flex">
          <MenuItem name="Starten met Cusmato" onClick={() => window.open(GETTING_STARTED_GUIDE_URL, '_blank')} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
