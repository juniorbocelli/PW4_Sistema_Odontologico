import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importação dos componentes
//import Mod1 from "./components/mod1.component";
//import Mod2 from "./components/mod2.component";
//import Mod3 from "./components/mod3-list.component";

class App extends Component {
  render() {
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Clínica Odontológica
          </a>
          <div className="navbar-nav mr-auto">

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownConsultations" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Consultas
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownConsultations">
                <Link to={"/consultations"} className="dropdown-item">
                  Ver todas
                </Link>

                <Link to={"/new-consultation"} className="dropdown-item">
                  Nova consulta
                </Link>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownClients" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Clientes
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownClients">
                <Link to={"/clients"} className="dropdown-item">
                  Ver todos
                </Link>

                <Link to={"/new-client"} className="dropdown-item">
                  Novo cliente
                </Link>
              </div>
            </li>

            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownProcedures" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Procedimentos
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownProcedures">
                  <Link to={"/procedures"} className="dropdown-item">
                    Ver todos
                  </Link>

                  <Link to={"/new-procedure"} className="dropdown-item">
                    Novo procedimento
                  </Link>
                </div>
              </li>

              <Link to={"/user/:id"} className="dropdown-item">
                Novo procedimento
                </Link>
            </ul>

          </div>
        </nav>

        {/**
         * ROTAS
         * Já que estamos criando uma aplicação single page, a parte de todas do React deve
         * conter não apenas as rotas da navbar, mas todas as rotas do aplicativo
         */}
        <div className="container mt-3">
          <Switch>
            {/* Rotas que estão que estão na navbar */}
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />

            {/* Rotas que não estão na navbar */}
            <Route path="/tutorials/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;