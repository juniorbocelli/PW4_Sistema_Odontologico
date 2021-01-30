import React, { Component } from "react";
import InputMask from "react-input-mask";
import Form from "react-bootstrap/Form";

import ClientService from "../../services/ClientService";

// Redux
import { changeModalData, changeModalVisibility } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddClientComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.checkFrontendValidations = this.checkFrontendValidations.bind(this);
    this.showModal = this.showModal.bind(this);
    this.newClient = this.newClient.bind(this);

    this.state = {
      id: null,
      cpf: "",
      name: "",
      gender: "",
      birth_date: "",
      mail: "",
      phone: "",
      cell: "",
      is_validated_mail: false,

      wasValidated: false,
      sendButtonDisabled: false,

      submitted: false
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkFrontendValidations() {
    const formElement = document.getElementById('submit-form');

    // Validações no frontend
    this.setState({wasValidated: true});
    if(!formElement.checkValidity()) return;

    this.saveClient();
  }

  showModal(title, body, closeBtnTxt = "Fechar", closeBtnVisibility = true, actionBtnTxt = "Ok", actionBtnVisibility = false) {
    const data = {
      title: title, 
      body: body, 
      closeBtnTxt: closeBtnTxt, 
      actionBtnTxt: actionBtnTxt,
      closeBtnVisibility: closeBtnVisibility,
      actionBtnVisibility: actionBtnVisibility
    };

    try {
      this.props.changeModalData(data);
      this.props.changeModalVisibility(true);
    } catch(errors) {
      console.error(errors);
    }
  }

  saveClient() {
    var data = {
      cpf: this.state.cpf,
      name: this.state.name,
      gender: this.state.gender,
      birth_date: this.state.birth_date,
      mail: this.state.mail,
      phone: this.state.phone,
      cell: this.state.cell,
      is_validated_mail: false
    };

    this.setState({
      sendButtonDisabled: true,
    });

    ClientService.create(data)
      .then(response => {
        console.log("Received data:", response.data);
        console.log("Response:", response);

        // Verifica se exitem erros
        if('errors' in response.data) {
          let content = '<ul>';
          let fieldsList;

          this.setState({
            wasValidated: false,
          });

          fieldsList = document.querySelectorAll('#submit-form > input.is-invalid, #submit-form > select.is-invalid, #submit-form > textarea.is-invalid');
          fieldsList.forEach((element) => {
            element.classList.remove('is-invalid');
          });

          response.data.errors.forEach((error) => {
            // Adiciona erro a mensagem
            content = content + `<li>${error.msg}</li>`;

            // Muda estilos dos campos com erro
            let element = document.getElementById(error.param);
            element.classList.add('is-invalid');
          });
          content = content + '</ul>';

          this.showModal("Erro", content);

          this.setState({
            sendButtonDisabled: false,
          });

          return;
        }

        this.setState({
          id: response.data.id,
          cpf: response.data.cpf,
          name: response.data.name,
          gender: response.data.gender,
          birth_date: response.databirth_date,
          mail: response.data.mail,
          phone: response.data.phone,
          cell: response.data.cell,
          is_validated_mail: response.data.is_validated_mail,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          sendButtonDisabled: false,
        });
      });
  }

  newClient() {
    this.setState({
      id: null,
      cpf: "",
      name: "",
      gender: "",
      birth_date: "",
      mail: "",
      phone: "",
      cell: "",
      is_validated_mail: false,

      wasValidated: false,
      sendButtonDisabled: false,

      submitted: false
    });
  }

  render() {
    return (
      <Form id="submit-form" className={this.state.wasValidated?'was-validated':''} noValidate>
        <h3 className="mb-4 mt-4">Cadastrar Novo Cliente</h3>

        {this.state.submitted ? (
          <div>
            <h4>Cliente salvo com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newClient}>
              Novo
            </button>
          </div>
        ) : (
            <div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      name="name"
                      required
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label htmlFor="mail">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="mail"
                      value={this.state.mail}
                      onChange={this.onChange}
                      name="mail"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col form-group">
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                    type="text"
                    className="form-control"
                    id="cpf"
                    value={this.state.cpf}
                    onChange={this.onChange}
                    name="cpf"
                    required
                  />
                </div>

                <div className="col form-group">
                  <label htmlFor="birth_date">Data de nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birth_date"
                    value={this.state.birth_date}
                    onChange={this.onChange}
                    name="birth_date"
                    required
                  />
                </div>

                <div className="col form-group">
                  <label htmlFor="gender">Sexo</label>
                  <select
                    className="custom-select"
                    id="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                    name="gender"
                    required
                  >

                    <option value="" defaultValue>Escolha uma opção</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>

                  </select>
                </div>

                <div className="col form-group">
                  <label htmlFor="phone">Telefone</label>
                  <InputMask
                    mask="(99) 9999-9999"
                    pattern="\(\d{2}\) \d{4}-\d{4}"
                    type="text"
                    className="form-control"
                    id="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                    name="phone"
                    required
                  />
                </div>

                <div className="col form-group">
                  <label htmlFor="cell">Celular</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    pattern="\(\d{2}\) \d{5}-\d{4}"
                    type="text"
                    className="form-control"
                    id="cell"
                    value={this.state.cell}
                    onChange={this.onChange}
                    name="cell"
                    required
                  />
                </div>
              </div>

              <button type="button" onClick={this.saveClient} className="btn btn-success" disabled={this.state.sendButtonDisabled}>
                Salvar
            	</button>
            </div>
          )}
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changeModalData, changeModalVisibility}, dispatch);
}

export default connect(null, mapDispatchToProps)(AddClientComponent);