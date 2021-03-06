import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import UserService from "../../services/UserService";

// Redux
import { changeModalData, changeModalVisibility } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

class EditUserComponent extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveUser = this.saveUser.bind(this);
		this.loadData = this.loadData.bind(this);
		this.showModal = this.showModal.bind(this);

		this.state = {
			id: this.props.match.params.id,
			name: "",
			username: "",
			password: "",
			
			sendButtonDisabled: false,

			submitted: false
		};

		this.loadData(this.state.id);
	}

	loadData(id) {
		UserService.get(id)
			.then((response) => {
				console.log(response);

				this.setState({
					name: response.data.name,
					username: response.data.username,
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

	saveUser() {
		var data = {
			id: this.state.id,
			name: this.state.name,
			username: this.state.username,
			password: this.state.password,
		};

		console.log("data", data);

		this.setState({
			sendButtonDisabled: true,
		});

		UserService.update(data)
			.then(response => {
				let fieldsList = document.querySelectorAll('#submit-form  input, #submit-form  select');
				console.log(fieldsList)
				fieldsList.forEach((element) => {
				  element.classList.remove(['is-valid', 'is-invalid']);
				  element.classList.add('is-valid');
				});
		
				// Verifica se exitem erros
				if('errors' in response.data) {
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
					id: response.data.id,
					name: response.data.name,
					username: response.data.username,
					password: response.password,

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
				<h3 className="mb-4 mt-4">Editar Usuário</h3>
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
							<label htmlFor="username">Usuário</label>
							<input
								type="text"
								className="form-control"
								id="username"
								value={this.state.username}
								onChange={this.onChange}
								name="username"
								required
							/>
						</div>

						<div className="col form-group">
							<label htmlFor="password">Senha</label>
							<input
								type="password"
								className="form-control"
								id="password"
								value={this.state.password}
								onChange={this.onChange}
								name="password"
								required
							/>
						</div>
					</div>

					<button type="button" onClick={this.saveUser} className="btn btn-success" disabled={this.state.sendButtonDisabled}>
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

export default connect(null, mapDispatchToProps)(withRouter(EditUserComponent));