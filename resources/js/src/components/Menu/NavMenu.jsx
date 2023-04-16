import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from '../Icon';
import api from '../../api';

/**
 * Lida com o logout do usuário.
 */
const handleLogout = () => {
    const { t } = api.lang;

    const dialogOptions = {
        title: t('navigate.logout'),
        message: t('auth.logout.confirm'),
        type: 'confirm',
        confirmText: t('yes'),
        cancelText: t('no'),
    };
    api.dialog.create(dialogOptions).then((result) => {
        if (result) {
            api.auth.logout();
        }
    });
};

const userMenuItems = [
    {
        key: 1,
        text: api.lang.t('navigate.home'),
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
    {
        key: 3,
        text: api.lang.t('navigate.logout'),
        icon: 'logout',
        ListItemButtonProps: { onClick: handleLogout },
    },
];

const NavMenu = ({ iconsOnly = false }) => (
    <List>
        {userMenuItems
            .filter(({ hidden = () => false }) => !hidden())
            .map(({
                text, icon, ListItemButtonProps = {}, element = null,
                key, ItemProps = {},
            }) => {
                if (element) {
                    return element;
                }

                return (
                    <ListItem
                        key={key}
                        disablePadding
                        sx={{ display: 'block' }}
                        {...ItemProps}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: !iconsOnly ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            {...ListItemButtonProps}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: !iconsOnly ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon name={icon} />
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={{ opacity: !iconsOnly ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
    </List>
);

NavMenu.propTypes = { iconsOnly: PropTypes.bool };

export default NavMenu;
