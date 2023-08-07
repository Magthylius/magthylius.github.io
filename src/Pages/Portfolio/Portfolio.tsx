import { HeaderTitle } from "../../Components/Common/TitleComponents";
import { ReactComponent as UnitySVG } from '../../Graphics/Engines/unity.svg'
import { ReactComponent as UnrealSVG } from '../../Graphics/Engines/ue.svg'

import "./Portfolio.styles.scss"

function ResumeButton() {
  return (
    <a href="../../Assets/Resume/ResumeOfficial.pdf" download={"Jonathan Tang - Resume.pdf"}>
      Resume
    </a>
  );
}

function Introduction() {
  return (
    <div className="intro">
      Hi there! I'm a passionate game developer in design, writing and programming. I am very dedicated to game design, architecture and development, and always strive to create high-quality work.
    </div>);
}

interface ISectionProps {
  svgImage: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }>
  svgImageTitle: string;
  header: string;
  body: any;
}

function Section(props: ISectionProps) {
  return (
    <div className="clickableSection">
      <props.svgImage className="svgImage" title={props.svgImageTitle} />
      <div className="text">
        <div className="header">
          <b>{props.header}</b>
        </div>
        <div className="details">
          {props.body}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="mainContainer">
      <div className="disclaimer">
        THIS PAGE IS STILL WIP!
      </div>
      <ResumeButton />
      <Introduction />
      <HeaderTitle header={"TECHNICAL SKILLSETS"} fontSize={25} />
      <Section
        svgImage={UnitySVG}
        svgImageTitle="Unity engine logo"
        header="UNITY"
        body=
        {
          <div>
            - Built and authored UI and foundation frameworks<br />
            - Implemented UI elements with extreme precision, detail, and scalability<br />
            - Developed engine tools for designers and non-programmers<br />
            - Created multiplayer networking backend frameworks (dedicated servers)<br />
            - Integrated external APIs to facilitate communication with third-party applications<br />
            - Engineered render pipeline effects and features<br />
          </div>
        } />
      <Section
        svgImage={UnrealSVG}
        svgImageTitle="Unreal Engine logo"
        header="UNREAL ENGINE"
        body=
        {
          <div>
            - Built and authored UI and foundation frameworks<br />
            - Developed engine tools for designers and non-programmers<br />
            - Engineered massively multiplayer online networking servers<br />
            - Integrated external APIs to facilitate communication with third-party applications<br />
          </div>
        } />
    </div>);
}
