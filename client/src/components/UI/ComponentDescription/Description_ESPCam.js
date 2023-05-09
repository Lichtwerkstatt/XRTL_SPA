import styles from './Description.module.css'

const DescriptionESPCam = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>ESPCam
                    The screen in a Michelson interferometer setup displays an interference pattern consisting of bright and dark fringes. The location and spacing of these fringes provide information
                    about the relative phase difference between the two light paths, which can be used to measure small changes in the optical path length of the sample beam.
                </p>
            </div>

        </div>
    )
}
export default DescriptionESPCam;
