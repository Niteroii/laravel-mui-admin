import Model from '../contracts/Model';
import dialog from '../dialog';

/**
 * Classe para gerenciar a autenticação do usuário.
 */
class Auth {

    #user;

    /**
     * Método para submeter o formulário de logout.
     */
    static submitLogoutForm() {
        document.getElementById('logout-form').submit();
    }

    /**
     * Método para fazer o logout do usuário.
     *
     * @param {boolean} force - Fazer logout sem questionar.
     */
    logout(force = false) {
        if (force) {
            this.constructor.submitLogoutForm();
            return;
        }

        const dialogOptions = {
            title: t('navigate.logout'),
            message: t('auth.logout.confirm'),
            type: 'confirm',
            confirmText: t('yes'),
            cancelText: t('no'),
        };
        dialog.create(dialogOptions).then((result) => {
            if (result) {
                this.constructor.submitLogoutForm();
            }
        });
    }

    /**
     * Método para retornar o usuário autenticado.
     *
     * @return {Model} - Instância de Model do usuário autenticado.
     */
    getCurrentUser() {
        if (!this.#user) {
            this.#user = new Model('user', blade('user'));
        }
        return this.#user;
    }

}

const auth = new Auth();

export default auth;
