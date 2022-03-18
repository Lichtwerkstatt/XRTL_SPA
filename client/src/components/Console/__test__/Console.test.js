import Console from '../Console';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in Chat', () => {
    test('Chat runs without crashing', () => {
        render(< Console />)
        screen.debug();
    });

    beforeEach(() => {
        render(< Console />);
    });

    //Test the showConsoleHandler
})
