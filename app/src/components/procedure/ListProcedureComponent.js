import React, { Component } from "react";
import { withRouter } from "react-router";
import DataTable from 'react-data-table-component';

import ProcedureService from "../../services/ProcedureService";

const columns = [
	{
		name: 'Nome',
		selector: 'name',
		sortable: true,
		//right: true,
	},
	{
		name: 'Preço',
		selector: 'price',
		sortable: true,
		//right: true,
		format: (row, index) => {
			if (typeof (row.price) === 'number') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.price).toString();
		}
	},
	{
		name: 'Dental?',
		selector: 'is_dental',
		sortable: true,
		//right: true,
		format: (row, index) => {
			if (typeof (row.is_dental) === 'boolean') return row.is_dental ? "Sim" : "Não";
		}
	},
];

class ListProcedureComponent extends Component {
	constructor(props) {
		super(props);
		this.loadData = this.loadData.bind(this);
		this.clickLineEvent = this.clickLineEvent.bind(this);
		this.newProcedure = this.newProcedure.bind(this);

		this.state = {
			data: []
		}
		this.loadData();
	}

	loadData() {
		ProcedureService.getAll()
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

	newProcedure() {
		window.location.href = "/procedures/new";
	}

	render() {
		return (
			<>
				<button className="btn btn-sm btn-success mb-2" onClick={this.newProcedure}>Novo</button>
				<DataTable
					title="Lista de Procedimentos"
					columns={columns}
					data={this.state.data}
					striped={true}
					onRowClicked={this.clickLineEvent}
				/>
			</>
		)
	}
};

export default withRouter(ListProcedureComponent);