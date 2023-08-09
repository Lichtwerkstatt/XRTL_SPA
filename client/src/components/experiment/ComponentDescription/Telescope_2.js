import styles from './CSS/Description.module.css'

const DescriptionTelescope2 = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                    Telescope 2 Description
                </p>
            </div>

        </div>
    )
}
export default DescriptionTelescope2;