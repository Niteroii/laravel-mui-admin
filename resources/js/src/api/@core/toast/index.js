import { v4 as uuidv4 } from 'uuid';

const NOTIFICATION_TIMEOUT = 10000;

/**
 * Serviço de notificações toast.
 *
 * TODO - incluir funcionalidade de notificações push.
 */
class Toast {

    onShow = null;

    onClose = null;

    /**
     * Cria uma nova notificação toast.
     *
     * @param {string} message - Mensagem da notificação.
     * @param {'success'|'error'|'info'|'warning'} type - O tipo da notificação. Padrão: 'info'.
     * @param {number} timeout - O tempo de exibição da notificação, em milissegundos.
     * Padrão: 10000.
     */
    create(message, type = 'info', timeout = NOTIFICATION_TIMEOUT) {
        if (typeof this.onShow === 'function') {
            this.onShow({
                message,
                type,
                timeout,
                key: uuidv4(),
            });
        }
        // setTimeout(() => this.dismiss(), timeout);
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
     */
    dismiss() {
        if (typeof this.onClose === 'function') {
            this.onClose();
        }
    }

}

const toast = new Toast();

export default toast;
