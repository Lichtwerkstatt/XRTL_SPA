import { useState } from "react"
import RotaryCtrl from "../UI/RotaryCtrl"
import Window from "../UI/Window"

const KM100 = (props) => {

    const [footer, setFooter] = useState(props.footer)

    const handleChangeFooter = newFooter => {
        setFooter(newFooter)
    }

    return <Window header={props.title + " ("+ props.id+")"} footer={footer}>
        <RotaryCtrl rotation={props.rotationTop} component={props.id} control="top" newStatus = {handleChangeFooter}/>
        <RotaryCtrl rotation={props.rotationBottom} component={props.id} control="bottom" newStatus = {handleChangeFooter} />
        </Window>
}

export default KM100