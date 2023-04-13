import React from 'react';

import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Outlet } from 'react-router-dom';

import NavMenu from '../../components/NavMenu';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
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
import useMediaQuery from '@mui/material/useMediaQuery';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';

import api from '../../api';
import { useTranslation } from 'react-i18next';

/**
 * Lida com o logout do usuário.
 */
const handleLogout = () => {
    const { t } = api.lang;

    const dialogOptions = {
        title: t('Logout'),
        message: t('Are you sure you want to logout?'),
        type: 'confirm',
        confirmText: t('Yes'),
        cancelText: t('No'),
    };
    api.dialog.create(dialogOptions).then((result) => {
        if (result) {
            api.auth.logout();
        }
    });
};

const Layout = () => {
    const isTablet = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const windowHeight = api.hooks.useWindowHeight();

    const { collapseSidebar } = useProSidebar();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [popAnchorEl, setPopAnchorEl] = React.useState(null);
    const popOpen = Boolean(popAnchorEl);

    /**
     * Alterna exibição do menu lateral.
     *
     * @param {boolean} open - Indica se o menu lateral deve ser exibido.
     * @return {Function} - Função que alterna o menu lateral.
     */
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown'
            && (event.key === 'Tab'
                || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };

    const appBarHeight = isTablet
        ? api.config.layout.appBarHeight.desktop
        : api.config.layout.appBarHeight.mobile;

    const { name: userName } = React.useMemo(() => blade('user'), []);
    const blockUi = React.useMemo(() => blade('block-ui') === '1', []);

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Stack
                direction="row"
                spacing={0}
                sx={{ overflow: 'hidden', height: '100vh' }}
            >
                {!blockUi && isTablet && (
                    <Sidebar
                        width="264px"
                        collapsedWidth="58px"
                        rootStyles={{ '.ps-sidebar-container': { height: 'unset' } }}
                    >
                        <NavMenu toggleDrawer={toggleDrawer} />
                    </Sidebar>
                )}

                <Stack
                    spacing={0}
                    sx={{ width: '100%' }}
                >
                    <AppBar
                        position="static"
                        sx={{
                            height: appBarHeight,
                            zIndex: 1,
                        }}
                    >
                        <Toolbar>
                            {!blockUi && (
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label={t('Open menu')}
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
                            )}

                            {!blockUi && !isTablet && (
                                <Drawer
                                    anchor="left"
                                    open={drawerOpen}
                                    onClose={toggleDrawer(false)}
                                >
                                    <NavMenu
                                        toggleDrawer={toggleDrawer}
                                        isTablet={isTablet}
                                    />
                                </Drawer>
                            )}

                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            />
                            <Button
                                id="popMenu-btn"
                                aria-controls={open ? 'popMenu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                color="inherit"
                                onClick={(e) => setPopAnchorEl(e.currentTarget)}
                            // sx={{ height: '52.5px' }}
                            >
                                <Avatar
                                    alt={userName}
                                    scr=""
                                    sx={{ margin: '0 10px 0 0', color: 'info.dark' }}
                                >
                                    {userName?.charAt(0)}
                                </Avatar>

                                <Box
                                    display="flex"
                                    sx={{
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="body3"
                                        sx={{ margin: 'auto' }}
                                    >
                                        {userName.split(' ')[0]}
                                    </Typography>

                                    <ExpandMoreIcon />
                                </Box>
                            </Button>

                            <Menu
                                id="popMenu"
                                anchorEl={popAnchorEl}
                                open={popOpen}
                                onClose={() => setPopAnchorEl(null)}
                                MenuListProps={{ 'aria-labelledby': 'popMenu-btn' }}
                            >
                                <MenuList
                                    sx={{ minWidth: 180 }}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t('Logout')}
                                        </ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <Box
                        sx={{
                            overflowY: 'auto',
                            p: (theme) => theme.spacing(3),
                            height: windowHeight - appBarHeight,
                            flexGrow: 1,
                        }}
                    >
                        <Outlet />
                    </Box>
                </Stack>
            </Stack>
        </React.Fragment>
    );
};

export default Layout;

