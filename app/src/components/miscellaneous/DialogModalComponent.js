import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactHtmlParser from 'react-html-parser';

// Redux
import { changeModalData, changeModalVisibility } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DialogModalComponent extends Component {

	handleClose = () => {
		this.props.changeModalVisibility(false);
	}

	actionCallBack = () => {
		this.props.changeModalVisibility(false);
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{ ReactHtmlParser(this.props.body) }</Modal.Body>
				<Modal.Footer>
					{!this.props.closeBtnVisibility &&
					<Button variant="secondary" onClick={this.handleClose}>
						{this.props.closeBtnTxt}
					</Button>
					}
					{!this.props.actionBtnVisibility &&
					<Button variant="primary" onClick={this.actionCallBack}>
						{this.props.actionBtnTxt}
					</Button>
					}
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStateToProps = (store)=> ({
	title: store.dialogModalState.title,
	body: store.dialogModalState.body,
	closeBtnTxt: store.dialogModalState.closeBtnTxt,
	actionBtnTxt: store.dialogModalState.actionBtnTxt,
	closeBtnVisibility: store.dialogModalState.closeBtnVisibility,
	actionBtnVisibility: store.dialogModalState.actionBtnVisibility,
	show: store.dialogModalState.show
});

const mapDispatchToProps = (dispatch) => bindActionCreators({changeModalData, changeModalVisibility}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DialogModalComponent);