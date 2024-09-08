import Styles from "./DropDown.module.css";

const DropDownItems = (props) => {
  const { onClick, children } = props;

  return (
    <div className={Styles.dropDownItem} onClick={onClick}>
      {children}
    </div>
  );
};

export default DropDownItems;
