import React, { Component } from "react";
import NumberFormat from 'react-number-format';
import Form from "react-bootstrap/Form";

import ProcedureService from "../../services/ProcedureService";

// Redux
import { changeModalData, changeModalVisibility } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddProcedureComponent extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveProcedure = this.saveProcedure.bind(this);
		this.checkFrontendValidations = this.checkFrontendValidations.bind(this);
		this.showModal = this.showModal.bind(this);
		this.newProcedure = this.newProcedure.bind(this);

		this.state = {
			id: null,
			name: "",
			value: "",
			is_dental: false,

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
		this.setState({ wasValidated: true });
		if (!formElement.checkValidity()) return;

		this.saveProcedure();
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
		} catch (errors) {
			console.error(errors);
		}
	}

	saveProcedure() {
		var data = {
			name: this.state.name,
			value: this.state.value,
			is_dental: this.props.is_dental === "true" ? true : false,
		};

		this.setState({
			sendButtonDisabled: true,
		});

		ProcedureService.create(data)
			.then(response => {
				console.log("Received data:", response.data);
				console.log("Response:", response);

				// Verifica se exitem erros
				if ('errors' in response.data) {
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
					name: response.data.name,
					value: response.data.value,
					is_dental: response.data.is_dental ? "true" : "false",

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

	newProcedure() {
		this.setState({
			id: null,
			name: "",
			value: "",
			is_dental: false,

			wasValidated: false,
			sendButtonDisabled: false,

			submitted: false
		});
	}

	render() {
		return (
			<Form id="submit-form" className={this.state.wasValidated ? 'was-validated' : ''} noValidate>
				<h3 className="mb-4 mt-4">Cadastrar Novo Cliente</h3>

				{this.state.submitted ? (
					<div>
						<h4>Cliente salvo com sucesso!</h4>
						<button className="btn btn-success" onClick={this.newProcedure}>
							Novo
            </button>
					</div>
				) : (
						<div>
							<div className="form-row">
								<div className="col form-group">
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

								<div className="col form-group">
									<label htmlFor="value">Preço</label>
									<NumberFormat
										className="form-control"
										id="value"
										value={this.state.value}
										onChange={this.onChange}
										name="value"
										thousandSeparator="."
										decimalSeparator=","
										decimalScale={2}
										fixedDecimalScale={true}
										allowNegative={false}
										required
									/>
								</div>

								<div className="col form-group">
									<label htmlFor="is_dental">O Procedimento é dental?</label>
									<select
										className="custom-select"
										id="is_dental"
										value={this.state.is_dental}
										onChange={this.onChange}
										name="is_dental"
										required
									>

										<option value="true">Sim</option>
										<option value="false">Não</option>

									</select>
								</div>
							</div>

							<button type="button" onClick={this.saveProcedure} className="btn btn-success" disabled={this.state.sendButtonDisabled}>
								Salvar
              </button>
						</div>
					)}
			</Form>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ changeModalData, changeModalVisibility }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddProcedureComponent);