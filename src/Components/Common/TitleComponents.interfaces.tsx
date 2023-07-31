export interface HeaderTitleProps {
    header: string;
    fontSize: number | undefined;
}

export interface SVGElementProps {
    svgImage: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>
}
