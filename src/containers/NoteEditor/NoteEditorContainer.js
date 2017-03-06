import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import QrofRian from '../../components/QRofRian/QrofRian.js'
import RockofRian from '../../components/NoteEditor/RockofRianCollaboEditor.js'
import * as actions from '../../actions/NoteEditorActions.js';

class NoteEditorContainer extends Component {
  
  render() {
    
    return (
      <div>
        <div style={{ margin: "0", height: "800px", position: "relative"}}>
          <RockofRian  user={this.props.username}/>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { 
    data: state.NoteEditor.data,
    user: state.User.username
  }
}

function mapDispatch(dispatch) {
  return {
    onChangeDispatch: (value) => dispatch(actions.onChangeDispatch(value)) 
  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);