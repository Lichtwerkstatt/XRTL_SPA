import Impressum from './LegalNotice'

const DescriptionHandler = (props) => {

    const renderOption = {
        info: <Impressum height={props.height} />
    }

    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
