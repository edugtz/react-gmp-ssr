import React from "react";

import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span className={styles['app-title']}>
                <b>netflix</b>roulette
      </span>
        </footer>
    );
};

export default Footer;
