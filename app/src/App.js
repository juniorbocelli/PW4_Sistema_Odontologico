import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

// Importação dos componentes
import AddClientComponent from "./components/client/AddClientComponent";
import AddProcedureComponent from "./components/procedure/AddProcedureComponent";
import AddConsultationComponent from "./components/consultation/AddConsultationComponent";
import EditUserComponent from "./components/user/EditUserComponent";
import DialogModalComponent from "./components/miscellaneous/DialogModalComponent";

class App extends Component {
  render() {
    return (
      <>
        <div>
          {/* Navbar */}
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Clínica Odontológica</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

                <NavDropdown title="Consultas" id="navbarDropdownConsultations">
                  <NavDropdown.Item href="/consultations">
                    Ver todas
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/consultations/new">
                    Nova consulta
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Clientes" id="navbarDropdownClients">
                  <NavDropdown.Item href="/clients">
                    Ver todos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/clients/new">
                    Novo cliente
                  </NavDropdown.Item>
                </NavDropdown>

              </Nav>
            </Navbar.Collapse>

            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="mr-2">
                <NavDropdown title="Administração" id="navbarDropdownAdmin">
                  <NavDropdown.Item href="/users/1">
                    Meus dados
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/procedures/new">
                    Procedimentos
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          </Navbar>

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
              <Route exact path="/procedures/new" component={AddProcedureComponent} />
              <Route exact path="/consultations/new" component={AddConsultationComponent} />
              <Route exact path="/users/:id" component={EditUserComponent} />

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