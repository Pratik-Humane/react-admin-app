import React from 'react';
import { Radio, FormControl, FormControlLabel, RadioGroup, FormLabel } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function RadioButton({
    name,
    legend = '',
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
        onChange: handleChange
    };

    if (meta && meta.touched && meta.error) {
        configSelectField.error = true;
        configSelectField.helperText = meta.error;
    }

    return (
        <FormControl style={{ marginLeft: 5 }}>
            {legend && <FormLabel component="legend">{legend}</FormLabel>}
            <RadioGroup row {...configSelectField}>
                {
                    Object.keys(options).map((item, position) => {
                        return (
                            <React.Fragment key={position}>
                                <FormControlLabel value={item} control={<Radio />} label={options[item]} />
                            </React.Fragment>
                        )
                    })
                }

            </RadioGroup>
        </FormControl>
    )
}