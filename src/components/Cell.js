import React from "react";
import "../styles.css";

const Cell = props => {
  return <div className={props.alive ? "cell alive" : "cell dead"} />;
};

export default Cell;
