import React, { Component } from "react";
import InputMask from "react-input-mask";
import Form from "react-bootstrap/Form";

import ClientService from "../../services/ClientService";

// Redux
import { changeModalData, changeModalVisibility } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EditClientComponent extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveClient = this.saveClient.bind(this);
		this.showModal = this.showModal.bind(this);
		this.loadData = this.loadData.bind(this);

		this.state = {
			id: this.props.match.params.id,
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

		this.loadData(this.state.id);
	}

	loadData(id) {
		ClientService.get(id)
			.then((response) => {
				console.log(response);
				this.setState({
					cpf: response.data.cpf,
					name: response.data.name,
					gender: response.data.gender,
					birth_date: response.data.birth_date,
					mail: response.data.mail,
					phone: response.data.phone,
					cell: response.data.cell
				});
			})
			.catch((e) => {
				console.error(e);
			});
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
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

	saveClient() {
		var data = {
			id: this.state.id,
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

		ClientService.update(data)
			.then(response => {
				let fieldsList = document.querySelectorAll('#submit-form  input, #submit-form  select');
				console.log(fieldsList)
				fieldsList.forEach((element) => {
					element.classList.remove(['is-valid', 'is-invalid']);
					element.classList.add('is-valid');
				});

				// Verifica se exitem erros
				if ('errors' in response.data) {
					let content = '<ul>';

					this.setState({
						wasValidated: false,
					});

					response.data.errors.forEach((error) => {
						// Adiciona erro a mensagem
						content = content + `<li>${error.msg}</li>`;

						// Muda estilos dos campos com erro
						let element = document.getElementById(error.param);
						element.classList.remove('is-valid');
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

	render() {
		return (
			<Form id="submit-form" className={this.state.wasValidated ? 'was-validated' : ''} noValidate>
				<h3 className="mb-4 mt-4">Editar Cliente</h3>
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
			</Form>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ changeModalData, changeModalVisibility }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditClientComponent);