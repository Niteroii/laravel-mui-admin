/**
 *
 */
class Dialog {

    onShow = null;

    /**
     * Exibe um diálogo.
     *
     * @param {object} options - Configurações do diálogo.
     * Aceita as seguintes chaves:
     * - `message`: string - A mensagem a ser exibida.
     * - `type`: string - Opcional. O tipo do diálogo. Pode ser 'alert' ou 'confirm'.
     * O padrão é 'alert'.
     * - `title`: string - Opcional. O título do diálogo.
     * - `dismissable`: boolean - Opcional. Se o diálogo pode ser fechado clicando
     * fora dele. O padrão é `true`.
     * - `confirmText`: string - Opcional. O texto do botão de confirmação. O padrão é 'Ok'.
     * - `cancelText`: string - Opcional. O texto do botão de cancelamento. O padrão é 'Cancelar'.
     * @return {Promise<boolean|object>} Uma promise que será resolvida quando
     * o diálogo for fechado.
     */
    create(options) {
        return new Promise((resolve) => {
            if (typeof this.onShow === 'function') {
                this.onShow({
                    ...options,
                    resolve,
                });
            }
        });
    }

    /**
     * Exibe um diálogo de alerta.
     * É uma abreviação para `create({ type: 'alert', message })`.
     *
     * @param {string} message - A mensagem a ser exibida.
     */
    alert(message) {
        this.create({ message });
    }

    /**
     * Exibe um diálogo de confirmação.
     * É uma abreviação para `create({ type: 'confirm', message })`.
     *
     * @param {string} message - A mensagem a ser exibida.
     * @return {Promise<boolean>} - Uma promise que será resolvida quando o
     * diálogo for fechado. Se o usuário clicar no botão de confirmação, a promise
     * será resolvida com `true`. Se o usuário clicar no botão de cancelamento ou
     * fechar o diálogo clicando fora dele, a promise será resolvida com `false`.
     */
    confirm(message) {
        return this.create({
            message,
            type: 'confirm',
        });
    }

}

const dialog = new Dialog();

export default dialog;
