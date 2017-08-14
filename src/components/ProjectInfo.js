import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ProjectInfo extends Component {

  constructor(props) {
    super(props);
  
    this.state = { showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    return(
      <div>
        <Button
          bsStyle="default"
          bsSize="large"
          onClick={this.open}
          style={{marginLeft: 20}}
        >
          Project Info
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>List of Npm packages used</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li><a href="https://www.npmjs.com/package/react" target="_blank">react</a> - Of Course, It's a React.js project</li>
              <li><a href="https://www.npmjs.com/package/react-dom" target="_blank">react-dom</a> - A must have for React projects</li>
              <li><a href="https://www.npmjs.com/package/react-bootstrap" target="_blank">react-bootstrap</a> - How do you think this modal came up? It's Bootstrap!</li>
              <li><a href="https://www.npmjs.com/package/react-bootstrap-table" target="_blank">react-bootstrap-table</a> - All the credit for the fancy table goes to this package!</li>
              <li><a href="https://www.npmjs.com/package/redux" target="_blank">redux</a> - Data/State is better handled with Redux.js</li>
              <li><a href="https://www.npmjs.com/package/react-redux" target="_blank">react-redux</a> - Special package to use React with Redux</li>
              <li><a href="https://www.npmjs.com/package/react-router-dom" target="_blank">react-router-dom</a> - Routing is must for any SPA.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}