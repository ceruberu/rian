import React, { Component } from 'react';
import SignUpModal from './SignUpModal';
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';


export default class LogIn extends Component {
  constructor(props){
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.username.value.length === 0) {
      alert("아이디를 입력하세요")
    } else {
      this.props.userLogIn({username:this.username.value})
    }
  }

  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleSubmit(e)
    }
  }

  render() {
    return (
      <div id="logIn">
        <div>
            <FormControl 
              autoFocus
              componentClass="input" 
              placeholder="아이디" 
              onKeyPress={(e)=>this.handleKeyPress(e)}
              inputRef={ref => {this.username = ref}} />
        </div>
            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e)}>로그인</Button>
            <SignUpModal
              userSignUp={(form)=>this.props.userSignUp(form)}
              userLogIn={(form)=>this.props.userLogIn(form)}
            />
      </div>
    );
  }
}
