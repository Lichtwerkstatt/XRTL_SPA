import Login from '../Login';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in Login', () => {
    test('Login runs without crashing', () => {
        render(< Login />)
    });

    beforeEach(() => {
        render(< Login />);
    });

    test('Login has a header element', () => {
        const headerElement = screen.getByTitle("settings");
        expect(headerElement).not.toBeNull()
    });

    test('Login has an input element', () => {
        const inputElement = screen.getByPlaceholderText("Please enter here username");
        expect(inputElement).not.toBeNull()
    });

    test('Login has a login button', () => {
        const buttonElement = screen.getByTitle("login");
        expect(buttonElement).not.toBeNull()
    });

  

});