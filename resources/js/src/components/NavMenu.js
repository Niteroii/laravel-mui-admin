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
import { useTheme } from '@mui/material';

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
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: !isTablet ? 314 : 264,
                height: '100vh',
                padding: '46px 0',
                background:
                    'linear-gradient(180deg, ' +
                    theme.palette.primary.dark +
                    ' 34.4%, ' +
                    theme.palette.primary.main +
                    ' 177.02%)',
                color: 'primary.contrastText',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {/* <Box
                sx={{
                    padding: !isTablet
                        ? '0 12.5%'
                        : showDrawer
                            ? '0 0.75%'
                            : '0 7.5%',
                    transition: 'ease 300ms',
                }}
            >
                <Link to="/">
                    <img src="../assets/logo/logo.png" />
                </Link>
            </Box> */}

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
                                    color="primary.contrastText"
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
