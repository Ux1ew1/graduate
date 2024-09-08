import Styles from "./Selector.module.css";

const SelectorItem = (props) => {
  const { onClick, children } = props;

  return (
    <div className={Styles.selectorItem} onClick={onClick}>
      {children}
    </div>
  );
};

export default SelectorItem;
