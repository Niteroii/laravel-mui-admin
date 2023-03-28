import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material';

// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

const MENU_ITEMS = [
    // Add items to menu here
    {
        component: Link,
        to: '/',
        icon: <HomeOutlinedIcon />,
        primary: 'Início',
        shouldAppear: () => true,
    },

];

const NavMenu = ({ toggleDrawer, isTablet = true }) => {


    return (
        <Box
            sx={{
                width: !isTablet ? 314 : 264,
                height: '100vh',
                backgroundColor: 'primary.dark',
                color: 'primary.contrastText',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List disablePadding sx={{ padding: '15% 0 0' }}>
                {MENU_ITEMS
                    .filter((item) => item.shouldAppear())
                    .map((item, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton
                                sx={{ padding: '8px 16px' }}
                                component={item.component}
                                to={item.to}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: '45px',
                                        color: 'primary.contrastText',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {/* <ListItemText primary={item.primary} /> */}
                                <Typography
                                    variant="body2"
                                >
                                    {item.primary}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List >
        </Box >
    );
};

NavMenu.propTypes = {
    toggleDrawer: PropTypes.func,
    isTablet: PropTypes.bool,
};

export default NavMenu;
