import { useCallback, useEffect, useRef } from "react";
import styles from "./DropDown.module.css";

const DropDown = (props) => {
  const { isOpen, onClose, children, className } = props;

  const DropDownRef = useRef(null);

  const closeDropDown = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleClick = useCallback(
    (event) => {
      if (DropDownRef.current && !DropDownRef.current.contains(event.target)) {
        closeDropDown();
      }
    },
    [DropDownRef, closeDropDown]
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
      <div className={styles.dropDown} ref={DropDownRef}>
        {children}
      </div>
    </div>
  );
};
export default DropDown;
