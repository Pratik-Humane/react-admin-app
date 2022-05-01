import React from 'react'
import { Snackbar, Alert } from '@mui/material'
const FlashMessage = ({ message, verticalPos = 'top', horizontalPos = 'center', isOpen = false, type }) => {
    const [state, setState] = React.useState({
        open: isOpen,
        vertical: verticalPos,
        horizontal: horizontalPos,
    })
    const handleClose = () => {
        setState({ ...state, open: false })
    }
    const { vertical, horizontal, open } = state
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': `${message}-id`,
                }}
            >
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FlashMessage