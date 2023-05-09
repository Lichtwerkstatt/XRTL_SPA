import styles from './Description.module.css'

const DescriptionLaser = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The laser power supply provides the electrical energy necessary to excite the laser medium and generate the coherent beam of light. The laser module here is a class 2 laser,
                    which does not require any protective eyewear. However, to avoid injury, do not look directly into the laser beam.
                </p>
            </div>

        </div>
    )
}
export default DescriptionLaser;
