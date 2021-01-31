import React, { Component } from "react";
import { withRouter } from "react-router";
import DataTable from 'react-data-table-component';

import ClientService from "../../services/ClientService";

const columns = [
	{
		name: 'CPF',
		selector: 'cpf',
		sortable: true,
		format: (row, index) => {
			if(typeof(row.cpf) === 'string') return row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
		}
	},
	{
		name: 'Nome',
		selector: 'name',
		sortable: true,
		//right: true,
	},
	{
		name: 'Telefone',
		selector: 'phone',
		sortable: true,
		format: (row, index) => {
			if(typeof(row.phone) === 'string') return row.phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
		}
	},
	{
		name: 'Celular',
		selector: 'cell',
		sortable: true,
		format: (row, index) => {
			if(typeof(row.cell) === 'string') return row.cell.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
		}
	},
	{
		name: 'E-mail',
		selector: 'mail',
		sortable: true,
	},
];

class ListClientComponent extends Component {
	constructor(props) {
		super(props);
		this.loadData = this.loadData.bind(this);
		this.clickLineEvent = this.clickLineEvent.bind(this);

		this.state  = {
			data: []
		}
		this.loadData();
	}

	loadData() {
		ClientService.getAll()
			.then(response => {
				this.setState({data: response.data});;

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
				title="Lista de Clientes"
				columns={columns}
				data={this.state.data}
				striped={true}
				onRowClicked={this.clickLineEvent}
			/>
		)
	}
};

export default withRouter(ListClientComponent);