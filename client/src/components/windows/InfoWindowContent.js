import styles from "./InfoWindowContent.module.css"
import bgTeam from "../media/images/xrtl_team.png"

const InfoWindowContent = (props) => {
  return (
    <div>

      <div className={styles.mainWrapper}      >
        Remote labs are a trendsetting way of teaching, communicating, and experiencing science as well as enabling collaborative work. Unfortunately, the implementation of remote access involves a cost-intensive development or at least requires a certain technical skillset. To establish remote labs across disciplines, especially outside the field of IT and engineering, the technical access threshold must be low enough to support a self-contained implementation by researchers, assistants, and technical staff. Hereby, we are developing the open-source toolbox XR Twin Lab for the research field of Photonics. XR Twin Lab (XRTL) provides a modular way of building a web-based application to control optical experimental setups with the integration of VR and AR endpoints.
        <p>
          This Project is currently developed within the DAAD-funded project "digiPhoton" and BMBF-funded project "Lichtwerkstatt" at the Abbe School of Photonics / Institute of Applied Physics / Friedrich Schiller University in Jena. Feel free to follow our <a href="https://github.com/Lichtwerkstatt/XRTL_SPA">Git Repo</a> or <a href="mailto:team@lichtwerkstatt-jena.de">Contact us.</a>
        </p>
        <p>
          Best! Clara, Falko, Jari and Johannes
        </p>
      </div>
      <img className={styles.img} src={bgTeam} alt='XRTL Team' />
    </div>
  )
}
export default InfoWindowContent;
