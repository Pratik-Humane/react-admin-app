import React from 'react'
import { Button } from "@mui/material";

export default function CustomButton({
    children,
    fullWidth = false,
    variant = 'outline',
    color,
    ...otherProps
}) {

    const configButton = {
        ...otherProps,
        variant,
        color,
        fullWidth,
    }

    return (
        <Button {...configButton} sx={{ mt: 2, ml: 1, mr: 1, mb: 2 }}>
            {children}
        </Button>
    )
}