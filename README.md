# Boas vindas ao repositório do projeto Softeo Backend!

## Descrição do projeto

O desafio consistiu na criação de uma aplicação web para gerenciamento de uma lista de valores cobrados por uma odontologista. Nele é possível criar usuário, realizar login através do dentiste e a criar, atualizar dados, filtrar por data do procedimento e deletar o cliente. Este é o frontend da aplicação.
<br/>
A ideia de realizar cadastro na aplicação se deve a possibilidade de outras pessoas também poderem usar no futuro.

---

## Instalação do projeto localmente

Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido.

1. Abra o terminal e crie um diretório no local de sua preferência com o comando **mkdir**:
```javascript
  mkdir projeto-humberto
```

2. Entre no diretório que acabou de criar e depois clone o projeto:
```javascript
  cd projeto-humberto
  git clone git@github.com:Humberto-Bonadiman/softeo-backend.git
```

3. Acesse o diretório do projeto e depois utilize o comando **npm i** para instalar todas as dependências necessárias:
```javascript
  cd softeo-backend
  npm install
```

4. Gere a migration do projeto através do comando:
```javascript
  npm run migrate
```

5. Por último, rode o comando **npm start** e acesse o projeto via browser, no caminho `http://localhost:3001/`.
```javascript
  npm start
```
Ou também é possível rodar a aplicação pelo comando:
```javascript
  npm run nodemon
```

---

## Heroku da aplicação

Para visitar a aplicação no heroku basta acessar o link: https://softeo-backend-humberto.herokuapp.com
<br/>
Para visitar o frontend da aplicação no heroku basta acessar o link: https://softeo-frontend-humberto.herokuapp.com

Observação: Para acessar os dados do cliente pelo back-end é necessário o token que é gerado no momento do login.

---

## Github da aplicação frontend

Link: https://github.com/Humberto-Bonadiman/softeo-frontend

---

## Rodar o banco de dados com o docker

Rode o comando:
```javascript
  npm run start-docker
```
<br/>

Gere a migration do projeto
```javascript
  npm run migrate
```

Inicie a aplicação:
```javascript
  npm start
```

## Documentação com Swagger

![Documentação Swagger](images/swagger.png)

Para acessar a documentação pelo swagger rode o comando **npm start** e acesse o projeto via browser, no caminho `http://localhost:3001/docs`
