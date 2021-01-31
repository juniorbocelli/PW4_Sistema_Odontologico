import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

// Importação dos componentes
import AddClientComponent from "./components/client/AddClientComponent";
import ListClientComponent from "./components/client/ListClientComponent";
import EditClientComponent from "./components/client/EditClientComponent";

import AddProcedureComponent from "./components/procedure/AddProcedureComponent";
import ListProcedureComponent from "./components/procedure/ListProcedureComponent";
import EditProcedureComponent from "./components/procedure/EditProcedureComponent";

import AddConsultationComponent from "./components/consultation/AddConsultationComponent";
import ListConsultationComponent from "./components/consultation/ListConsultationComponent";
import EditConsultationComponent from "./components/consultation/EditConsultationComponent";

import EditUserComponent from "./components/user/EditUserComponent";
import DialogModalComponent from "./components/miscellaneous/DialogModalComponent";
import IndexComponent from "./components/miscellaneous/IndexComponent";
import LoginComponent from "./components/miscellaneous/LoginComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: sessionStorage.getItem('user_id'),
      is_office: sessionStorage.getItem('is_office'),
    }
  }

  handleCallback = (userData) => {
    sessionStorage.setItem('user_id', userData.user_id);
    sessionStorage.setItem('is_office', userData.is_office);
    this.setState({
      user_id: userData.user_id,
      is_office: userData.is_office
    });
  }

  render() {
    return (
      <div>
        {this.state.is_office !== null ? (
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
                    {this.state.is_office ? (
                    <NavDropdown title="Clientes" id="navbarDropdownClients">
                      <NavDropdown.Item href="/clients">
                        Ver todos
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/clients/new">
                        Novo cliente
                      </NavDropdown.Item>
                  </NavDropdown>
                    ):(<div></div>)}

                  </Nav>
                </Navbar.Collapse>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Nav className="mr-4">
                    <NavDropdown title="Administração" id="navbarDropdownAdmin">
                      <NavDropdown.Item href={"/users/" + this.state.user_id}>
                        Meus dados
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/procedures">
                        Procedimentos
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => {
                        let data = {
                          user_id: null,
                          is_office :null
                        }
                        this.handleCallback(data);
                      }}>
                        Logout
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
                  <Route exact path="/clients" component={ListClientComponent} />
                  <Route exact path="/clients/:id" component={EditClientComponent} />

                  <Route exact path="/procedures/new" component={AddProcedureComponent} />
                  <Route exact path="/procedures" component={ListProcedureComponent} />
                  <Route exact path="/procedures/:id" component={EditProcedureComponent} />

                  <Route exact path="/consultations/new" component={AddConsultationComponent} />
                  <Route exact path="/consultations" component={ListConsultationComponent} />
                  <Route exact path="/consultations/:id" component={EditConsultationComponent} />

                  <Route exact path="/users/:id" component={EditUserComponent} />
                  <Route exact path="/" component={IndexComponent} />

                  {/* Rotas que não estão na navbar */}
                  {/**<Route path="/tutorials/:id" component={Tutorial} />*/}
                </Switch>
              </div>
            </div>
            <DialogModalComponent />
          </>
        ) : (
            <LoginComponent parentCallback={this.handleCallback} />
          )}
      </div>
    );
  }
}

export default App;