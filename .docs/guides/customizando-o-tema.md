# Customizando o tema

Para modificar o tema do projeto, basta alterar o arquivo `resources/js/src/api/config/theme.js`.

O objeto exportado por esse arquivo já está sendo utilizado pelo projeto, então basta alterar os valores para que o tema seja modificado.

Para mais informações sobre como customizar o tema, consulte a [documentação do Material UI](https://mui.com/material-ui/customization/theming/).

Para utilizar vários temas, será necessário criar um novo arquivo de configuração e importá-lo no `<ThemeProvider />` apropriado.

[]: # ## Criando uma página
[]: # 
[]: # Para criar uma nova página, basta criar um novo arquivo na pasta `resources/js/src/views` com o seguinte conteúdo:
[]: # 
[]: # ```js
[]: # import React from 'react';
[]: # import { Box } from '@mui/material';
[]: # 
[]: # export const App = () => {
[]: #   return (
[]: #     <Box>
[]: #       <h1>Olá, mundo!</h1>
[]: #     </Box>
[]: #   );
[]: # };
[]: # ```
[]: # 
[]: # O arquivo deve ser nomeado com o nome da página, e deve ser adicionado ao arquivo `resources/js/src/views/index.js`.
[]: # 
[]: # ```js
[]: # export { App } from './App';
[]: # ```
[]: # 
[]: # Para mais informações sobre como criar uma página, consulte a documentação do React.
[]: # 
[]: # ## Utilizando `Toast` e `Dialog`
[]: # 
[]: # Para utilizar o `Toast` e o `Dialog`, basta importar o `use
