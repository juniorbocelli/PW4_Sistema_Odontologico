import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class DialogModalComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "", 
			body: "", 
			closeBtnTxt: "Fechar", 
			actionBtnTxt: "Salvar",
			closeBtnVisibility: true,
			actionBtnVisibility: false,
			show: false
		}
	}

	handleClose = () => {
		this.setState({show: false});
	}

	render() {
		return (
			<Modal show={this.state.show} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{this.state.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{this.state.body}</Modal.Body>
				<Modal.Footer>
					{!this.state.closeBtnVisibility &&
					<Button variant="secondary" onClick={this.handleClose}>
						{this.state.closeBtnTxt}
					</Button>
					}
					{!this.state.actionBtnVisibility &&
					<Button variant="primary" onClick={this.handleClose}>
						{this.state.actionBtnTxt}
					</Button>
					}
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DialogModalComponent;