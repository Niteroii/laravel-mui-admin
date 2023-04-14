import Model from '../contracts/Model';

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
     */
    logout() {
        this.constructor.submitLogoutForm();
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
