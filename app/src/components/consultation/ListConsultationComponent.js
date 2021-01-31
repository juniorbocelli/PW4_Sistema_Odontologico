import React, { Component } from "react";
import { withRouter } from "react-router";
import DataTable from 'react-data-table-component';

import ConsultationService from "../../services/ConsultationService";

const columns = [
	{
		name: 'Data',
		selector: 'time',
		sortable: true,
		//right: true,
		format: (row) => {
			let timestamp = new Date(row.time);
			return (String("0" + timestamp.getUTCDate())).slice(-2) + "/" + ("0" + String(timestamp.getUTCMonth() + 1)).slice(-2) + "/" + String(timestamp.getUTCFullYear());
		}
	},
	{
		name: 'Início',
		selector: 'time',
		sortable: true,
		//right: true,
		format: (row) => {
			let timestamp = new Date(row.time);
			return (String("0" + timestamp.getUTCHours())).slice(-2) + ":" + ("0" + String(timestamp.getUTCMinutes() + 1)).slice(-2);
		}
	},
	{
		name: 'Fim',
		selector: 'time',
		sortable: true,
		right: true,
		format: (row) => {
			let timestamp = new Date(row.time);
			timestamp.setMinutes(timestamp.getUTCMinutes() + 30);
			return (String("0" + timestamp.getUTCHours())).slice(-2) + ":" + ("0" + String(timestamp.getUTCMinutes() + 1)).slice(-2);
		}
	},
	{
		name: 'Cliente',
		selector: 'client.name',
		sortable: true,
		//right: true,
	},
	{
		name: 'Confirmada?',
		selector: 'is_confirmed',
		sortable: true,
		//right: true,
		format: (row, index) => {
			if (typeof (row.is_confirmed) === 'boolean') return row.is_confirmed ? "Sim" : "Não";
		}
	},
	{
		name: 'Paga?',
		selector: 'is_paid',
		sortable: true,
		//right: true,
		format: (row, index) => {
			if (typeof (row.is_paid) === 'boolean') return row.is_paid ? "Sim" : "Não";
		}
	},
];

class ListConsultationComponent extends Component {
	constructor(props) {
		super(props);
		this.loadData = this.loadData.bind(this);
		this.clickLineEvent = this.clickLineEvent.bind(this);

		this.state = {
			data: []
		}
		this.loadData();
	}

	loadData() {
		ConsultationService.getAll()
			.then(response => {
				this.setState({ data: response.data });;

				console.log(response.data);
			})
			.catch(e => {
				console.error(e);
			})
	}

	clickLineEvent(e) {
		console.log(this.props);
		window.location.href = this.props.location.pathname + "/" + e.id;
	}

	render() {
		return (
				<DataTable
					title="Lista de Consultas"
					columns={columns}
					data={this.state.data}
					striped={true}
					onRowClicked={this.clickLineEvent}
				/>
		)
	}
};

export default withRouter(ListConsultationComponent);