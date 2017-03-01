import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NoteEditor from '../../components/NoteEditor/NoteEditor.js';
import RockofRianCollaboEidtor from '../../components/NoteEditor/RockofRianCollaboEidtor.js'
import * as actions from '../../actions/NoteEditorActions.js';

class NoteEditorContainer extends Component {
  
  render() {
    
    return (
     <div style={{height: "100%"}}>
        <RockofRianCollaboEidtor  />
     </div>
    );
  }
}

function mapState(state) {
  return { 
    data: state.NoteEditor.data 
  }
}

function mapDispatch(dispatch) {
  return {
    onChangeDispatch: (value) => dispatch(actions.onChangeDispatch(value)) 
  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);