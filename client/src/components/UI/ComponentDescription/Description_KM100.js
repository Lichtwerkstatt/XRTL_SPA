import styles from './Description.module.css'

const DescriptionKM100 = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    The two beams of light are reflected by mirrors placed at a 90-degree angle to each other. This mirror is used to reflect the reference beam. The kinematic mirror mount is designed to
                    securely hold a mirror in place while allowing fine tip and tilt adjustments.

                </p>
            </div>

        </div>
    )
}
export default DescriptionKM100;
