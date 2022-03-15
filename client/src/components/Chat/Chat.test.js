import Chat from './Chat';
import { getByTestId, getByTitle, render } from '@testing-library/react';
import React from "react";
import { rendern, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { useState, useContext } from 'react';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('Render Chat without crashing!', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Chat />, div);
    ReactDOM.unmountComponentAtNode(div);
    /*  expect(getByText('Hello, world!')).toBeInTheDocument()
     expect(container.firstChild).toMatchInlineSnapshot(`
       <h1>Hello, World!</h1>
     `) */
});

test('Message loads with initial state von ""', () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);


    const setContextMock = jest.fn();
    const useContextMock: any = (useContext: any) => [useContext, setContextMock];
    jest.spyOn(React, 'useContext').mockImplementation(useContextMock);

    const { container } = render(<Chat />);
    const message = getByTitle(container, "mes");
    expect(message.textContent).toBe("");
})

/* it("renders with or without a name", () => {
    act(() => { render(<Chat />, container); }); expect(container.textContent).toBe("Hey, stranger");
    act(() => {
        render(<Chat name="Jenny" />, container);
    });
    expect(container.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Chat name="Margaret" />, container);
    });
    expect(container.textContent).toBe("Hello, Margaret!");
}); */