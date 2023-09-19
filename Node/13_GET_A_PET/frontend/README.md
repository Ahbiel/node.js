## Criando o front end

Primeiro, vamos instalar o react através do vite, com o comando:
```sh
npm create vite@latest
```

Depois, vamos instalar as seguintes dependências:
```sh
npm i axios events react-icons react-router-dom
```

- axios
  - **Descrição**: O Axios é uma biblioteca JavaScript que é usada para fazer requisições HTTP a servidores. Ele fornece uma maneira fácil de realizar operações assíncronas, como buscar dados de um servidor ou enviar dados para um servidor.
  - **Uso Comum**: O Axios é frequentemente usado em aplicativos React para fazer solicitações de API, buscar dados do servidor e atualizar o estado da aplicação com base nas respostas do servidor.
- events:
  - **Descrição:** O pacote "events" é um módulo nativo do Node.js que permite criar e gerenciar eventos personalizados em sua aplicação. Ele fornece uma maneira de emitir eventos e ouvir (ou "escutar") esses eventos em diferentes partes de seu código.
  - **Uso Comum:** Você pode usar o pacote "events" para criar um sistema de eventos personalizado em seu aplicativo, permitindo que diferentes partes da aplicação se comuniquem de forma eficiente e reajam a eventos específicos.
- react-router-dom:
  - **Descrição:** O React Router DOM é uma biblioteca que ajuda a lidar com a navegação em aplicativos React. Ele permite que você defina rotas para diferentes partes de seu aplicativo e renderize componentes específicos quando um determinado URL é acessado.
  - **Uso Comum:** O React Router DOM é usado para criar aplicativos de página única (SPA) com navegação por meio de URLs. Você pode definir rotas para diferentes páginas ou seções de seu aplicativo e garantir que a interface do usuário seja atualizada dinamicamente à medida que o usuário navega.


Agora, para fazer a chamada da api, vamos criar um arquivo para pôr a url como uma variável de ambiente. Para isso, vamos criar um arquivo chamado **.env.local** e colocar a seguinte linha de comando:
```js
REACT_APP_API='http://localhost:5000/'
```