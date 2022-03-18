import NavBar from '../NavBar';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in NavBar', () => {
    test('NavBar runs without crashing', () => {
        render(< NavBar />);
        screen.debug();
    });

});
