import React from 'react';
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { SimpleCard, InputText, Button, FileInput, RadioButton, PreviewImage } from 'app/components'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { updateUserProfile } from '../../redux/actions/UserAction'
import * as Yup from 'yup'


const UserForm = ({ onClick, user, updateUserProfile }) => {
    const initialValues = {
        username: user?.username,
        email: user?.email,
        mobile: user?.mobile,
        profile_image: null,
        gender: user?.gender ? user?.gender : 'Male',
    }

    const fileValidation = user.avatar ? (
        Yup.mixed().nullable().test(
            "FILE_SIZE",
            "Uploaded file is too big.",
            (value) => !value || (value && value.size <= 1024 * 1024)
        )
            .test(
                "FILE_FORMAT",
                "Uploaded file has unsupported format.",
                (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
            )
    ) : (
        Yup.mixed().nullable().required('Required').test(
            "FILE_SIZE",
            "Uploaded file is too big.",
            (value) => !value || (value && value.size <= 1024 * 1024)
        )
            .test(
                "FILE_FORMAT",
                "Uploaded file has unsupported format.",
                (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
            )
    )

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
    const formValidation = Yup.object({
        username: Yup.string().trim().required('Required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile: Yup.number().required('Required'),
        gender: Yup.string().required('Required'),
        profile_image: fileValidation,
    })

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true)
        const {
            username,
            email,
            mobile,
            gender,
            profile_image: avatar
        } = values
        let userdata = new FormData()
        userdata.append('username', username)
        userdata.append('email', email)
        userdata.append('mobile', mobile)
        userdata.append('gender', gender)
        userdata.append('avatar', avatar)
        updateUserProfile(userdata)
        setSubmitting(false)
        onClick()
    }

    return (
        <SimpleCard>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{ ...initialValues }}
                        validationSchema={formValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ values, isSubmitting }) => (
                            <Form>
                                <Grid item xs={12}>
                                    <InputText
                                        type="text"
                                        name='username'
                                        label="Full Name"
                                        sx={{ width: '99%' }}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <InputText
                                        type="email"
                                        name='email'
                                        label="Email Address"
                                        sx={{ width: '50%' }}
                                    />
                                    <InputText
                                        type="text"
                                        name='mobile'
                                        label="Mobile"
                                        sx={{ width: '50%' }}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <RadioButton
                                        name="gender"
                                        options={{ "Male": "Male", "Female": "Female", "Gay": "Gay" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FileInput
                                        name='profile_image'
                                    />
                                    {(values.profile_image && <PreviewImage file={values.profile_image} />) || (user.avatar && <img src={user.avatar} height="100" width="100" alt='profile_img' />)}
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Button disabled={isSubmitting} color="success" type="submit" variant='contained'>Submit</Button>
                                    <Button color="error" variant='contained' onClick={onClick}>Cancel</Button>
                                </Grid>
                            </Form>
                        )}

                    </Formik>
                </Grid>
            </Grid>
        </SimpleCard>
    );
};

UserForm.propTypes = {
    user: PropTypes.object,
    onClick: PropTypes.func,
};

export default connect(null, { updateUserProfile })(UserForm)