# Criando páginas, rotas e componentes

## Introdução

Neste guia, você aprenderá como criar uma páginas, rotas e componentes no frontend do projeto. Para isso, você precisará entender um pouco sobre React e React Router. Se você não conhece, recomendamos que você leia a documentação deles antes de continuar.

## Criando a página

Para criar uma página, você precisará criar um arquivo na pasta `resources/js/src/views`. Por exemplo, vamos criar uma página chamada `ExamplePage`:

```jsx
import React from 'react';

const ExamplePage = () => {
  return <div>Example Page</div>;
};

export default ExamplePage;
```

## Utilizando `artisan make:react-component`

O projeto possui um comando `artisan` para facilitar a criação de páginas. Para utilizá-lo, você precisará executar o comando `php artisan make:react-component` com a option `--page` e passar o nome da página a ser criada. Por exemplo, vamos criar uma página chamada `ExamplePage`:

```bash
php artisan make:react-component ExamplePage --page
```

O comando irá criar o arquivo `ExamplePage.jsx` na pasta `resources/js/src/views`.

## Criando a rota

Para acessar a página, você precisará criar uma rota para ela, dentro de uma renderização existente. Para isso, você precisará modificar o arquivo de rotas na pasta `resources/js/src/routes`. Por exemplo, vamos criar uma rota para a página `ExamplePage` dentro da renderização `guest`:

- `resources/js/src/routes/guest.jsx`
```jsx
export default [
   // ...
  {
    path: '/example',
    component: (
        <Suspense>
            {React.lazy(() => import('../views/ExamplePage')))}
        </Suspense>
    ),
  },
];
```

 > **Obs**: Caso deseje que a página apareça dentro da estrutura de Layout da renderização, adicione a rota dentro do array `children` da rota raiz.

Adicione também a rota ao Laravel, no arquivo `routes/web.php`:

```php
Route::get('/example', function () {
    return view('guest');
});
```

## Utilizando rotas nomeadas

Para facilitar a navegação entre as páginas, você pode utilizar rotas nomeadas. Para isso, você precisará adicionar um nome para a rota, no arquivo de rotas:

- `routes/web.php`
```php
Route::get('/example', function (\App\Services\React $react) {
    return view('guest')->with(['react' => $react]);
})->name('example');
```

Ao injetar o serviço `React` no controller e enviar para a view, você poderá utilizar a função global `route` para gerar a URL da rota a partir do nome:

```jsx
<Link to={route('example')}>
    Go To Example Page
</Link>
```

A função `route` também aceita parâmetros, que serão substituidos na URL:

```jsx
// route 'post.item': post/{id}
console.log(route('post.item', { id: 1 })); // /post/1

// route 'comment.item': post/{postId}/comment/{id}
console.log(route('comment.item', { postId: 1, id: 2 })); // /post/1/comment/2
```

Para registrar uma rota no React Router utilizando uma rota nomeada com parâmetros, você precisará adicionar um `:` antes do nome do parâmetro, e poderá utilizar a função `route` para gerar a URL da rota a partir do nome:

```jsx
{
  // routes/web.php: route name: post.item | post/{id}
  path: route('post.item', { id: ':id' }), // /post/:id
  component: (
      <Suspense>
          {React.lazy(() => import('../views/PostItemPage')))}
      </Suspense>
  ),
},
``` 

## Criando um componente

Em essência, uma página não deixa de ser um componente. Mas nessa documentação chamamos de "página" aquele componente que será renderizado diretamente por uma rota, e entendemos como "componente" um elemento que não será renderizado diretamente por uma rota, mas sim por outra página/componente.

Para a organização do projeto, os componentes ficam na pasta `resources/js/src/components`, e devem ser criados da mesma maneira que as páginas. Para utilizar o comando `artisan`, você precisará executar o comando `php artisan make:react-component` sem a option `--page` e passar o nome do componente a ser criado. Por exemplo, vamos criar um componente chamado `ExampleComponent`:

```bash
php artisan make:react-component ExampleComponent
```

O comando irá criar o arquivo `ExampleComponent.jsx` na pasta `resources/js/src/components`.
