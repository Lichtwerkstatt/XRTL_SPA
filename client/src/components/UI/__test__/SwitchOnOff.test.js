import SwitchOnOff from '../SwitchOnOff';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in SwitchOnOff', () => {
    test('SwitchOnOff runs without crashing', () => {
        render(< SwitchOnOff />)
    });

    beforeEach(() => {
        render(< SwitchOnOff />);
        //screen.debug();
    });

    test('SwitchOnOff has a button', () => {
        const buttonElement = screen.getByTitle("switch");
        expect(buttonElement).not.toBeNull()
    });
});

describe('Tests of the functionallity of SwitchOnOff', () => {
    beforeEach(() => {
        render(< SwitchOnOff />);
    });

    test('SwitchOnOff button has at the beginning the value FALSE', () => {
        const buttonElement = screen.getByTitle("switch");
        expect(buttonElement.value).toBe('false');
    });

    test('SwitchOnOff should be TRUE after a button click event', () => {
        const buttonElement = screen.getByTitle("switch");
        fireEvent.click(buttonElement);
        expect(buttonElement.value).toBe('true');
    });

    test('SwitchOnOff should be FALSE again after two button click events', () => {
        const buttonElement = screen.getByTitle("switch");
        fireEvent.click(buttonElement);
        fireEvent.click(buttonElement);
        expect(buttonElement.value).toBe('false');
    });
});