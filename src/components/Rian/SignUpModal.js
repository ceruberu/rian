import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, Button, Col, Modal, ControlLabel } from 'react-bootstrap';

export default class CalendarSignUpModal extends Component {
	constructor(props){
		super(props);
		this.state= { showModal: false }
	}

	close(){
	    this.setState({ showModal: false });
	}

	open(){
		this.setState({ showModal: true });
	}

	handleSubmit(e) {
      e.preventDefault();
      if(this.username.value.length === 0) { 
        alert("아이디를 입력하세요")
      } else {
        this.props.userSignUp({username:this.username.value})
        this.close();
      }
  	}

	render(){
		return (
			<div className="modalButtons">
        		<Button type="submit" bsStyle="danger" onClick={()=>this.open()}>
        			회원가입
				</Button>
				<Modal show={this.state.showModal} onHide={()=>this.close()}>
		          <Modal.Header closeButton>
		            <Modal.Title>Welcome to Rian</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <Form onSubmit={this.handleSubmit}>
		              <FormGroup controlId="formHorizontalAuthor">
		                <h5>아이디</h5>
		                <FormControl 
		                	autoFocus
		                    componentClass="input" 
		                    placeholder="사용하실 아이디를 입력하세요" 
		                    inputRef={ref => {this.username = ref}} />
		              </FormGroup>
		            </Form>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e)}>회원가입</Button>
		            <Button onClick={()=>this.close()}>닫기</Button>
		          </Modal.Footer>
		        </Modal>
			</div>
		)
	}
}