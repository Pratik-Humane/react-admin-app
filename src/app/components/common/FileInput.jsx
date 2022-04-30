import React from 'react'
import { useField, useFormikContext } from "formik"
import { TextField } from '@mui/material'
import styled from '@emotion/styled'

const StyledTextField = styled(TextField)`
    margin: 10px 5px;
    p {
        position: relative;
        left: -11px;
    }
`

const FileInput = ({ name, ...otherProps }) => {

    const [field, meta] = useField(name)

    const { setFieldValue } = useFormikContext()

    const handleChange = evt => {
        const { files } = evt.target;
        setFieldValue(name, files[0]);
    }

    let configTextField = {
        ...otherProps,
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configTextField.error = true
        configTextField.helperText = meta.error
    }

    return (
        <StyledTextField
            type="file"
            {...configTextField}
        />
    );
};

export default FileInput