import React from 'react';

import PropTypes from 'prop-types';

import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Close from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import Inbox from '@mui/icons-material/MoveToInbox';
import Logout from '@mui/icons-material/Logout';
import Mail from '@mui/icons-material/Mail';
import Menu from '@mui/icons-material/Menu';

/**
 * Componente Icon.
 *
 * Utiliza os ícones do Material UI a partir de um nome.
 *
 * Importe e acrescente os ícones que deseja utilizar no objeto IconsAvailable.
 */
const IconsAvailable = {
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    close: Close,
    expandMore: ExpandMore,
    homeOutlined: HomeOutlined,
    inbox: Inbox,
    logout: Logout,
    mail: Mail,
    menu: Menu,
};

const Icon = ({ name, ...props }) => {
    const Icon = React.useMemo(() => IconsAvailable[name], [name]);

    if (!Icon) {
        return null;
    }

    return <Icon {...props} />;
};

Icon.propTypes = { name: PropTypes.oneOf(Object.keys(IconsAvailable)).isRequired };

export default Icon;
