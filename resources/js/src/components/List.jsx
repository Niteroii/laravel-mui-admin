/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';

import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiList from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from './Icon';

const handleItemClick = ({
    key, children, onClick, onClickItem, childrenOpen,
    setChildrenOpen,
}) => (e) => {
    console.log('click received', key, children, onClick, onClickItem, childrenOpen);
    if (onClickItem) {
        onClickItem(e);
    }
    if (children) {
        setChildrenOpen({
            ...childrenOpen,
            [key]: !childrenOpen[key],
        });
        return;
    }
    if (onClick) {
        onClick(e);
    }
};

const List = ({
    iconsOnly = false, items, onClick, ...props
}) => {
    const [childrenOpen, setChildrenOpen] = React.useState({ });

    return (
        <MuiList {...props}>
            {items
                .filter(({ hidden = () => false }) => !hidden())
                .map((item) => {
                    const {
                        text, icon, ListItemButtonProps = {}, element = null,
                        key, ListItemProps = {}, children,
                    } = item;

                    if (element) {
                        return element;
                    }

                    const { onClick: onClickItem, ...buttonProps } = ListItemButtonProps;

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
                                onClick={handleItemClick({
                                    key, children, onClick, onClickItem,
                                    childrenOpen, setChildrenOpen,
                                })}
                                {...buttonProps}
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
                                {!iconsOnly && children && (
                                    <Icon
                                        name={childrenOpen[key]
                                            ? 'expandLess'
                                            : 'expandMore'}
                                    />)}
                            </ListItemButton>
                            {children && (
                                <Collapse
                                    in={childrenOpen[key]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List
                                        items={children}
                                        onClick={onClick}
                                        iconsOnly={iconsOnly}
                                        sx={{ pl: iconsOnly ? 0 : 2, pb: 0 }}
                                    />
                                </Collapse>
                            )}
                        </ListItem>
                    );
                })}
        </MuiList>
    );
};

const ListItemPropTypes = PropTypes.oneOfType([
    PropTypes.shape({ element: PropTypes.node.isRequired }),
    PropTypes.shape({
        key: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        icon: Icon.propTypes.name,
        ListItemProps: PropTypes.any,
        ListItemButtonProps: PropTypes.any,
        // children: PropTypes.arrayOf(ListItemPropTypes),
    }),
]);

List.propTypes = {
    iconsOnly: PropTypes.bool,
    items: PropTypes.arrayOf(ListItemPropTypes),
    onClick: PropTypes.func,
};

export default List;
