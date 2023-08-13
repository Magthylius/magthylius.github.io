import { HeaderTitleProps, SVGElementProps } from "./TitleComponents.interfaces";
import "../Common/TitleComponents.styles.scss"
import { Box, Typography } from "@mui/material";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}