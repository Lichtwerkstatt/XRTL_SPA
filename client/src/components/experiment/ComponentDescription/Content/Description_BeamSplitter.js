import styles from '../../../windows/CSS/Description.module.css'

const DescriptionBeamSplitter = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    This really simple plate beam splitter is made of an acrylic glass sheet and can be used to observe the interference pattern created on the second output of the Michelson interferometer.
                </p>
            </div>

        </div>
    )
}
export default DescriptionBeamSplitter;
