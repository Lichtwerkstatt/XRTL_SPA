import { usePopUpContext } from '../../services/PopUpContext';
import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Rotary_bg from './media/rotary_outline.png';
import Window from '../UI/experimentUI/Window';
import { useState } from 'react';

const Rotary = (props) => {

  return (
    <Window
      id={props.controlId}
      controlId={props.controlId}
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      background={Rotary_bg}
    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.controlId}
        led={props.LED}
        top='10'
        left='160'
      />
    </Window>
  );
};

export default Rotary;
