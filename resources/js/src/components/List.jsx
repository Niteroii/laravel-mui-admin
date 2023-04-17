/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiList from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from './Icon';

const List = ({ iconsOnly = false, items }) => (
    <MuiList>
        {items
            .filter(({ hidden = () => false }) => !hidden())
            .map(({
                text, icon, ListItemButtonProps = {}, element = null,
                key, ListItemProps = {},
            }) => {
                if (element) {
                    return element;
                }

                return (
                    <ListItem
                        key={key}
                        disablePadding
                        sx={{ display: 'block' }}
                        {...ListItemProps}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: !iconsOnly ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            {...ListItemButtonProps}
                        >
                            {icon && (
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: !iconsOnly ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon name={icon} />
                                </ListItemIcon>
                            )}
                            <ListItemText
                                primary={text}
                                sx={{ opacity: !iconsOnly ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
    </MuiList>
);

List.propTypes = {
    iconsOnly: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({ element: PropTypes.node.isRequired }),
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            icon: Icon.propTypes.name,
            ListItemProps: PropTypes.any,
            ListItemButtonProps: PropTypes.any,
        }),
    ])),
};

export default List;
