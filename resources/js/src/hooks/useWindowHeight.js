import React from 'react';

export default () => {
    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        /**
         * Sets `height` state to `window.innerHeight`.
         */
        const handleResize = () => {
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return height;
};
