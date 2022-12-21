import React, { useEffect } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

const ShowAlert = ({ alert, removeAlert, list }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [list]);

  return (
    <>
      <div className="popup">
        <span className="exclamation">
          <AiFillExclamationCircle />
        </span>
        <h1 className={`popup__text   popup__text__${alert.type} `}>
          {alert.msg}
        </h1>
      </div>
    </>
  );
};

export default ShowAlert;
