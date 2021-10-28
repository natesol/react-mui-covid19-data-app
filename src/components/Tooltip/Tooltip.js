import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tooltip as MUITooltip } from '@material-ui/core';
// import Zoom from '@material-ui/core/Zoom';

import './Tooltip.css'


const useStyles = makeStyles( (theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

const Tooltip = (props) => {
    const classes = useStyles();

    return <MUITooltip
                arrow
                enterDelay={800}
                leaveDelay={0}
                // TransitionComponent={Zoom}
                classes={classes}
                {...props}
            />;
}

export default Tooltip;
