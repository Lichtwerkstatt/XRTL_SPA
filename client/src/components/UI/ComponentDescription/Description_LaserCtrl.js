import styles from './Description.module.css'

const DescriptionLaserCtrl = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    A coherent light source such as a laser is used to illuminate the interferometer. When light waves are coherent, their peaks and troughs line up perfectly, resulting in a pattern of
                    constructive and destructive interference that can produce beautiful and complex interference patterns. In contrast, light that is not coherent has randomly varying phases and does not
                    produce well-defined interference patterns.
                </p>
            </div>

        </div>
    )
}
export default DescriptionLaserCtrl;
