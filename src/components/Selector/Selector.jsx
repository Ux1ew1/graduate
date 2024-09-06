import { useCallback, useEffect, useRef } from "react";
import styles from "./Selector.module.css";

const Selector = (props) => {
  const { isOpen, onClose, children, className } = props;

  const selectorRef = useRef(null);

  const closeSelector = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleClick = useCallback(
    (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        closeSelector();
      }
    },
    [selectorRef, closeSelector]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleClick, handleKeyPress]);

  return (
    <div className={className}>
      <div className={styles.selector} ref={selectorRef}>
        {children}
      </div>
    </div>
  );
};
export default Selector;
