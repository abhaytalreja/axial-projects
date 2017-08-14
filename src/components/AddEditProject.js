import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormControl, FormGroup, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import { addProject, editProject } from '../actions';
import { connect } from 'react-redux';

var regex = new RegExp("(^[0-9]+)[k|m|b]");
var regexNumbers = new RegExp("[0-9]");

class AddEditProject extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
  		isValidHeadline: null,
			isValidMinCheckSize: null,
			isValidMaxCheckSize: null,
			isValidMinRevenue: null,
			isValidMaxRevenue: null,
			isValidMinEbitda: null,
			isValidMaxEbitda: null
	  };
	  this.updateProject = this.updateProject.bind(this);
	}

	componentDidMount() {
		if(this.props.match.params.id) {
			console.log('id is present');
			let project = this.props.projects[this.props.match.params.id];
			this.headline.value = project.headline;
			this.minCheckSize.value = project.minCheckSize;
			this.maxCheckSize.value = project.maxCheckSize;
			this.minRevenue.value = project.minRevenue;
			this.maxRevenue.value = project.maxRevenue;
			this.minEbitda.value = project.minEbitda;
			this.maxEbitda.value = project.maxEbitda;
		} else {
			console.log('id is not present');
		}
	}

	updateProject() {
		console.log('Submit Project', this.minRevenue.value.replace('/\,/g',''));

		let project = {
			headline: this.headline.value,
			minCheckSize: parseInt(this.minCheckSize.value.replace(/,/g, '')),
			maxCheckSize: parseInt(this.maxCheckSize.value.replace(/,/g, '')),
			minRevenue: parseInt(this.minRevenue.value.replace(/,/g, '')),
			maxRevenue: parseInt(this.maxRevenue.value.replace(/,/g, '')),
			minEbitda: parseInt(this.minEbitda.value.replace(/,/g, '')),
			maxEbitda: parseInt(this.maxEbitda.value.replace(/,/g, ''))
		}

		let isValid = this.validateCheckSize(project);
		isValid = isValid ? this.validateRevenue(project) : isValid;
		isValid = isValid ? this.validateEbitda(project) : isValid;

		console.log(project);

		console.log(isValid);

		if(isValid) {
			if(this.props.match.params.id) {
				project.id = this.props.match.params.id;
				this.props.editProject(project);
			} else {
				this.props.addProject(project);
			}
			this.props.history.push('/');
		}
	}

	numberWithCommas(event) {
		let field = event.target.name.charAt(0).toUpperCase() + event.target.name.slice(1);
		let reactField = "isValid"+field;
		let obj = {}
		console.log(reactField, event.target.value);
		if(event.target.value && (regex.test(event.target.value) || regexNumbers.test(event.target.value))) {
			let newValue = event.target.value.replace("k", "000").replace("m", "000000").replace("b", "000000000");
    	event.target.value = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	obj[reactField] = "success";
			this.setState(obj);
		} else {
			obj[reactField] = "error";
			this.setState(obj);
		}
	}

	validateCheckSize(project) {
		if(project.minCheckSize < project.maxCheckSize) {
			this.setState({isValidMinCheckSize: "success", isValidMaxCheckSize: "success"});
			return true;
		} else {
			this.setState({isValidMinCheckSize: "error", isValidMaxCheckSize: "error"});
			return false;
		}
	}

	validateRevenue(project) {
		console.log("Revenue",project.minRevenue, project.maxRevenue);
		if(project.minRevenue < project.maxRevenue) {
			this.setState({isValidMinRevenue: "success", isValidMaxRevenue: "success"});
			return true;
		} else {
			console.log("Should be an error");
			this.setState({isValidMinRevenue: "error", isValidMaxRevenue: "error"});
			return false;
		}
	}

	validateEbitda(project) {
		if(project.minEbitda < project.maxEbitda) {
			this.setState({isValidMinEbitda: "success", isValidMaxEbitda: "success"});
			return true;
		} else {
			this.setState({isValidMinEbitda: "error", isValidMaxEbitda: "error"});
			return false;
		}
	}

	render() {
		return (
			<div>
				<div className="row">
					<h1>Add/Edit Project</h1>
					<Link to="/" className="btn btn-default btn-lg pull-right">Back to Summary</Link>
				</div>
				<div className="row content">
					<Form className="col-md-12">
						<FormGroup className="col-md-12" validationState={this.state.isValidMeadline}>
							<ControlLabel>Headline</ControlLabel>
							<FormControl 
								type="text" 
								defaultValue="temp"
								inputRef={(input) => {this.headline = input;}}
								placeholder="Enter your project headline here.."
								/>
						</FormGroup>
						<FormGroup className="col-md-6" validationState={this.state.isValidMinCheckSize}>
							<ControlLabel>Target Check Size - Min</ControlLabel>
							<FormControl 
								type="text" 
								name="minCheckSize"
								defaultValue="4"
								onChange={event => this.numberWithCommas(event)}
								inputRef={(input) => {this.minCheckSize = input;}}
								placeholder="enter min check size.."
								/>
								<HelpBlock>Min. Check Size should be a number less than Max. Check Size.</HelpBlock>
						</FormGroup>
						<FormGroup className="col-md-6" validationState={this.state.isValidMaxCheckSize}>
							<ControlLabel>Target Check Size - Max</ControlLabel>
							<FormControl 
								type="text" 
								name="maxCheckSize"
								defaultValue="5"
								onChange={event => this.numberWithCommas(event)}
								inputRef={(input) => {this.maxCheckSize = input;}}
								placeholder="enter max check size.."
								/>
								<HelpBlock>Max. Check Size should be a number greater than Min. Check Size.</HelpBlock>
						</FormGroup>
						<FormGroup className="col-md-6" validationState={this.state.isValidMinRevenue}>
							<ControlLabel>Target Revenue - Min</ControlLabel>
							<FormControl 
								type="text" 
								name="minRevenue"
								defaultValue="4"
								onChange={event => this.numberWithCommas(event)}
								inputRef={(input) => {this.minRevenue = input;}}
								placeholder="enter min Revenue.."
								/>
								<HelpBlock>Min. Revenue should be a number less than Max. Revenue.</HelpBlock>
						</FormGroup>
						<FormGroup className="col-md-6" validationState={this.state.isValidMaxRevenue}>
							<ControlLabel>Target Revenue - Max</ControlLabel>
							<FormControl 
								type="text" 
								name="minRevenue"
								defaultValue="5"
								onChange={event => this.numberWithCommas(event)}
								inputRef={(input) => {this.maxRevenue = input;}}
								placeholder="enter max Revenue.."
								/>
								<HelpBlock>Max. Revenue should be a number greater than Min. Revenue.</HelpBlock>
						</FormGroup>
						<FormGroup className="col-md-6" validationState={this.state.isValidMinEbitda}>
							<ControlLabel>Target EBITDA - Min</ControlLabel>
							<FormControl 
								type="text" 
								name="minEbitda"
								defaultValue="4"
								onChange={event => this.numberWithCommas(event)}
								inputRef={(input) => {this.minEbitda = input;}}
								placeholder="enter min EBITDA.."
								/>
								<HelpBlock>Min. EBITDA should be a number less than Max. EBITDA.</HelpBlock>
						</FormGroup>
						<FormGroup className="col-md-6" validationState={this.state.isValidMaxEbitda}>
							<ControlLabel>Target EBITDA - Max</ControlLabel>
							<FormControl 
								type="text" 
								name="maxEbitda"
								defaultValue="5"
								onChange={event => this.numberWithCommas(event)}
								inputRef={(input) => {this.maxEbitda = input;}}
								placeholder="enter max EBITDA.."
								/>
								<HelpBlock>Max. EBDITA should be a number greater than Min. EBDITA.</HelpBlock>
						</FormGroup>
						<Button className="pull-right btn btn-primary" type="button" onClick={this.updateProject}>Submit</Button>
				</Form>
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

export default connect(mapStateToProps, { addProject, editProject })(AddEditProject);