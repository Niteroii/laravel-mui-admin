# Laravel MUI Admin

> Laravel^8.0
> React^17.0

Um início rápido para projetos Laravel + React, com um conjunto de ferramentas para alavancar o desenvolvimento.

 - Laravel+React via Laravel UI
 - Material UI como framework de componentes: personalize o tema, utilize componentes prontos e crie os seus próprios.
 - Redux como gerenciador de estado global: utilize o Redux com facilidade e sem a necessidade de configurar ou instalar pacotes adicionais.
 - React Router para navegação SPA.
 - Code splitting via `React.lazy` e `mix.extract`: obtenha o máximo de performance com o mínimo de código.
 - Traduções via `react-i18next`: implementação pronta para internacionalização.
 - Todas as páginas criadas no React: utilize o laravel com 100% de aproveitamento do React em Client-Side.
 - Módulos para trabalhar elementos CRUD: crie, edite, exclua e liste dados com facilidade, de forma padronizada e com poucas linhas de código.
 - Funções JavaScript análogas às utilizadas na engine Blade, como `route` e `error`.
 - Fácil migração para PWA.
 - Serviço `React` no backend para enviar dados pré-carregados ao frontend.
 - API com autenticação JWT.
 - Sistema de permissão baseado em funções pré-configurado.

Ferramentas para desenvolvimento incorporadas:
 - Eslint: configurado com um conjunto de regras baseado no guideline do Airbnb e reforçando práticas como documentação e utilização de traduções - no entanto, é possível alterar as regras para atender às necessidades do projeto.
 - PHP CS Fixer: para padronização de código PHP.
 - Laravel IDE Helper: para facilitar o desenvolvimento com IDEs compatíveis (instalar a extensão se necessário).

Além da instalação e configuração dos pacotes acima, implementações iniciais já são pré-montadas com o intuito de acelerar o desenvolvimento, bem como comandos para criar elementos de frontend no projeto.

## Instalação

### Requisitos

 - PHP 7.4+
 - Composer
 - Node.js 14.0+
 - Npm

### Passo a passo

1. Clone o repositório
2. Instale as dependências do PHP: `composer install`
3. Instale as dependências do Node.js: `npm install`
4. Copie o arquivo `.env.example` para `.env` e configure o banco de dados
5. Crie a chave do app: `php artisan key:generate`
6. Execute as migrations: `php artisan migrate --seed` e anote a senha do usuário criado
7. Construa o frontend: `npm run dev` ou `npm run hot` para desenvolvimento contínuo com hot reloading.
8. Execute o comando `php artisan serve` para iniciar o servidor

## Utilização

### Backend

A estrutura do Laravel de backend é utilizada como base, com o acréscimo de algumas funções e configurações para facilitar o desenvolvimento.

 - `app/Services/React.php`: serviço para manipular dados pré-carregados no frontend. Utilizado principalmente para interagir com endpoints nativos de autenticação e para injetar o usuário autenticado no frontend.

### Frontend

O frontend é construído com React, utilizando o framework Material UI para componentes e Redux para gerenciamento de estado global.

#### Estrutura

A estrutura de pastas do frontend visa replicar a arquitetura do próprio Laravel, com algumas modificações para melhorar a organização e facilitar o desenvolvimento.

 - `resources/js`: pasta raiz do frontend
 - `resources/js/src/components`: componentes React
 - `resources/js/src/lang`: arquivos de traduções. Ver `react-i18next` para mais informações.
 - `resources/js/src/routes`: arquivos de rotas. Ver `react-router-dom` para mais informações.
 - `resources/js/src/views`: páginas React
 - `resources/js/src/api`: agrupamento dos serviços de acesso ao backend e funcionalidades do frontend
    - `resources/js/src/api/@core`: classes e funções base para os serviços
    - `resources/js/src/api/config`: configurações do frontend, com função análoga a pasta `config` do Laravel
    - `resources/js/src/api/constants`: constantes utilizadas no frontend
    - `resources/js/src/api/models`: modelos de dados utilizados no frontend, sendo espelhos dos modelos do backend
    - `resources/js/src/api/state`: espaço para criação de estados globais do Redux

## Documentação

 - [Laravel](https://laravel.com/docs/8.x)
 - [React](https://reactjs.org/docs/getting-started.html)
 - [Material UI](https://mui.com/material-ui/getting-started/overview/)
 - [Redux](https://redux.js.org/introduction/getting-started)
 - [React Router](https://reactrouter.com/en/6.10.0)

## Guias
 
 - Início
    - [Customizando o tema](./.docs/guides/customizando-o-tema.md)
    - [Criando uma renderização](./.docs/guides/criando-uma-renderizacao.md)
    - [Criando páginas, rotas e componentes](./.docs/guides/criando-uma-pagina.md)
 - Construindo a aplicação
    - [Comunicando com a API](./.docs/guides/comunicando-com-a-api.md)
    - [Criando um CRUD](./.docs/guides/criando-um-crud.md)
    - [Gerenciando permissões](./.docs/guides/gerenciando-permissoes.md)
    - [Criando um estado global](./.docs/guides/criando-um-estado-global.md)
    - [Criando um formulário](./.docs/guides/criando-um-formulario.md)
    - [Criando uma tradução](./.docs/guides/criando-uma-traducao.md)
 - Utilitários
    - [Componentes do Projeto](./.docs/guides/componentes-do-projeto.md)
    - [Funções Globais](./.docs/guides/funcoes-globais.md)
    - [Hooks do projeto](./.docs/guides/hooks-do-projeto.md)
    - [Utilizando `Toast` e `Dialog`](./.docs/guides/utilizando-toast-e-dialog.md)
## Roadmap

 - [x] Implantação i18n
 - [ ] Componente para trocar idioma
 - [ ] Lapidação das funções helper globais
 - [ ] Sistema de funções de usuários
 - [ ] Gerenciar dados CRUD com fácil implantação
 - [ ] Área de perfil do usuário
 - [ ] Documentação
 - [ ] Suporte a testes unitários
 - [ ] Suporte ao Laravel 9 e 10
 - [ ] Suporte ao React 18
 - [ ] Transformar em package
