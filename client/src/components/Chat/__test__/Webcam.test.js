import Webcam from '../Webcam';
import React from "react";
import ReactDOM from "react-dom";
import { screen } from '@testing-library/react';

describe('Some general tests of Webcam', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Render Chat without crashing!', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Webcam />, div);
        ReactDOM.unmountComponentAtNode(div);
    });



    test('UseState, UseEffect is working without crashing', () => {
        const mockSetState = jest.spyOn(React, 'useState');
        const mockUseRef = jest.spyOn(React, 'useRef');

        const div = document.createElement("div");
        ReactDOM.render(<Webcam />, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(mockUseRef).toHaveBeenCalledTimes(2);
        expect(mockSetState).toHaveBeenCalledTimes(1);
    }); 
})