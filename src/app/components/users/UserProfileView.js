import React, { useState } from 'react'
import PropTypes from 'prop-types'
import UserForm from './UserForm'
import UserView from './UserView'
import { connect } from 'react-redux'
import { styled } from '@mui/system'
import { Breadcrumb } from 'app/components'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const UserProfileView = ({ user }) => {
    const [isEditable, setIsEditable] = useState(false)
    const handleEditStatus = () => setIsEditable(!isEditable)
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Profile', path: '/app/user-profile' },
                        { name: isEditable ? 'Update Profile' : 'View Profile' },
                    ]}
                />
            </div>
            {
                isEditable ? <UserForm user={user} onClick={handleEditStatus} /> :
                    <UserView user={user} onClick={handleEditStatus} />
            }
        </Container>

    );
};

UserProfileView.propTypes = {
    user: PropTypes.object
};

export default connect(({ user }) => ({ user }))(UserProfileView)