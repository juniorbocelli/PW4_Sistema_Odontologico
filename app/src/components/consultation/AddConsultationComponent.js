import React, { Component } from "react";
import NumberFormat from 'react-number-format';
import Form from "react-bootstrap/Form";

import ClientService from "../../services/ClientService";
import ProcedureService from "../../services/ProcedureService";
import ConsultationService from "../../services/ConsultationService";
import ToothService from "../../services/ToothService";

// Redux
import { changeModalData, changeModalVisibility } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddConsultationComponent extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveConsultation = this.saveConsultation.bind(this);
		this.showModal = this.showModal.bind(this);
		this.newConsultation = this.newConsultation.bind(this);

		this.loadClients = this.loadClients.bind(this);
		this.loadProcedures = this.loadProcedures.bind(this);
		this.loadTeeth = this.loadTeeth.bind(this);

		this.state = {
			id: null,
			client_id: "",
			procedure_id: "",
			time: "",
			date: "",
			value: "",
			is_paid: false,
			is_confirmed: false,

			is_dental_procedure: false,

			wasValidated: false,
			sendButtonDisabled: false,

			submitted: false
		};

		this.loadClients();
		this.loadProcedures();
		this.loadTeeth();
	}

	loadClients() {
		ClientService.getAll()
			.then(response => {
				console.log(response);
				let select = document.getElementById("client_id");
				response.data.forEach(line => {
					let newOption = document.createElement("OPTION");
					newOption.value = line.id;
					newOption.innerHTML = line.name;
					select.appendChild(newOption);
				});
			})
			.catch(e => {
				console.error(e);
			})
	}

	loadProcedures() {
		ProcedureService.getAll()
			.then(response => {
				console.log(response);
				let select = document.getElementById("procedure_id");
				response.data.forEach(line => {
					let newOption = document.createElement("OPTION");
					newOption.value = line.id;
					newOption.innerHTML = line.name;
					newOption.setAttribute("data-is_dental", String(line.is_dental));
					select.appendChild(newOption);
				});
			})
			.catch(e => {
				console.error(e);
			})
	}

	loadTeeth() {
		ToothService.getAll()
			.then(response => {
				console.log(response);
				let select = document.getElementById("tooth_code");
				response.data.forEach(line => {
					let newOption = document.createElement("OPTION");
					newOption.value = line.code;
					newOption.innerHTML = line.name;
					select.appendChild(newOption);
				});
			})
			.catch(e => {
				console.error(e);
			})
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});

		if(e.target.name === "procedure_id") {
			let option = document.getElementById("procedure_id").selectedOptions;
			if(option[0].getAttribute("data-is_dental") === "true") {
				this.setState({
					is_dental_procedure: true
				});
				document.getElementById("tooth_code").value = "";
			} else {
				this.setState({
					is_dental_procedure: false
				})
			}
		}
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

	saveConsultation() {
		var data = {
			client_id: this.state.client_id,
			procedure_id: this.state.procedure_id,
			time: String(this.state.date) + "T" + String(this.state.time),
			value: this.state.value,
			is_paid: false,
			is_confirmed: false,
			is_dental_procedure: this.state.is_dental_procedure
		};

		this.setState({
			sendButtonDisabled: true,
		});

		ConsultationService.create(data)
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
					client_id: response.data.client_id,
					procedure_id: response.data.procedure_id,
					time: response.data.time,
					date: response.date,
					value: response.data.value,
					is_paid: response.data.is_paid,
					is_confirmed: response.data.is_confirmed,
					is_dental_procedure: response.data.is_dental_procedure,

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

	newConsultation() {
		this.setState({
			id: null,
			client_id: "",
			procedure_id: "",
			time: "",
			date: "",
			value: "",
			is_paid: false,
			is_confirmed: false,
			is_dental_procedure: false,

			wasValidated: false,
			sendButtonDisabled: false,

			submitted: false
		});
	}

	render() {
		return (
			<Form id="submit-form" className={this.state.wasValidated ? 'was-validated' : ''} noValidate>
				<h3 className="mb-4 mt-4">Nova Consulta</h3>

				{this.state.submitted ? (
					<div>
						<h4>Consulta cadastrada com sucesso!</h4>
						<button className="btn btn-success" onClick={this.newConsultation}>
							Nova
			</button>
					</div>
				) : (
						<div>
							<div className="form-row">

								<div className="col-sm-5 form-group">
									<label htmlFor="client_id">Cliente</label>
									<select
										className="custom-select"
										id="client_id"
										value={this.state.client_id}
										onChange={this.onChange}
										name="client_id"
										required
									>

										<option value="" defaultValue>Escolha uma opção</option>

									</select>
								</div>

								<div className="col-sm-4 form-group">
									<label htmlFor="procedure_id">Procedimento</label>
									<select
										className="custom-select"
										id="procedure_id"
										value={this.state.procedure_id}
										onChange={this.onChange}
										name="procedure_id"
									>

										<option value="" defaultValue>Escolha uma opção</option>

									</select>
								</div>

								<div className="col-sm-3 form-group" style={this.state.is_dental_procedure?{visibility: 'visible'}:{visibility: 'hidden'}}>
									<label htmlFor="tooth_code">Dente</label>
									<select
										className="custom-select"
										id="tooth_code"
										value={this.state.tooth_code}
										onChange={this.onChange}
										name="tooth_code"
									>

										<option value="" defaultValue>Escolha uma opção</option>

									</select>
								</div>

							</div>

							<div className="form-row">
								<div className="col form-group">
									<label htmlFor="cpf">Data</label>
									<input
										type="date"
										className="form-control"
										id="date"
										value={this.state.date}
										onChange={this.onChange}
										name="date"
										required
									/>
								</div>

								<div className="col form-group">
									<label htmlFor="time">Horário</label>
									<input
										type="time"
										className="form-control"
										id="time"
										value={this.state.time}
										onChange={this.onChange}
										name="time"
										required
									/>
								</div>

								<div className="col form-group">
									<label htmlFor="is_confirmed">Confirmada</label>
									<select
										className="custom-select disabled"
										id="is_confirmed"
										value={this.state.is_confirmed}
										onChange={this.onChange}
										name="is_confirmed"
										disabled
										required
									>

										<option value="false" defaultValue>Não</option>

									</select>
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
									<label htmlFor="is_confirmed">Paga</label>
									<select
										className="custom-select disabled"
										id="is_paid"
										value={this.state.is_paid}
										onChange={this.onChange}
										name="is_paid"
										required
										disabled
									>

										<option value="false" defaultValue>Não</option>

									</select>
								</div>

							</div>

							<button type="button" onClick={this.saveConsultation} className="btn btn-success" disabled={this.state.sendButtonDisabled}>
								Cadastrar
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

export default connect(null, mapDispatchToProps)(AddConsultationComponent);