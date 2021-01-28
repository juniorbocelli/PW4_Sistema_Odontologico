import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importação dos componentes
import AddClientComponent from "./components/client/AddClientComponent";
//import Mod2 from "./components/mod2.component";
//import Mod3 from "./components/mod3-list.component";
import DialogModalComponent from "./components/miscellaneous/DialogModalComponent";

class App extends Component {
  render() {
    return (
      <>
        <div>
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Clínica Odontológica
          </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownConsultations" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Consultas
                </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownConsultations">
                    <Link to={"/consultations"} className="dropdown-item">
                      Ver todas
                    </Link>

                    <Link to={"/new-consultation"} className="dropdown-item">
                      Nova consulta
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/clients/new" id="navbarDropdownClients" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Clientes
                </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownClients">
                    <Link to={"/clients/all"} className="dropdown-item">
                      Ver todos
                  </Link>

                    <Link to={"/clients/new"} className="dropdown-item">
                      Novo cliente
                  </Link>
                  </div>
                </li>

                {/* <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownProcedures" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Procedimentos
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownProcedures">
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
              </ul> */}

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
              {/** <Route exact path={["/", "/tutorials"]} component={TutorialsList} />*/}
              <Route exact path="/clients/new" component={AddClientComponent} />

              {/* Rotas que não estão na navbar */}
              {/**<Route path="/tutorials/:id" component={Tutorial} />*/}
            </Switch>
          </div>
        </div>

        <DialogModalComponent />
      </>
    );
  }
}

export default App;