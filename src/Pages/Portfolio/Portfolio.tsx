import { HeaderTitle } from "../../Components/Common/TitleComponents";
import Slider, { Settings } from "react-slick"
import { ReactComponent as UnitySVG } from '../../Graphics/Engines/unity.svg'
import { ReactComponent as UnrealSVG } from '../../Graphics/Engines/ue.svg'

import "./Portfolio.styles.scss"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PlaceholderImagePath = "Assets/Graphics/placeholder.png";

interface ISliderProps {
  content: any
}

function ShowcaseCorousel(props: ISliderProps) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  }

  return (
    <div>
      <Slider {...settings}>
        {props.content}
      </Slider>
    </div >
  );
}

function ResumeButton() {
  return (
    <button className="resumeButton">
      <a href="Assets/Resume/ResumeOfficial.pdf" download={"Jonathan Tang - Resume.pdf"}>
        Get my resume
      </a>
    </button>
  );
}

function Introduction() {
  return (
    <div>
      <div className="intro">
        Hi there! I'm a passionate game developer in design, writing and programming. I am very dedicated to game design, architecture and development, and always strive to create high-quality work.
      </div>
      <ResumeButton />
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

function SkillsetSection(props: ISectionProps) {
  return (
    <div className="skillsetSection">
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

function ExperienceSection() {
  let bShowYears = false;
  const timelineLabel = "OCT 2021 - CURRENT";
  const yearsOfExperience = "2 YEARS OF EXPERIENCE";

  const onTimelineHover = () => {
    bShowYears = true;
  }

  const images: string[] = [PlaceholderImagePath, PlaceholderImagePath];
  const imagesMap = images.map((imagePath, index) => {
    return <img src={imagePath} alt={index.toString()} className="displays" />
  })

  return (
    <div className="experienceSection">
      <h1>Streamline Studios</h1>
      <div className="timeline" onMouseEnter={onTimelineHover}>
        {bShowYears ? yearsOfExperience : timelineLabel}
      </div>
      <div className="description">
        Description
      </div>
      <div className="corousel">
        <ShowcaseCorousel content={imagesMap} />
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
      <Introduction />
      <HeaderTitle header={"TECHNICAL SKILLSETS"} fontSize={25} />
      <SkillsetSection
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
      <SkillsetSection
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
      <HeaderTitle header="PROFESSIONAL EXPERIENCES" fontSize={25} />
      <ExperienceSection />
    </div>);
}
