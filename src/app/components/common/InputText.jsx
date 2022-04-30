import React from 'react'
import { TextField } from '@mui/material'
import { useField } from "formik"
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledInputText = styled(TextField)`
    margin: 10px 5px;
    p {
        position: relative;
        left: -11px;
    }
`

export default function InputText({
    name,
    variant = 'outlined',
    ...otherProps
}) {

    const [field, meta] = useField(name)
    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant,
        autoComplete: 'off',
    }

    if (meta && meta.touched && meta.error) {
        configTextField.error = true
        configTextField.helperText = meta.error
    }

    return (
        <StyledInputText {...configTextField} />
    )
}

InputText.propTypes = {
    lable: PropTypes.string,
};