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
          and always strive to create high-quality work. In my free time, you can find
          me toiling away with worldbuilding and narrative design. All that led me to a
          life of programming, for some reason.
        </p>
        <p>
          I also volunteer as a chapter associate for IGDA Malaysia. I do networking events,
          workshops, game jams and generally open to any community-building events. If I don't
          host it, I hope to frequent it. See you at LevelUp KL!
        </p>
        <p>
          I am always eager to learn and grow,
          so I'm always open to more opportunities for so.
          Talk to me to find out more about my passions!
          (Hopefully I can implement a section below for that)
        </p>
        <p>
          Contact me:<br />
          <i>
            magthylius@gmail.com<br />
            <a href="https://www.linkedin.com/in/jonathantangziyi/">LinkedIn</a>
          </i>
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
  const [tabIndex, setTabIndex] = useState(0);
  const { readMode } = props;
  const images: string[] = [PlaceholderImagePath, PlaceholderImagePath];
  const imagesMap = images.map((imagePath, index) => {
    return <img src={imagePath} alt={index.toString()} className="displays" />
  })

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const tabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
            <Tab label="AAA METAVERSE" {...tabProps(0)} wrapped />
            <Tab label="DIGITAL TWIN" {...tabProps(1)} />
            <Tab label="AR PRODUCT" {...tabProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabIndex} index={0}>
          <b>This is an undisclosed project, expected to be announced in 2023.</b>
          <p>
            AAA metaverse project that is co-developed with a major international company. Intended for a massive
            audience with live content support and major collaborations.
          </p>
          <p>
            Built the program foundation, and was critical to the backbone structure of the program.
            Developed the multiplayer foundation, both before and after the platform port, using
            transport systems and node package systems.
            Authored the UI, input, gameplay framework systems, high involvement in project in terms of
            development. Established coding conventions and standards for the team.
          </p>
          <p><i>
            <b>KEY RESPONSIBILITIES</b><br />
            Foundational, Networking, UI, Gameplay, Platform Porting
          </i></p>
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          <b>This is an undisclosed project, no disclosure expectancy.</b>
          <p>
            Digital twin program that visualizes processess, resources, and usages of selected projects.
            Ability to scroll time and strategize resource allocation and facilitate human resources.
            Real-time simulation of said process with realistic visual fidelity.
          </p>
          <p>
            Built the program foundation, and was critical to the backbone structure of the program.
            Authored the UI system and built foundational system on networking handling.
          </p>
          <p><i>
            <b>KEY RESPONSIBILITIES</b><br />
            Foundational, Networking, UI
          </i></p>
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={2}>
          <b>This is an undisclosed project, no disclosure expectancy.</b>
          <p>
            Augmented reality program that is meant to be deployed on relevant platform with concurrent
            connections with variations of said program in different devices. Provides simulated education
            experience in a professional capacity.
          </p>
          <p>
            Stability restructurement and gameplay programming. Wrote shaders for custom implementation on both
            2D and 3D space. Authored the UI systems and improved cross-platform synchronization.
          </p>
          <p><i>
            <b>KEY RESPONSIBILITIES</b><br />
            Foundational, Technical Art, UI
          </i></p>
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
        THIS PAGE IS STILL WIP :(
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
      <div className="readModeTab">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={readMode} onChange={onReadModeChange} aria-label="basic tabs example" centered>
            <Tab label="Normal" {...OnReadModeChange(0)} />
            <Tab label="TLDR" {...OnReadModeChange(1)} />
          </Tabs>
        </Box>
      </div>
      <h1 className="headerTitle" style={{ fontSize: 25 }}>
        === {`{`} PROFESSIONAL EXPERIENCES {`}`} ===
      </h1>
      <ExperienceSection readMode={readMode} />
      <h1 className="headerTitle" style={{ fontSize: 25 }}>
        === {`{`} AWARDS {`}`} ===
      </h1>
      <p>WIP!</p>
    </div>);
}
