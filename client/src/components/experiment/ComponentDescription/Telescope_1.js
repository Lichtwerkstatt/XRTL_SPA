import styles from './CSS/Description.module.css'

const DescriptionTelescope1 = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    Telescope 1 Description
                </p>
            </div>

        </div>
    )
}
export default DescriptionTelescope1;