import { CustomTabPanel } from "../../Components/Common/TitleComponents";
import Slider, { Settings } from "react-slick"
import { ReactComponent as UnitySVG } from '../../Graphics/Engines/unity.svg'
import { ReactComponent as UnrealSVG } from '../../Graphics/Engines/ue.svg'

import "./Portfolio.styles.scss"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";

const PlaceholderImagePath = "Assets/Graphics/placeholder.png";

enum ReadMode {
  Normal,
  TLDR
}

interface ISliderProps {
  content: any
}

interface IExperienceSectionProps {
  readMode: ReadMode
}

function ShowcaseCarousel(props: ISliderProps) {
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
        <p>
          Hi there! I'm a passionate game developer in design, writing and programming.
          I am very dedicated to game design, architecture and development,
          and always strive to create high-quality work.
        </p>
        <p>
          I am always eagerto learn and grow,
          so I'm always open to more opportunities for so.
          Talk to me to find out more about my passions!
        </p>
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

function ExperienceSection(props: IExperienceSectionProps) {
  const { readMode } = props;

  const timelineLabel =
    readMode === ReadMode.Normal ? "OCT 2021 - CURRENT" : "2 YEARS";
  const promotionTrack =
    readMode === ReadMode.Normal ? "Junior Game Progammer → Game Programmer" : "Junior → Mid-Level Programmer";
  const description =
    readMode === ReadMode.Normal ?
      <p>
        Throughout my tenure, I've demonstrated a natural aptitude for leadership and a proactive
        approach to project involvement. In challenging times, I proactively provide supprt to fellow
        developers and took intiative to guide newcomers on navigating the codebase.
        Regularly engaging in discussions about structural design, I've contributed to the creation
        of many streamlined and accessible systems benefitting the entire team.
        Notably, I've authored and developed numerous foundational systems in my projects,
        taking pride in iterative improvements that have established a strong and customizable
        foundation for our team's ongoing development efforts.
      </p> :
      <p>
        During my time here, I've shown a knack for leadership and an active role in projects.
        In tough times, I lend a hand to fellow developers and help newcomers grasp the code.
        I often discuss design for easy-to-use systems that benefit the team. I've created core systems
        with pride, improving them over time for the team.
      </p>

  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  function TabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const images: string[] = [PlaceholderImagePath, PlaceholderImagePath];
  const imagesMap = images.map((imagePath, index) => {
    return <img src={imagePath} alt={index.toString()} className="displays" />
  })

  return (
    <div className="experienceSection">
      <h1>Streamline Studios</h1>
      <div className="timeline">{timelineLabel}</div>
      <div className="promotionTrack">{promotionTrack}</div>
      <div className="description">
        {description}
      </div>
      <div className="carousel">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={onTabChange} aria-label="basic tabs example" centered>
            <Tab label="AAA METAVERSE" {...TabProps(0)} wrapped />
            <Tab label="DIGITAL TWIN" {...TabProps(1)} />
            <Tab label="AR PRODUCT" {...TabProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabIndex} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={2}>
          Item Three
        </CustomTabPanel>
        <ShowcaseCarousel content={imagesMap} />
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [readMode, setReadMode] = useState(ReadMode.Normal);

  const onReadModeChange = (event: React.SyntheticEvent, newValue: number) => {
    setReadMode(newValue);
  };

  function OnReadModeChange(mode: ReadMode) {
    return {
      id: `simple-tab-${mode}`,
      'aria-controls': `simple-tabpanel-${mode}`,
    };
  }

  return (
    <div className="mainContainer">
      <div className="disclaimer">
        THIS PAGE IS STILL WIP!
      </div>
      <Introduction />
      {/* <HeaderTitle header={"TECHNICAL SKILLSETS"} fontSize={25} />
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
        } /> */}
      <h1 className="headerTitle" style={{ fontSize: 25 }}>
        === {`{`} PROFESSIONAL EXPERIENCES {`}`} ===
      </h1>
      <div className="readModeTab">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={readMode} onChange={onReadModeChange} aria-label="basic tabs example" centered>
            <Tab label="Normal" {...OnReadModeChange(0)} />
            <Tab label="TLDR" {...OnReadModeChange(1)} />
          </Tabs>
        </Box>
      </div>
      <ExperienceSection readMode={readMode} />

    </div>);
}
