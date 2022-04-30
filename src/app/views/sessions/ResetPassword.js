import React, { useState, useEffect } from 'react'
import useAuth from 'app/hooks/useAuth'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
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

const ResetPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const ResetPassword = () => {
    const navigate = useNavigate()
    const { palette } = useTheme()
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(false)
    const { resetPassword, resetPassMessage } = useAuth()
    const { code } = useParams()
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false;
            }
            return true;
        });
    }, [state.password])

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
            await resetPassword(state.password, state.confirm_password, code)
            setLoading(false)
        } catch (e) {
            setErrorMessage(e.message)
            setLoading(false)
        }
    }

    let { password, confirm_password } = state

    return (
        <ResetPasswordRoot>
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
                            {resetPassMessage && (
                                <Paragraph sx={{ color: palette.success.main, marginBottom: 2 }}>
                                    {resetPassMessage}
                                </Paragraph>
                            )}
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    label="Password"
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    size="small"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={[
                                        'Password is required',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    label="Confirm Password"
                                    onChange={handleChange}
                                    type="password"
                                    name="confirm_password"
                                    size="small"
                                    value={confirm_password || ''}
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={[
                                        'Confirm Password is required',
                                        'password and confirm password must be same',
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
        </ResetPasswordRoot>
    )
}

export default ResetPassword
