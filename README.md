
# PW4_Sistema_Odontologico

Este documentos está em constante desenvolvimento. Consulte também a seção Wiki do GitHub para ter acesso a mais documentação do projeto.

O projeto ainda está em desenvolvimento; não está terminado. Não espere tentar executá-lo em sua máquina e não encontrar bugs e requisitos que ainda não foram implementado.

(Última atualização: 16/12/2020)

## Introdução

Trabalho escolar da matéria **Programação Web 4**, do segundo semestre de 2020, ministrada pelo professor **Danilo Augusto Moschetto**, do aluno **José Paulo Bocelli Júnior**.

## Banco de Dados

Neste projeto utilizamos o Sequelize, um ORM que vai facilitar muito a nossa vida com as operações CRUD no banco de dados. O Sequelize trabalha, de acordo com a sua [documentação oficial](https://sequelize.org/master/index.html), pode trabalhar com uma porção de bancos de dados diferente; para o nosso projeto escolhemos o MariaDB.

Portanto, para poder executar o projeto na sua máquina, será necessário ter o banco de dados MariaDB instalado e funcionando. Caso ainda não tenha o banco de dados MariaDB no teu computador, sugerimos que faça a instalação do [XAMMP](https://www.apachefriends.org/pt_br/index.html).

### Configurando o Banco de Dados

As configurações de banco de dados do projeto estão no arquivo *PW4_Sistema_Odontologico\api\config\database.js* e são as seguintes:

    module.exports  = {
		dialect: 'mariadb',
		host: '127.0.0.1',
		username: 'root',
		password: '',
		database: 'pw4_sistema_odontologico',
		define: {
			timestamps: false,
			underscored: true,
			underscoredAll: true,
		},
	}

Caso teu banco de dados tenha uma configuração diferente, basta modificar os dados no arquivo. Repare que será necessário criar um banco para o projeto, chamado  ***pw4_sistema_odontologico***.

## Node.js

Para o backend do projeto usamos o **Noje.js** na versão **14.15.1**.

### Módulos usados

 - express v4.17.1;
 - express-validator v6.8.0;
 - cors v2.8.5;
 - ejs v3.1.5;
 - sequlize v6.3.5;
 - sequelize-cli v6.2.0;
 - mariadb v2.5.1;
 - sucrase v3.16.0;
 - nodemon v2.0.6;
 - yarn v1.22.10;
 - bcryptjs v2.4.3;
 - express-session v1.17.1;
 - node-cron v2.0.3;
 - nodemailer 6.4.16;
 - passport v0.4.1;
 - passport-local v1.0.0.

### Inicializar o projeto

Na pasta, onde você pretende inicializar o projeto, executar o comando para clonar o repositório do Git:

    git clone https://github.com/juniorbocelli/PW4_Sistema_Odontologico.git

### Instalação dos módulos

Com exceção de nodemon, sucrase e yarn todas as instalações podem ser feitas localmente, porém esses três necessitam de instalação global.

    npm install express express-validator cors ejs sequelize sequelize-cli mariadb bcryptjs express-session node-cron nodemailer passport passport-local --save # A opção --save

Depois, para os módulos globais:

    npm install nodemon yarn sucrase --global -- save

A opção --save no comando acima não é obrigatória, mas ela vai sobrescrever o arquivo *package.json*, caso alguma versão instalada seja diferente que as indicadas no projeto.

Módulos do Node.js estão em constante evolução e pode ser que no futuro, o projeto atual não funcione em versões de módulos mais novas.

Para instalar versões específicas dos módulos, use:

    npm install [módulo]@[versão]

Por exemplo:

    npm install express@4.17.1

### Inicializando o Sequelize

O processo de inicialização e configuração de um projeto usando o ORM Sequelize estão bem documentados no site oficial e não será discutida aqui. Aqui vamos nos limitar a dizer que o arquivo de configuração do Sequelize estão no arquivo *PW4_Sistema_Odontologico\.sequelizerc* e os modelos para a criação das tabelas na pasta *PW4_Sistema_Odontologico\api\database\migrations*.

Para a inicialização do banco de dados do projeto e a criação das tabelas, basta executar o comando:

    yarn sequelize db:migrate

Se tudo correr bem, você poderá observar as tabelas criadas no banco de dados indicado.

## Executando o projeto

Para executar o projeto, basta executar o código:

    nodemon api/server.js

O servidor estará funcionando em http://localhost:5000/.

Para testá-lo (já que ainda não temos a parte do frontend pronta) nós recomendamos o software [Postman](https://www.postman.com/downloads/), para mandar requisições e observar as respostas.

### As Rotas

Neste projeto adotamos a seguinte nomenclatura para as rotas do sistema:

 - **index**:  mostra lista de uma entidade do banco;
 - **show**: mostra os dados de uma entidade do banco;
 - **store**: salva os dados de uma nova entidade no banco;
 - **update**: atualiza os dados de uma entidade no banco;
 - **delete**: deleta uma entidade do banco.

Essas são as rotas essenciais, mas existem outras rotas especiais e com outros nomes no sistema, por exemplo a de login. Para conferir todas as rotas, acesse o arquivo *PW4_Sistema_Odontologico\api\routes.js*.

### As Validações

Para manter a segurança do sistema e a consistência dos dados persistidos no banco de dados, nosso sistema utiliza um módulo chamado [Express Validator](https://express-validator.github.io/docs/). As validações disponíveis pelo módulo estão disponíveis [aqui](https://github.com/validatorjs/validator.js). Para saber quais foram as validações utilizadas no projeto, verificar as classes na pasta *PW4_Sistema_Odontologico\src\app\models\validators*.