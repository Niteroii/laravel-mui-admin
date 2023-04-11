import React from 'react';

import { Outlet } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import useMediaQuery from '@mui/material/useMediaQuery';

import api from '../../api';

/**
 * Componente raiz de navegação e layout para a área de visitantes.
 *
 * @component
 */
const Guest = () => {
    const isTablet = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const windowHeight = api.hooks.useWindowHeight();

    const appBarHeight = isTablet
        ? api.config.layout.appBarHeight.desktop
        : api.config.layout.appBarHeight.mobile;

    return (
        <Stack
            direction="row"
            spacing={0}
            sx={{
                overflow: 'hidden',
                height: windowHeight,
            }}
        >
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
                        {/* <Menu
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
                                            Sair
                                        </ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Menu> */}
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        overflowY: 'auto',
                        p: (theme) => theme.spacing(2),
                        height: windowHeight - appBarHeight,
                        flexGrow: 1,
                    }}
                >
                    <Outlet />
                </Box>
            </Stack>
        </Stack>
    );
};

export default Guest;

