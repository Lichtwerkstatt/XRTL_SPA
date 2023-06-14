import Impressum from './Description_Impressum'

const DescriptionHandler = (props) => {

    const renderOption = {
        info: <Impressum height={props.height} />
    }

    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
