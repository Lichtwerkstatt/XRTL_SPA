import ExperimentUILayer from '../ExperimentUILayer';
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';

describe('Tests if all the important HTML elements contained in ExperimentUILayer', () => {
    test('ExperimentUILayer runs without crashing', () => {
        render(< ExperimentUILayer />);
        //screen.debug();
    });

});

