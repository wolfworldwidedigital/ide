import { GETTING_STARTED_GUIDE_URL } from '@/commons/constants';
import useMountedState from '@/hooks/useMountedState';
import useDnDStore from '@/stores/useDnDStore';
import Image from 'next/image';
import React from 'react';

type ButtonProps = React.HTMLProps<HTMLDivElement> & {
  name: string;
};
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div {...props}>
      <div className="bg-gray-100 border border-gray-300 rounded skew-x-12 cursor-pointer hover:bg-gray-200 hover:border-gray-400 inline-block">
        <p className="-skew-x-12 pr-8 pl-2 text-gray-700 font-medium text-sm">{props.name}</p>
      </div>
    </div>
  );
};
const EmptyWorkstation = () => {
  const { nodes } = useDnDStore();
  const isMounted = useMountedState();
  const [panelVisible, setPanelVisible] = React.useState(true);

  const onNodeDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setPanelVisible(false);
    },
    [],
  );

  const onClickNewProject = () => setPanelVisible(false);
  const onClickGettingStartedGuide = () => {
    window.open(GETTING_STARTED_GUIDE_URL, '_blank');
  };

  if (!panelVisible || !isMounted()) return <></>;
  if (isMounted() && nodes.length) return <></>;
  return (
    <div
      className="flex w-[calc(100vw-320px)] justify-center items-center top-0 mt-11 h-[calc(100vh-44px)] absolute px-12 xl:px-64 z-10"
      draggable={false}
      onDragEnterCapture={onNodeDragOver}
    >
      <div>
        <div className="flex flex-col items-center justify-center opacity-60">
          <Image priority src={'/x-force-ide.svg'} width={217} height={69} alt="software 2.0" draggable={false} />
          <p className="text-bold text-2xl pt-6">
            Creëer taakspecifieke agent workforces voor uw aangepaste bedrijfslogica met behulp van diagrammen.
          </p>
          <p className="font-medium pt-12 whitespace-pre-line">
            Je kunt de AI agents van Cusmato vanuit de &quot;linkerbalk&quot; naar hier slepen, ze verbinden zoals je
            wilt, ze een initiële taak geven, ze exporteren als een Python Script en ze uitvoeren op je toestel.
            {'\n\n'}
            Volg de development van onze AI op de voet{' '}
            <span className="text-blue-500 cursor-pointer underline" onClick={onClickGettingStartedGuide}>
              Begin met Cusmato!
            </span>{' '}
            guide.
            {'\n\n\n'}
            Cusmato ondersteunt bedrijven door hen Cloud Runs te bieden met ons besturingssysteem dat is gebouwd om LLM
            te beheren.{' '}
            <a
              className="text-blue-500 cursor-pointer underline"
              href="mailto:enterprise@cusmato.app"
              draggable={false}
            >
              enterprise@cusmato.app
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col pt-12 opacity-75">
          <Button name={'New Project'} onClick={onClickNewProject} />
          <Button name={'Starten met Cusmato Guide'} className="pt-1" onClick={onClickGettingStartedGuide} />
        </div>
      </div>
    </div>
  );
};

export default EmptyWorkstation;
