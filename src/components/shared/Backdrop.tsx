import PropTypes from "prop-types";
import React from "react";
import { Circles } from "react-loader-spinner";

import styles from "./shared.module.scss";

interface BackdropProps {
  show: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ show }) => (
  <div
    className={`${styles.backdrop} ${show ? styles.display : styles.hidden}`}
  >
    <Circles color="" />
  </div>
);

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Backdrop;
