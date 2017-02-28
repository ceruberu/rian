import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { socketConnect } from 'socket.io-react';
const io = require('socket.io-client');

class MessageForm extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.findUser = this.findUser.bind(this);
  }
  
  findUser(){
      for (var i = 0; i <= this.props.users.length; i++) {
        if(this.props.users[i].includes(this.props.socket.id.slice(18))){
            return this.props.users[i]
        }
      }
  }


  handleSubmit(e){
      e.preventDefault();
      let message = {
          user: this.findUser(),
          text: this.memo.value
      }
      this.props.onMessageSubmit(message);
      this.memo.value = '';
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROPS::", nextProps)
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>  
              {/*<ControlLabel>Enter Message</ControlLabel>*/}
              <FormControl
                type='text'
                placeholder='Enter text'
                inputRef={ref => {this.memo = ref;}}
              />
            </FormGroup>  
            <Button type='submit'bsStyle="primary" bsSize='small'>Send Message</Button>
           </form>       
      </div>
    );
  }
}

export default socketConnect(MessageForm);