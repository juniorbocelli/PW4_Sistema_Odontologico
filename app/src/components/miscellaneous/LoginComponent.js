import React, { Component } from "react";

import UserService from "../../services/UserService";

class LoginComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		}

		this.changeHandler = this.changeHandler.bind(this);
		this.submitForm = this.submitForm.bind(this);

		sessionStorage.setItem('user_id', null);
    	sessionStorage.setItem('is_office', null);
	}

	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	submitForm() {
		let data = {
			username: this.state.username,
			password: this.state.password
		}

		let userData = {
			user_id: null,
			is_office: null
		}

		UserService.login(data)
			.then((response) => {
				console.log(response.data);
				console.log(typeof(this.props.parentCallback))

				if(typeof(response.data.is_office) !== "undefined") {
					userData = {
						user_id: response.data.id,
						is_office: response.data.is_office
					}
					this.props.parentCallback(userData);
				} else {
					this.props.parentCallback(userData);
					if(typeof(response.data.error) !== "undefined") document.getElementById('errorMessage').innerHTML = response.data.error
				}
			})
			.catch((e) => {
				console.error(e);
			});
	}

	render() {
		return (
			<form className="form-signin mt-5 pt-5">
				<h1 className="h3 mb-3 font-weight-normal">Login</h1>
				<div className="form-group">
					<label htmlFor="username" className="sr-only">Usuário</label>
					<input type="text" onChange={this.changeHandler} value={this.state.username} id="username" name="username" className="form-control" placeholder="Usuário" required autoFocus />
				</div>
				<div className="form-group">
					<label htmlFor="password" className="sr-only">Senha</label>
					<input type="password" onChange={this.changeHandler} value={this.state.password} id="password" name="password" className="form-control" placeholder="Senha" required />
				</div>
				<button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.submitForm}>Entrar</button>
				<p id="errorMessage" style={{'color': 'red', 'font-weight': 'bolder', 'text-align': 'center'}}></p>
			</form>
		);
	}
}

export default LoginComponent;