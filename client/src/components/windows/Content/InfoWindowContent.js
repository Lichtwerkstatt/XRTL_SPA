import styles from "../CSS/InfoWindowContent.module.css";
import bgTeam from "../../media/images/xrtl_team.png";
import {Trans} from "react-i18next";
import React from "react";

/**
 * Information text
 * 
 * @description This file contains the content and text for the information window.
 *  
 * @returns {React.ReactElement} Content and Text for the information window
 */
const InfoWindowContent = () => {
  return (

    <div className={styles.mainWrapper} style={{ backgroundImage: "url(\"" + bgTeam + "\")" }}
    >
      <Trans i18nKey='info.content'
             components={{
               l1: <a href="https://github.com/Lichtwerkstatt/XRTL_SPA">Git Repo</a>,
               l2: <a href="mailto:team@lichtwerkstatt-jena.de">Contact us.</a>
             }}
      />
    </div>
  )
}
export default InfoWindowContent;