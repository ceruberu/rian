import React from 'react';

//Libaries
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

//Components
//import WhiteBoardTitle from './WhiteBoardTitle';
//import WhiteBoardPanel from './WhiteBoardPanel';
import WhiteBoardPanels from './WhiteBoardPanels';
//import WhiteBoardState from './WhiteBoardState';
import WhiteBoardFirePad from './WhiteBoardFirePad';

//const socket = io.connect(process.env.SOCKET_URL || 'localhost:8000');
const socket = io('/whiteboard');
			socket.on('connectMsg', (data) => { console.log('connected data : ', data) } );		

class WhiteBoard extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			editorCnt : 1
		}
		socket.emit('hi','hi');
		socket.on('ioMsg', function(msg){
			console.log('IOMSG!!!!!!!!!!!!!!!!!!!')
		})
		
	}

	addEditor(){
		console.log("clicked");
		this.props.addEditorState({ key : 'value' });
	}

	render(){
		//onClick={this.addEditor.bind(this)}
		return (
			<div className="white-board-box">
				<p>Im WhiteBoard</p>
				<div  className="white-board-wrapper">
					<SocketProvider socket={socket}>
							<WhiteBoardPanels
								contentCurrentStateRaw={this.props.contentCurrentStateRaw}
								changeContentState={this.props.changeContentState}
								editors={this.props.editors}
								changeEditorState={this.props.changeEditorState}
								addEditorState={this.props.addEditorState}
							/>
					</SocketProvider>					
				</div>
				<p>Im Firepad</p>
				<WhiteBoardFirePad />
			</div>
		)

	} // render function end

}


export default WhiteBoard;