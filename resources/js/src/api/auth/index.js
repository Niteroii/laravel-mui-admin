/**
 * Classe para gerenciar a autenticação do usuário.
 */
class Auth {

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

}

const auth = new Auth();

export default auth;
