import { v4 as uuidv4 } from 'uuid';

// esta dependencia devera ser removida
import state from '../../state';

const NOTIFICATION_TIMEOUT = 10000;

/**
 * Serviço de notificações toast.
 *
 * TODO - incluir funcionalidade de notificações push.
 */
class Toast {

    /**
     * Cria uma nova notificação toast.
     *
     * @param {string} message - Mensagem da notificação.
     * @param {'success'|'error'|'info'|'warning'} type - O tipo da notificação. Padrão: 'info'.
     * @param {number} timeout - O tempo de exibição da notificação, em milissegundos.
     * Padrão: 10000.
     */
    create(message, type = 'info', timeout = NOTIFICATION_TIMEOUT) {
        const key = uuidv4();

        state.dispatch({
            type: 'NOTIFICATIONS_CREATE',
            payload: {
                key,
                message,
                type,
            },
        });

        setTimeout(() => this.dismiss(key), timeout);
    }

    /**
     * Cria uma nova notificação toast de sucesso.
     *
     * @param {string} message - Mensagem da notificação.
     */
    success(message) {
        this.create(message, 'success');
    }

    /**
     * Criar uma nova notificação toast de erro.
     *
     * @param {string} message - Mensagem da notificação.
     */
    error(message) {
        this.create(message, 'error');
    }

    /**
     * Criar uma nova notificação toast de informação.
     *
     * @param {string} message - Mensagem da notificação.
     */
    info(message) {
        this.create(message, 'info');
    }

    /**
     * Criar uma nova notificação toast de aviso.
     *
     * @param {string} message - Mensagem da notificação.
     */
    warning(message) {
        this.create(message, 'warning');
    }

    /**
     * Dispensar uma notificação toast.
     *
     * @param {string} key - A chave da notificação.
     */
    dismiss(key) {
        this.constructor.dispatchDismiss(key);
    }

    /**
     * Despachar uma ação para dispensar uma notificação toast.
     *
     * @param {string} payload - O corpo da ação.
     */
    static dispatchDismiss(payload) {
        state.dispatch({
            type: 'NOTIFICATIONS_DISMISS',
            payload,
        });
    }

}

const toast = new Toast();

export default toast;
