# Customizando o tema

Para modificar o tema do projeto, basta alterar o arquivo `resources/js/src/api/config/theme.js`.

O objeto exportado por esse arquivo já está sendo utilizado pelo projeto, então basta alterar os valores para que o tema seja modificado.

Para mais informações sobre como customizar o tema, consulte a [documentação do Material UI](https://mui.com/material-ui/customization/theming/).

Para utilizar vários temas, será necessário criar um novo arquivo de configuração e importá-lo no `<ThemeProvider />` apropriado.
