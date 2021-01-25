import React, { Component } from "react";
import InputMask from "react-input-mask";

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

      submitted: false
    };

    // Mostrar o modal para teste
    changeModalData(
      {
        title: "", 
        body: "", 
        closeBtnTxt: "Fechar", 
        actionBtnTxt: "Salvar",
        closeBtnVisibility: true,
        actionBtnVisibility: false,
        //show: true
      });

      changeModalVisibility(true);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  saveClient() {
    const formElement = document.getElementById('submit-form');
    formElement.classList.add('was-validated');

    var data = {
      cpf: this.state.cpf,
      name: this.state.name,
      gender: this.state.gender,
      birth_date: this.state.birth_date,
      mail: this.state.mail,
      phone: this.state.phone,
      cell: this.state.cell,
      is_validated_mail: false,

      submitted: true
    };

    ClientService.create(data)
      .then(response => {
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
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
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

      submitted: false
    });
  }

  hasValidations() {

  }

  showValidationsMessages(errors) {

  }

  render() {
    return (
      <div id="submit-form">
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
                    <label htmlFor="name">Name</label>
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
                    mask="(99) 9 9999-9999"
                    pattern="\(\d{2}\) 9 \d{4}-\d{4}"
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

              <button onClick={this.saveClient} className="btn btn-success">
                Salvar
            	</button>
            </div>
          )}
      </div>
    );
  }
}

const mapSteteToProps = (store)=> ({
  modalState: store.dialogModalState
});

const mapDispatchToProps = (dispatch) => bindActionCreators({changeModalData, changeModalVisibility}, dispatch);

export default connect(mapSteteToProps, mapDispatchToProps)(AddClientComponent);