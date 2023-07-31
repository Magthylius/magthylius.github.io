import { HeaderTitle, SVGElement } from "../../Components/Common/TitleComponents";
import { ReactComponent as UnitySVG } from "../../Graphics/Engines/unity.svg"

function Introduction() {
  return (
    <div className="intro">
      Hi there! I'm a passionate game developer in design, writing and programming. I am very dedicated to game design, architecture and development, and always strive to create high-quality work.
    </div>);
}

export default function PortfolioPage() {
  return (
    <div>
      <Introduction></Introduction>
      <HeaderTitle header={"TECHNICAL SKILLSETS"} fontSize={25} />
      <SVGElement svgImage={UnitySVG} />
    </div>);
}
