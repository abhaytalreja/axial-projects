import React, { Component } from 'react';
import ProjectInfo from './ProjectInfo';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearProjects } from '../actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function editLinkFormatter(cell, row) {
	return <Link to={"/addEdit/"+row.id}>{cell}</Link>
}


class ProjectSummary extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<h1>Project Summary</h1>
					<Link to="/addEdit" className="btn btn-primary btn-lg pull-left">Create New Project</Link>
					<a href="#" onClick={()=>this.props.clearProjects()} className="btn btn-danger btn-lg pull-right">Delete All Projects</a>
					<ProjectInfo />
				</div>
				<br />
				<br />
				<div className="row">
					<BootstrapTable data={this.props.projects} striped hover search={ true } pagination>
			      <TableHeaderColumn isKey dataField='id' dataFormat={editLinkFormatter} dataSort={ true }>Project ID</TableHeaderColumn>
			      <TableHeaderColumn dataField='headline' dataFormat={editLinkFormatter} dataSort={ true }>Headline</TableHeaderColumn>
			      <TableHeaderColumn dataField='minCheckSize' dataFormat={editLinkFormatter} dataSort={ true }>Min Check Size</TableHeaderColumn>
			      <TableHeaderColumn dataField='maxCheckSize' dataFormat={editLinkFormatter} dataSort={ true }>Max Check Size</TableHeaderColumn>
			      <TableHeaderColumn dataField='minRevenue' dataFormat={editLinkFormatter} dataSort={ true }>Min Revenue</TableHeaderColumn>
			      <TableHeaderColumn dataField='maxRevenue' dataFormat={editLinkFormatter} dataSort={ true }>Max Revenue</TableHeaderColumn>
			      <TableHeaderColumn dataField='minEbitda' dataFormat={editLinkFormatter} dataSort={ true }>Min EBITDA</TableHeaderColumn>
			      <TableHeaderColumn dataField='maxEbitda' dataFormat={editLinkFormatter} dataSort={ true }>Max EBITDA</TableHeaderColumn>
				  </BootstrapTable>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		projects: state
	}
}

export default withRouter(connect(mapStateToProps, { clearProjects })(ProjectSummary));


