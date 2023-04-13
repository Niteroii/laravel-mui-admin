/* eslint-disable i18next/no-literal-string */
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

const route = (name, replace = false) => {
    const el = document.getElementById(`route-data-${name}`);

    if (!el) {
        console.warn(`Route data was not found. Make sure '${name}' 
is a valid route name in your routes file. Also check if you have
'React' service injected in your controller, and passed to this route.
\`\`\`php
public function showPage(\\App\\Services\\React $react) {
    return view('view-name')->with(['react' => $react])
}
\`\`\`
If you are trying to check if a route exists, use 'route.exists(name)' instead.`);
        return null;
    }

    const { dataset } = el;

    let { value: url } = dataset;

    // Remove leading and trailing slashes
    url = url.replace(/^\/|\/$/g, '');

    const regex = /{([^}]+)}/g;
    const matches = url.match(regex);
    const params = matches ? matches.map((match) => match.slice(1, -1)) : [];

    if (replace === false) {
        return `/${url.replace(regex, ':$1')}`;
    }

    const replaceKeys = Object.keys(replace);
    const missingParams = params.filter((param) => !replaceKeys.includes(param));
    const extraParams = replaceKeys.filter((key) => !params.includes(key));

    if (missingParams.length > 0) {
        throw new Error(`Missing values for parameter(s): ${missingParams.join(', ')}`);
    }

    if (extraParams.length > 0) {
        throw new Error(`Unexpected parameters: ${extraParams.join(', ')}`);
    }

    const newPath = params.reduce((acc, param) => acc.replace(`{${param}}`, replace[param]), url);

    return `/${newPath}`;
};

route.exists = (name) => !!document.getElementById(`route-data-${name}`);

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
