import React from 'react'
import { MenuItem, TextField } from '@mui/material';
import { useField, useFormikContext } from "formik";

export default function SelectInput({
    name,
    options,
    ...otherProps
}) {

    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = evt => {
        const { value } = evt.target;
        setFieldValue(name, value);
    }

    const configSelectField = {
        ...field,
        ...otherProps,
        select: true,
        fullWidth: true,
        variant: 'outlined',
        onChange: handleChange
    };

    if (meta && meta.touched && meta.error) {
        configSelectField.error = true;
        configSelectField.helperText = meta.error;
    }

    return (
        <TextField {...configSelectField}>
            {
                Object.keys(options).map((item, position) => {
                    return (
                        <MenuItem key={position} value={item}>
                            {options[item]}
                        </MenuItem>
                    )
                })
            }
        </TextField>
    )
}