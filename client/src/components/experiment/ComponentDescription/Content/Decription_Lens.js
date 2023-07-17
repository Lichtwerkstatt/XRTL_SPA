import styles from '../../../windows/CSS/Description.module.css'

const DescriptionLens = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The lens is used to diverge the beam of laser light in order to illuminate a larger area of the screen and thereby to obtain an interference pattern consisting of light and dark rings
                    (constructive or destructive interference, respectively). Without a lens, the laser would create only one spot on the screen, which is either very bright (constructive interference) or
                    completely gone (destructive interference).
                </p>
            </div>

        </div>
    )
}
export default DescriptionLens;
