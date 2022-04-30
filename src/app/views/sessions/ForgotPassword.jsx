import React, { useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span, Paragraph } from 'app/components/Typography'
import { Card, Grid, Button, CircularProgress } from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '99px',
    left: '81px',
}))

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { palette } = useTheme()
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(false)
    const { forgotPassword, forgotPassMessage } = useAuth()
    const [errorMessage, setErrorMessage] = useState('')
    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await forgotPassword(state.email)
            setLoading(false)
        } catch (e) {
            setErrorMessage(e.message)
            setLoading(false)
        }
    }

    let { email } = state

    return (
        <ForgotPasswordRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            {errorMessage && (
                                <Paragraph sx={{ color: palette.error.main, marginBottom: 2 }}>
                                    {errorMessage}
                                </Paragraph>
                            )}
                            {forgotPassMessage && (
                                <Paragraph sx={{ color: palette.success.main, marginBottom: 2 }}>
                                    {forgotPassMessage}
                                </Paragraph>
                            )}
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    size="small"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'email is required',
                                        'email is not valid',
                                    ]}
                                />
                                <FlexBox>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Reset Password
                                    </Button>
                                    {loading && (
                                        <StyledProgress
                                            size={24}
                                            className="buttonProgress"
                                        />
                                    )}
                                    <Span sx={{ mr: 1, ml: '16px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/auth/signin")}
                                    >
                                        Sign in
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </ForgotPasswordRoot>
    )
}

export default ForgotPassword
