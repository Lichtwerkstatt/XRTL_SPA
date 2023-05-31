import styles from "../CSS/InfoWindowContent.module.css"
import bgTeam from "../../media/images/xrtl_team.png"

const InfoWindowContent = (props) => {
  return (
    
    <div className={styles.mainWrapper}
      style={{ backgroundImage: "url(\"" + bgTeam + "\")" }}
    >
      Remote labs represent a groundbreaking approach to science education and collaboration, facilitating communication and experimentation from afar. However, creating remote access capabilities can be prohibitively expensive or technically challenging, particularly for non-IT and non-engineering disciplines. To make remote labs accessible across all fields, we need a user-friendly platform that enables researchers, assistants, and technical staff to implement them independently. To that end, we are proud to present XR TwinLab (XRTL), an open-source toolbox designed specifically for the field of Photonics. With its modular structure XRTL offers a flexible, web-based application for controlling optical experimental setups. This exciting project is currently being developed by the esteemed Abbe School of Photonics and the Open Makerspace Lichtwerkstatt Jena.

      Feel free to follow our <a href="https://github.com/Lichtwerkstatt/XRTL_SPA">Git Repo</a> or <a href="mailto:team@lichtwerkstatt-jena.de">Contact us.</a>

      <p>
        Best! Clara, Fabian, Falko, Jari and Johannes
      </p>

    </div>

  )
}
export default InfoWindowContent;