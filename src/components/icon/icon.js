import SvgColor from "../svg-color";

export function Icon(props) {
  const {children, ...rootProps} = props;
  return <>
    <SvgColor src={`/assets/icons/navbar/${children}.svg`} {...rootProps}/>
  </>
}