import Console from '../Console';
import React from "react";
import ReactDOM from "react-dom";
import { screen } from '@testing-library/react';


describe('Some general tests of Webcam', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Render Chat without crashing!', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Console />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
/* 
    test('Show Console andler is working', () => {
        const mockCallback = jest.fn();
        const button = ReactDOM.render(<button onClick={mockCallback}></button>);
        screen.findByTestId('console button').simulate('click');
        expect(mockCallback.mock.calls.length).toEqual(1);
    }); */


    test('UseState, UseEffect is working without crashing', () => {
        const mockSetState = jest.spyOn(React, 'useState');

        const div = document.createElement("div");
        ReactDOM.render(<Console />, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(mockSetState).toHaveBeenCalledTimes(2);
    });
})