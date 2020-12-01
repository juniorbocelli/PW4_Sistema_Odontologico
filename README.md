# PW4_Sistema_Odontologico

Última atualização deste documento 01/12/2020.

## Introdução

Trabalho escolar da matéria **Programação Web 4**, do segundo semestre de 2020, ministrada pelo professor **Danilo Augusto Moschetto**, do aluno **José Paulo Bocelli Júnior**.

## Node.js

Para o backend do projeto usamos o **Noje.js** na versão **14.15.1**.

### Módulos usados

 - express v4.17.1;
 - express-validator v6.6.1;
 - cors v2.8.5;
 - ejs v3.1.5;
 - sequlize v6.3.5;
 - sequelize-cli v6.2.0;
 - mariadb v2.5.1;
 - sucrase v3.16.0;
 - nodemon v2.0.6;
 - yarn v1.22.10.

### Inicializar o projeto

Na pasta, onde você pretende inicializar o projeto, executar o comando para clonar o repositório do Git:

    git clone https://github.com/juniorbocelli/PW4_Sistema_Odontologico.git

### Instalação dos módulos

Com exceção de nodemon, sucrase e yarn todas as instalações podem ser feitas localmente, porém esses três necessitam de instalação global.

    npm install express express-validator cors ejs sequelize sequelize-cli mariadb --save # A opção --save

A opção --save no comando acima não é obrigatória, mas ela vai sobrescrever o arquivo *package.json*, caso alguma versão instalada seja diferente que as indicadas no projeto.

Módulos do Node.js estão em constante evolução e pode ser que no futuro, o projeto atual não funcione em versões de módulos mais novas.

Para instalar versões específicas dos módulos, use:

    npm install [módulo]@[versão]

Por exemplo:

    npm install express@4.17.1
