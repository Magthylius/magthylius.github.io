import { HeaderTitleProps } from "./TitleComponents.interfaces";
import "../Common/TitleComponents.styles.scss"

export function HeaderTitle(props: HeaderTitleProps) {
  return (
    <h1 style={{ fontSize: props.fontSize }}>
      {props.header}
    </h1>
  );
}

