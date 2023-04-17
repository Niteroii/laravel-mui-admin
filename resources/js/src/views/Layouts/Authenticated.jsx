import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import Icon from '../../components/Icon';

import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import List from '../../components/List';
import api from '../../api';

const drawerWidth = 280;

/**
 * Add items no menu aqui.
 */
const navMenuItems = [
    {
        key: 1,
        text: t('navigate.home'),
        icon: 'homeOutlined',
        ListItemButtonProps: {
            component: Link,
            to: route('home'),

        },
    },
    {
        element: (
            <Divider
                key="2"
                sx={{ my: 1 }}
            />
        ),
    },

];

const bottomMenuItems = [
    {
        element: (
            <Divider
                key="2"
                sx={{ mb: 1 }}
            />
        ),
    },
    {
        key: 3,
        text: t('navigate.logout'),
        icon: 'logout',
        ListItemButtonProps: { onClick: () => api.auth.logout() },
    },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DrawerFooter = styled(
    Box,
    { shouldForwardProp: (prop) => prop !== 'open' },
)(({ theme, open }) => ({
    // position: 'absolute',
    // bottom: 0,
    flexShrink: 0,
    ...open && openedMixin(theme),
    ...!open && closedMixin(theme),
}));

const AppBar = styled(
    MuiAppBar,
    { shouldForwardProp: (prop) => prop !== 'open' },
)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

const Drawer = styled(
    MuiDrawer,
    { shouldForwardProp: (prop) => prop !== 'open' },
)(({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    },
    ...!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    },
}));

const Authenticated = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const { t } = useTranslation();

    const { name: userName } = React.useMemo(() => blade('user'), []);
    const blockUi = React.useMemo(() => blade('block-ui') === '1', []);

    const isTablet = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const AppBarComponent = React.useMemo(() => isTablet
        ? AppBar
        : MuiAppBar, [isTablet]);

    const DrawerComponent = React.useMemo(() => isTablet
        ? Drawer
        : MuiDrawer, [isTablet]);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBarComponent
                position="fixed"
                open={open}
            >
                <Toolbar>
                    {(!isTablet || !open) && (
                        <IconButton
                            color="inherit"
                            aria-label={t('aria.openDrawer')}
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: { md: 2 } }}
                        >
                            <Icon name="menu" />
                        </IconButton>
                    )}

                    <Typography
                        width="100%"
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        {document.title}
                    </Typography>
                </Toolbar>
            </AppBarComponent>
            <DrawerComponent
                variant={isTablet ? 'permanent' : 'temporary'}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{ sx: { width: drawerWidth } }}
                sx={{
                    display: 'flex',
                    direction: 'flex-column',
                    flexWrap: 'nowrap',
                    height: '100%',
                }}
            >
                <DrawerHeader sx={{ flexShrink: 0 }}>
                    <Button
                        component={Link}
                        to={route('profile')}
                        sx={{ pr: 2 }}
                        onClick={() => !isTablet && setOpen(false)}
                    >
                        <Avatar
                            alt={userName}
                            scr=""
                            sx={{ margin: '0 10px 0 0', color: 'info.dark' }}
                        >
                            {userName?.charAt(0)}
                        </Avatar>
                        <Typography
                            variant="body3"
                            sx={{ margin: 'auto' }}
                        >
                            {userName.split(' ')[0]}
                        </Typography>

                    </Button>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl'
                            ? <Icon name="chevronRight" />
                            : <Icon name="chevronLeft" />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                    {!blockUi && (
                        <List
                            iconsOnly={!open && isTablet}
                            items={navMenuItems}
                            onClick={() => !isTablet && setOpen(false)}
                        />
                    )}
                </Box>

                <DrawerFooter open={open}>
                    <List
                        iconsOnly={!open && isTablet}
                        items={bottomMenuItems}
                        sx={{ pt: 0 }}
                    />
                </DrawerFooter>
            </DrawerComponent>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Authenticated;

