import _ from 'lodash';
import axios from 'axios';

window._ = _;
window.axios = axios;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.withCredentials = true;

const route = (key, parameters = {}) => {
    const el = document.getElementById(`route-data-${key}`);

    if (!el) {
        return null;
    }

    const { dataset } = el;

    const { value: uri } = dataset;

    const replacedUri = Object.keys(parameters).reduce(
        (acc, key) => acc.replace(`{${key}}`, parameters[key]),
        uri,
    );

    return `/${replacedUri}`;
};

const blade = (key) => {
    const el = document.getElementById(`react-data-${key}`);

    if (!el) {
        return null;
    }

    if (el.dataset.json) {
        return JSON.parse(el.dataset.value);
    }

    return el.dataset.value;
};

const error = (key) => {
    const el = document.getElementById(`error-${key}`);

    if (!el) {
        return null;
    }

    return el.dataset.value;
};

error.clear = () => {
    const els = document.querySelectorAll('#react-injections [id^="error-"]');

    els.forEach((el) => {
        el.remove();
    });
};

window.route = route;
window.blade = blade;
window.error = error;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
