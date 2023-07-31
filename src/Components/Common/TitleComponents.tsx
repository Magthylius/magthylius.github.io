import { HeaderTitleProps, SVGElementProps } from "./TitleComponents.interfaces";
import "../Common/TitleComponents.styles.scss"

export function HeaderTitle(props: HeaderTitleProps) {
  return (
    <h1 style={{ fontSize: props.fontSize }}>
      {props.header}
    </h1>
  );
}

export function SVGElement(props: SVGElementProps) {
  return (
    <div>
      <props.svgImage style={{ width: "100%" }} />
    </div>
  );
}