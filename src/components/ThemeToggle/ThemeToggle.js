import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { changeTheme } from '../../utility/functions';

import Tooltip from '../Tooltip/Tooltip';

import './ThemeToggle.css';

const ThemeToggle = ({ theme, setTheme }) => {
    const toggleTheme = (e) => {
        e.preventDefault();
        const newTheme = theme === 'light' ? 'dark' : 'light';

        changeTheme(newTheme);
        setTheme(newTheme);
    }

    return (
        <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            <IconButton className="app__header--options--btn theme-toggle" aria-label="change-theme" onClick={toggleTheme}>
                { theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon /> }
            </IconButton>
        </Tooltip>
    )
};

export default ThemeToggle;