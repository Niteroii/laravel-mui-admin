import auth from './@core/auth';
import config from './config';
import dialog from './@core/dialog';
import hooks from './@core/hooks';
import state from './state';

import toast from './@core/toast';

/**
 * A entrada da API do projeto.
 *
 * Entende-se por API do projeto a interface de comunicação com o servidor e com
 * os serviços incorporados ao projeto, como o sistema de autenticação, o
 * sistema de notificações, o sistema de diálogos, o sistema de estado, etc.
 *
 */
export default {
    auth,
    config,
    dialog,
    hooks,
    state,
    toast,
};

