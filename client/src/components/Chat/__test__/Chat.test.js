import Chat from '../Chat';
import React from "react";
import ReactDOM from "react-dom";
import { screen, render } from '@testing-library/react';

describe('Some general tests of Chat', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Render Chat without crashing!', () => {
        
        const div = document.createElement("div");
        ReactDOM.render(<Chat />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Input box is initially empty', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Chat />, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(screen.findAllByPlaceholderText('Type Message here')).toMatchObject({});
    });

/*     test('Bubble size should be 35', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Chat />, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(screen.findByTestId('bubble')).toHaveProperty('size',35);
    }) */

    test('UseState, UseEffect is working without crashing', () => {
        const mockSetState = jest.spyOn(React, 'useState');
        const mockSetEffect = jest.spyOn(React, 'useEffect');

        const div = document.createElement("div");
        ReactDOM.render(<Chat />, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(mockSetState).toHaveBeenCalledTimes(4);
        expect(mockSetEffect).toHaveBeenCalledTimes(1);
    });

})



