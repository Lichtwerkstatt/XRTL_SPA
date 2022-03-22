import Login from '../Login';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

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
        const inputElement = screen.getByPlaceholderText("Please enter your username");
        expect(inputElement).not.toBeNull()
    });

    test('Login has a error message element', () => {
        const errorElement = screen.getByTitle("errorLabel");
        expect(errorElement).not.toBeNull()
    });

    test('Login has a dropdown menu for the selection of server connection', () => {
        const selectElement = screen.getByTestId("dropDownMenu");
        expect(selectElement).not.toBeNull()
    })

    test('Login has a login button', () => {
        const buttonElement = screen.getByTitle("login");
        expect(buttonElement).not.toBeNull()
    });
});


describe("Some tests of the functionallity of Login", () => {
    beforeEach(() => {
        render(< Login />);
    });

    test('Login username can be set', () => {
        const setInput = 'user135'
        const inputElement = screen.getByPlaceholderText("Please enter your username");
        fireEvent.change(inputElement, { target: { value: setInput } });
        expect(inputElement.value).toBe(setInput);
    });

    test('Custom connection address can be set', () => {
        const setInput = 'http://localhost:5000'
        const inputElement = screen.getByPlaceholderText("http://...");
        fireEvent.change(inputElement, { target: { value: setInput } });
        expect(inputElement.value).toBe(setInput);
    });

    test('Login is working probably',() => {
        const setInput = 'user135'
        const inputElement = screen.getByPlaceholderText("Please enter your username");
        const buttonElement = screen.getByTitle("login");
        const errorElement = screen.getByTitle("errorLabel");
        screen.debug()
        //fireEvent.change(inputElement, { target: { value: setInput } });
        fireEvent.click(buttonElement);  
        expect(errorElement).not.toBeNull()

    });
})

describe("Tests that the option sleection of the dropdown menu works", () => {
    beforeEach(() => {
        render(< Login />);
    });

    test('The connection to the localhost is set correctly', () => {
        const selectElement = screen.getByTestId("dropDownMenu");
        const option1 = screen.getByTestId("localhost");
        const option2 = screen.getByTestId("himbeere");
        const option3 = screen.getByTestId("custom");

        userEvent.selectOptions(selectElement, ['http://localhost:7000']);

        expect(option1.selected).toBe(true);
        expect(option2.selected).toBe(false);
        expect(option3.selected).toBe(false);
    });

    test('The connection to the raspberryPi is set correctly', () => {
        const selectElement = screen.getByTestId("dropDownMenu");
        const option1 = screen.getByTestId("localhost");
        const option2 = screen.getByTestId("himbeere");
        const option3 = screen.getByTestId("custom");

        userEvent.selectOptions(selectElement, ['http://192.168.1.42:7000']);

        expect(option1.selected).toBe(false);
        expect(option2.selected).toBe(true);
        expect(option3.selected).toBe(false);
    });

    test('The connection to the raspberryPi is set correctly', () => {
        const selectElement = screen.getByTestId("dropDownMenu");
        const option1 = screen.getByTestId("localhost");
        const option2 = screen.getByTestId("himbeere");
        const option3 = screen.getByTestId("custom");

        userEvent.selectOptions(selectElement, ['']);

        expect(option1.selected).toBe(false);
        expect(option2.selected).toBe(false);
        expect(option3.selected).toBe(true);
    });
})