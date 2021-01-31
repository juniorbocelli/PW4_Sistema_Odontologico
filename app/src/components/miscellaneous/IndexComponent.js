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

const timestamp = new Date();

class IndexComponent extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.clickLineEvent = this.clickLineEvent.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.navigate = this.navigate.bind(this);

        this.state = {
            day: String(timestamp.getUTCFullYear()) + "-" + ("0" + String(timestamp.getUTCMonth() + 1)).slice(-2) + "-" + (String("0" + timestamp.getUTCDate())).slice(-2),
            data: []
        }

        console.log("inicialização", this.state.day);
        this.loadData(this.state.day);
    }

    changeHandler(e) {
        console.log("mudou", e.target.value)
        this.setState({day: e.target.value});

        setTimeout(() => {
            this.loadData(this.state.day);
        }, 1000);
        
    }

    navigate(number) {
        let day = new Date(this.state.day);
        day.setDate(day.getDate() + number);

        this.setState({day: String(day.getUTCFullYear()) + "-" + ("0" + String(day.getUTCMonth() + 1)).slice(-2) + "-" + (String("0" + day.getUTCDate())).slice(-2)});

        console.log("botões", this.state.day)

        setTimeout(() => {
            this.loadData(this.state.day);
        }, 1000);
    }

    loadData(day) {
        ConsultationService.getByDay({day: day})
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
        this.props.history.push("/consultations/" + e.id);
    }

    render() {
        return (
            <>
                <div className="row justify-content-center">
                    <div className="col-sm-4 form-group form-inline">
                        <button className="btn btn-outline-primary mr-2" onClick={() => {this.navigate(-1)}}> &lt; </button>
                        <input id="day" name="day" type="date" className="form-control" onChange={this.changeHandler} value={this.state.day} />
                        <button className="btn btn-outline-primary ml-2" onClick={() => {this.navigate(1)}}> &gt; </button>
                    </div>
                </div>
                <DataTable
                    title="Lista de Consultas"
                    columns={columns}
                    data={this.state.data}
                    striped={true}
                    onRowClicked={this.clickLineEvent}
                />
            </>
        )
    }
};

export default withRouter(IndexComponent);