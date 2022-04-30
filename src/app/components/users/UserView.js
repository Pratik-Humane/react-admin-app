import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Avatar, ListItemIcon, ListItemText, List, ListItem, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Button } from 'app/components'

const ProfileBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '20px 24px',
    height: '100%',
    width: '100%',
}));

const ProfileTitle = styled(ListItemIcon)(() => ({
    width: '20%',
    textTransform: 'capitalize',
}));

const ProfileDescription = styled(ListItemText)(() => ({
    width: '80%'
}));

const UserView = ({ user, onClick }) => {
    return (

        <Grid container>
            <Box component="div">
                <Button variant="contained" onClick={onClick}>Edit Profile</Button>
            </Box>
            <ProfileBox>
                <List>
                    <ListItem>
                        <ProfileTitle>
                            Name
                        </ProfileTitle>
                        <ProfileDescription
                            primary={user.username}
                        />
                    </ListItem>
                    <ListItem>
                        <ProfileTitle>
                            Email
                        </ProfileTitle>
                        <ProfileDescription
                            primary={user.email}
                        />
                    </ListItem>
                    <ListItem>
                        <ProfileTitle>
                            Gender
                        </ProfileTitle>
                        <ProfileDescription
                            primary={user.gender}
                        />
                    </ListItem>
                    <ListItem>
                        <ProfileTitle>
                            Role
                        </ProfileTitle>
                        <ProfileDescription
                            primary={user.role}
                        />
                    </ListItem>
                    <ListItem>
                        <ProfileTitle>
                            Profile Image
                        </ProfileTitle>
                        <ProfileDescription>
                            {(user.avatar && <Avatar alt="Profile Picture" src={user.avatar} />)}
                        </ProfileDescription>
                    </ListItem>
                </List>
            </ProfileBox>
        </Grid>
    );
};

UserView.propTypes = {
    user: PropTypes.object,
    onClick: PropTypes.func,
};

export default UserView;