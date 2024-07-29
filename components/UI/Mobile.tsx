import { GETTING_STARTED_GUIDE_URL } from '@/commons/constants';
import Image from 'next/image';
import React from 'react';

type WelcomePanelButtonProps = React.HTMLProps<HTMLDivElement> & {
  name: string;
};
const WelcomePanelButton: React.FC<WelcomePanelButtonProps> = (props) => {
  return (
    <div {...props}>
      <div className="bg-gray-100 border border-gray-300 rounded skew-x-12 cursor-pointer hover:bg-gray-200 hover:border-gray-400 inline-block">
        <p className="-skew-x-12 pr-8 pl-2 text-gray-700 font-medium text-sm">{props.name}</p>
      </div>
    </div>
  );
};
const MobilePanel = () => {
  const onClickGettingStartedGuide = () => {
    window.open(GETTING_STARTED_GUIDE_URL, '_blank');
  };

  return (
    <div className="flex justify-center top-0 mt-11 h-[calc(100vh-44px)] absolute px-12 xl:px-64 z-10">
      <div>
        <div className="flex flex-col items-center justify-center">
          <Image
            priority
            src={'/x-forceIDE.png'}
            width={150}
            height={69}
            alt="software 2.0"
            quality={100}
            unoptimized
          />
          <p className="text-bold text-2xl pt-6 text-center">
            Creëer taakspecifieke agent workforces voor uw aangepaste bedrijfslogica met behulp van diagrammen.
          </p>
          <p className="font-normal pt-12 whitespace-pre-line text-center">
            Je kunt onze AI agenten bij Cusmato uit het &quot;zijmenu&quot; slepen, verbinden met de taken en tools
            zoveel je maar wilt. Volg onze ontwikkeling op de voet,{' '}
            <span className="text-blue-500 cursor-pointer underline" onClick={onClickGettingStartedGuide}>
              Beginnen met Cusmato
            </span>{' '}
            gids.
            {'\n\n'}
            We ondersteunen bedrijven door hen Cloud Runs te bieden met ons besturingssysteem dat is ontwikkeld om LLM
            te ondersteunen.{' '}
            <a className="text-blue-500 cursor-pointer underline" href="mailto:enterprise@cusmato.app">
              enterprise@cusmato.app
            </a>
            .
            {/* {'\n\n'}
            Learn more about Cusmato <span className="text-blue-500 cursor-pointer underline">cusmato.app/about</span>
            ! */}
          </p>
          <Image
            priority
            src={'/demo.gif'}
            width={700}
            height={500}
            alt={'software 2.0 demo'}
            quality={100}
            className="pt-6"
          />
        </div>
        <div className="flex flex-col py-12">
          <div className="flex items-center">
            <WelcomePanelButton
              name={'Start a new project'}
              className="whitespace-nowrap"
              onClick={() => alert("Currently we're not supporting mobile runs, please enter with your computer!")}
            />
            <p className="text-xs pl-2">(you need to start with a computer!)</p>
          </div>
          <WelcomePanelButton
            name={'Starten met Cusmato Guide'}
            className="whitespace-nowrap pt-2"
            onClick={onClickGettingStartedGuide}
          />
        </div>
      </div>
    </div>
  );
};

export default MobilePanel;
