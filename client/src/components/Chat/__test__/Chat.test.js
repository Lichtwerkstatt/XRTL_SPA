import Chat from '../Chat';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in Chat', () => {
    test('Chat runs without crashing', () => {
        render(< Chat />)
    });

    beforeEach(() => {
        render(< Chat />);
    });

    test('Chat has an input element', () => {
        const inputElement = screen.getByPlaceholderText("Type Message here");
        expect(inputElement).not.toBeNull()
    });

    test('Chat has a button', () => {
        const buttonElement = screen.getByTitle("send button");
        expect(buttonElement).not.toBeNull()
    });

    test('Chat has an icon', () => {
        const iconElement = screen.getByTestId("bubble");
        expect(iconElement).not.toBeNull()
    });

    test('Chat has an block for the messages', () => {
        const messageBlock = screen.getByTestId("message-block");
        expect(messageBlock).not.toBeNull()
    });
})

describe('Tests of the functionallity of Chat', () => {
    beforeEach(() => {
        render(< Chat />);
    });

    test('Input value can be changed', () => {
        const setInput = 'Hello'
        const inputElement = screen.getByPlaceholderText("Type Message here");
        fireEvent.change(inputElement, { target: { value: setInput } });
        expect(inputElement.value).toBe(setInput);
    });

    test('Input is after clicking the button empty again', () => {
        const setInput = 'Hello world!'
        const inputElement = screen.getByPlaceholderText("Type Message here");
        const buttonElement = screen.getByTitle("send button");

        fireEvent.change(inputElement, { target: { value: setInput } });
        fireEvent.click(buttonElement)
        expect(inputElement.value).toBe('');
    });

    /*     test('If one message was send, it should be contained in the chat block', () => {
            const setInput = 'Hello world!'
            const inputElement = screen.getByPlaceholderText("Type Message here");
            const buttonElement = screen.getByTitle("send button");
            const messageBlock = screen.getByTestId("message-block");
    
            fireEvent.change(inputElement, { target: { value: setInput } });
            fireEvent.click(buttonElement)
            screen.debug();
            //expect(messageBlock).toMatch(setInput);
        });
    
        test('If two or more message were send, they should be contained in the chat block', () => {
            const setInput = 'Hello world!'
            const inputElement = screen.getByPlaceholderText("Type Message here");
            const buttonElement = screen.getByTitle("send button");
            const messageBlock = screen.getByTestId("message-block");
    
            fireEvent.change(inputElement, { target: { value: setInput } });
            fireEvent.click(buttonElement)
            screen.debug();
            //expect(messageBlock).toMatch(setInput);
        }); */

    //Test the showChatHandler

})