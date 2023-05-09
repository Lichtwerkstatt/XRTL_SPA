import styles from './Description.module.css'

const DescriptionSM1ZP = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The two beams of light are reflected by mirrors placed at a 90-degree angle to each other. This mirror is used to reflect the sample beam. The translation mount is designed to securely
                    hold a mirror in place while offering repeatable linear travel using the precision micrometer actuator, which is graduated in 1 µm increments. This component is used to create a
                    quantifiable change in the path length of the sample beam.
                </p>
            </div>

        </div>
    )
}
export default DescriptionSM1ZP;
