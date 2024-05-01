import styles from "./CSS/ManualWindowContent.module.css";
import Stepper from "../../UI/templates/Stepper";
import { theme } from '../../UI/templates/Theme';
import { ThemeProvider } from '@mui/material/';
import {Trans, useTranslation} from "react-i18next";
import React from "react";

/**
 * Task description content 
 * 
 * @description This window contains an abbreviated version of the tasks in the form of bullet points for the experiment.
 * 
 * @returns {React.ReactElement} Abbreviated version of the task description
 */
const ManualWindowContent = () => {
    const { t, i18n } = useTranslation()

    return (
        <div>
            <div className={styles.mainWrapper}>
                {/* First Page */}
                <div id={'10'}>
                    <b>{t('manual.page_1.heading')}</b><br /><br />
                    <ul>
                        <li><Trans i18nKey='manual.page_1.line_1'/>
                        </li><br />
                        <li><Trans i18nKey='manual.page_1.line_2'/>
                        </li><br />
                        <li><Trans i18nKey='manual.page_1.line_3'/>
                        </li>
                    </ul>
                </div>

                {/* Second Page */}
                <div id={'11'} style={{ display: 'none' }}>
                    <b>{t('manual.page_2.heading')}</b><br /><br />
                    <ul>
                        <li><Trans i18nKey='manual.page_2.line_1'/>
                        </li><br />
                        <li>{t('manual.page_2.line_2')}
                        </li>
                    </ul>
                </div>

                {/* Third Page */}
                <div id={'12'} style={{ display: 'none' }}>
                    <b>{t('manual.page_3.heading')}</b><br /><br />
                    <ul>

                    </ul>
                </div>
            </div>

            {/* Stepper at the bottom of the window */}
            <ThemeProvider theme={theme}>
                <Stepper left={t('back')} right={t('next')} buttonValue={10} length={3} component={'manual'} />
            </ThemeProvider>
        </div>
    )
}
export default ManualWindowContent;