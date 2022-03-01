import KM100 from "../../assembly/KM100"

const DigiLabs4YouDemo = (props) => {
  return (
    <div>
      {props.selected.has("KM100_1") &&(
        <KM100
          title="Mirror"
          id="KM100_1"
          rotationTop="0"
          rotationBottom="0"
          footer="Initializing..."
          top="100"
          left="100"
          />

      )}

    </div>
  )
}

export default DigiLabs4YouDemo;