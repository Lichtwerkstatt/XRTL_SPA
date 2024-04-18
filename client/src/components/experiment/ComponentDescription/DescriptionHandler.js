import LegalNotice from './LegalNotice';


const DescriptionHandler = (props) => {

    const renderOption = {
        info: <LegalNotice height={props.height} />,
    }

    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
