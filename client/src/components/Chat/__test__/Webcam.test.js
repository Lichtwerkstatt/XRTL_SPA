import { Webcam, Video } from '../Webcam';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in Webcam', () => {
    test('Webcam runs without crashing', () => {
        render(< Webcam />)
    });

    beforeEach(() => {
        render(< Webcam />);
    });

    test('Webcam is at the begginig a empty div-element', () => {
        const divElement = screen.getByTestId("empty-stream");
        expect(divElement).not.toBeNull()
    });
})

describe('Tests if all the important HTML elements contained in Video', () => {
    test('Video runs without crashing', () => {
        render(< Video />)
        //screen.debug();
    });

    beforeEach(() => {
        render(< Video />)
    });

    test('The webcam of the host client is displayed', () => {
        const videoElement = screen.getByTestId("webcam-host");
        expect(videoElement).not.toBeNull()
    });
});