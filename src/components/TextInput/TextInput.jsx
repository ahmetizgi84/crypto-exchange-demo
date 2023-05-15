import React from "react";
import { EyeSlash } from "react-bootstrap-icons";
import styles from "./TextInput.module.css";
import cn from "classnames";

const TextInput = (props) => {
  const { leftIcon = null, rightIcon = null, type = "text" } = props;

  return (
    <div className={cn([styles.container])} tabIndex={2}>
      {leftIcon && (
        <div className={cn([styles.iconContainer, "justify-content-center align-items-center d-flex"])}>
          <button type="button" className={cn([styles.iconButton, "p-0 m-0"])}>
            <EyeSlash color="#54B489" size={18} />
          </button>
        </div>
      )}

      <input className={cn([styles.textInput, "px-2"])} type={type} />
      {/* {rightIcon && ( */}
      <div className={cn([styles.iconContainer, "justify-content-center align-items-center d-flex"])}>
        <button type="button" className={cn([styles.iconButton, "p-0 m-0"])}>
          <EyeSlash color="#54B489" size={18} />
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default TextInput;
