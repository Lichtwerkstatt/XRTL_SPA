import styles from './Description.module.css'

const DescriptionCube = (props) => {
    return (
        <div>
            <div className={styles.mainWrapper} style={{ height: props.height }} >
                <p>
                The beam splitter is a partially reflective surface that splits the incoming beam of light into two separate beams, known as the reference beam and the sample beam. This cube beam 
                splitter is made up of two prisms that are cemented together.
                </p>
            </div>

        </div>
    )
}
export default DescriptionCube;
