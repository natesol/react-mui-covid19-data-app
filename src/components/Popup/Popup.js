import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Tooltip from '../Tooltip/Tooltip';

import './Popup.css';


const useStyles = makeStyles( () => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


const Popup = ({ btnTip, btnContent, modalContent }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const openModal = () => { setOpen(true) };
    const closeModal = () => { setOpen(false) };


    return (
        <>
            <Tooltip title={btnTip}>
                <div className='popup-btn' onClick={openModal}>
                    { btnContent }
                </div>
            </Tooltip>
            <Modal
                aria-labelledby='popup-modal-title'
                aria-describedby='popup-modal-body'
                className={classes.modal+' popup__modal'}
                open={open}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} >
                    <Card>
                        <CardContent>
                            <h2 className='popup-modal-title'>{modalContent.title}</h2>
                            <div className='popup-modal-body'>{modalContent.body}</div>
                        </CardContent>
                    </Card>
                </Fade>
            </Modal>
        </>
    );
}

export default Popup;