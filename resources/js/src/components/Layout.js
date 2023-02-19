import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

import app from '../app';
import { connect } from 'react-redux';

import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import NavMenu from './NavMenu';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';

import Loading from './Loading';
import NotificationBar from './NotificationBar';
import DialogBar from './DialogBar';

import useWindowHeight from '../hooks/useWindowHeight';

const APP_BAR_HEIGHT = 64;
const APP_BAR_HEIGHT_MOBILE = 56;

const Layout = ({ userName }) => {

    const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
    const windowHeight = useWindowHeight();

    const { collapseSidebar } = useProSidebar();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [popAnchorEl, setPopAnchorEl] = React.useState(null);
    const popOpen = Boolean(popAnchorEl);

    if (!userName) {
        return (
            <Loading />
        );
    }

    const toggleDrawer = (open) => (
        (event) => {
            if (
                event.type === 'keydown' &&
                (event.key === 'Tab' ||
                    event.key === 'Shift')
            ) {
                return;
            }

            setDrawerOpen(open);
        }
    );

    const handleLogout = () => {
        const dialogOptions = {
            title: 'Sair',
            message: 'Deseja realmente encerrar a sessão?',
            type: 'confirm',
            confirmText: 'Sim',
            cancelText: 'Não'
        };
        app.dialog.show(dialogOptions).then((result) => {
            if (result) {
                app.auth.logout();
            }
        });
    };

    const appBarHeight = isTablet ? APP_BAR_HEIGHT : APP_BAR_HEIGHT_MOBILE;

    return (
        <React.Fragment>
            <Stack direction="row" spacing={0} sx={{ overflow: 'hidden', height: '100vh' }} >

                {isTablet && (
                    <Sidebar
                        width="264px"
                        collapsedWidth="58px"
                        rootStyles={{
                            '.ps-sidebar-container': {
                                height: 'unset',
                            },
                        }}
                    >
                        <NavMenu toggleDrawer={toggleDrawer} />
                    </Sidebar>
                )}

                <Stack spacing={0} sx={{ width: '100%' }}>
                    <AppBar
                        position="static"
                        sx={{
                            height: appBarHeight,
                            boxShadow: '0px 3px 16px rgba(0, 38, 77, 0.08)',
                            zIndex: 1
                        }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={(e) => {
                                    if (isTablet) {
                                        collapseSidebar();
                                        return;
                                    }
                                    toggleDrawer(true)(e);
                                }}
                            >
                                <MenuIcon />
                            </IconButton>

                            {!isTablet && (
                                <Drawer
                                    anchor="left"
                                    open={drawerOpen}
                                    onClose={toggleDrawer(false)}
                                >
                                    <NavMenu toggleDrawer={toggleDrawer} isTablet={isTablet} />
                                </Drawer>
                            )}

                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                            </Typography>
                            <Button
                                id="popMenu-btn"
                                aria-controls={open ? 'popMenu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                color="inherit"
                                onClick={(e) => setPopAnchorEl(e.currentTarget)}
                                sx={{ height: '52.5px' }}
                            >
                                <Avatar alt={userName} scr="" sx={{ margin: '0 10px 0 0', color: 'info.dark' }}>{userName?.charAt(0)}</Avatar>

                                <Box display="flex" sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} >
                                    <Typography variant="body3" sx={{ margin: 'auto' }} >
                                        {userName}
                                    </Typography>

                                    <ExpandMoreIcon />
                                </Box>
                            </Button>

                            <Menu
                                id="popMenu"
                                anchorEl={popAnchorEl}
                                open={popOpen}
                                onClose={() => setPopAnchorEl(null)}
                                MenuListProps={{
                                    'aria-labelledby': 'popMenu-btn',
                                }}
                            >
                                <MenuList
                                    sx={{
                                        minWidth: 180,
                                    }}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Sair
                                        </ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <Paper
                        elevation={0}
                        sx={{
                            overflowY: 'auto',
                            padding: '20px 24px',
                            borderRadius: 0,
                            height: windowHeight - appBarHeight,
                        }}
                    >
                        <Outlet />
                    </Paper>
                </Stack>
            </Stack>
            <NotificationBar />
            <DialogBar />
        </React.Fragment>
    );
};

Layout.propTypes = {
    userName: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userName: state.app.user?.name,
});

export default connect(mapStateToProps)(Layout);


