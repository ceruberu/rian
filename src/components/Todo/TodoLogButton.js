import React from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';

import TodoLog from './TodoLog'

class TodoLogButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({
      showModal: true
    })
  }

  close() {
    this.setState({
      showModal: false
    })
  }

  render() {

    const wrap = {
      display: "flex",
      flexWrap: "wrap",
      padding: "5px 5px"
    }

    const tableWidth = {
      width: "100%",
      textAlign: "center"
    }

    const logHeaderBox = {
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
      backgroundColor: "#448aff",
      color: "white"
    }

    return (
      <div style={wrap}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          {logButton(this.open)}
        </OverlayTrigger>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header style={logHeaderBox} closeButton>
            LOG
          </Modal.Header>
          <Modal.Body>
            <table style={tableWidth}>
              <tbody>
              {this.props.logs.map((log,i) => (
                <TodoLog log={log} index={i} key={i} />
              ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const logButton = (openButton) => (
  <svg onClick={openButton} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="40px" height="40px">
    <circle style={{fill:"#FFC61B"}} cx="256" cy="256" r="256"/>
    <path style={{fill:"#EAA22F"}} d="M512,256c0-0.91-0.026-1.814-0.034-2.722L392.516,133.829L256.488,282.345l-137.35,95.444
        l134.177,134.177c0.896,0.009,1.788,0.034,2.688,0.034C397.384,512,512,397.384,512,256z"/>
    <path style={{fill:"#FFFFFF"}} d="M378.54,384H133.458c-10.869,0-19.682-8.811-19.682-19.682V147.68c0-10.869,8.811-19.68,19.682-19.68
        H378.54c10.869,0,19.682,8.811,19.682,19.68v216.638C398.222,375.189,389.411,384,378.54,384z"/>
    <path style={{fill:"#D0D1D3"}} d="M378.54,128H256v256h122.54c10.869,0,19.682-8.811,19.682-19.682V147.682
        C398.222,136.811,389.411,128,378.54,128z"/>
    <path style={{fill:"#386895"}} d="M398.222,147.682c0-10.869-8.811-19.682-19.682-19.682H133.458c-10.869,0-19.68,8.811-19.68,19.682
        v20.744h284.444V147.682z"/>
    <path style={{fill:"#273B7A"}} d="M398.222,147.682c0-10.869-8.811-19.682-19.682-19.682H256v40.426h142.222V147.682z"/>
    <path style={{fill:"#808183"}} d="M113.988,367.049c1.333,9.575,9.528,16.951,19.47,16.951H378.54c9.942,0,18.137-7.378,19.47-16.951
        L113.988,367.049L113.988,367.049z"/>
    <path style={{fill:"#59595B"}} d="M256,367.049V384h122.54c9.942,0,18.137-7.378,19.47-16.951L256,367.049L256,367.049z"/>
    <path style={{fill:"#D0D1D3"}} d="M373.226,158.599H138.774c-4.046,0-7.327-3.281-7.327-7.327l0,0c0-4.046,3.281-7.327,7.327-7.327
        h234.451c4.046,0,7.327,3.281,7.327,7.327l0,0C380.552,155.319,377.272,158.599,373.226,158.599z"/>
    <path style={{fill:"#A6A8AA"}} d="M373.226,143.946H256v14.653h117.226c4.046,0,7.327-3.281,7.327-7.327
        S377.272,143.946,373.226,143.946z"/>
    <path style={{fill:"#FEE187"}} d="M148.256,222.546c-2.381,0-4.31,1.929-4.31,4.31s1.929,4.31,4.31,4.31H256v-8.62H148.256z"/>
    <path style={{fill:"#EAA22F"}} d="M363.744,222.546H256v8.62h107.744c2.381,0,4.31-1.929,4.31-4.31S366.125,222.546,363.744,222.546z"
        />
    <path style={{fill:"#FEE187"}} d="M148.256,258.46c-2.381,0-4.31,1.929-4.31,4.31s1.929,4.31,4.31,4.31H256v-8.62H148.256z"/>
    <path style={{fill:"#EAA22F"}} d="M363.744,258.46H256v8.62h107.744c2.381,0,4.31-1.929,4.31-4.31S366.125,258.46,363.744,258.46z"/>
    <path style={{fill:"#FEE187"}} d="M148.256,294.376c-2.381,0-4.31,1.929-4.31,4.31s1.929,4.31,4.31,4.31H256v-8.62H148.256z"/>
    <path style={{fill:"#EAA22F"}} d="M363.744,294.376H256v8.62h107.744c2.381,0,4.31-1.929,4.31-4.31S366.125,294.376,363.744,294.376z"
        />
    <path style={{fill:"#FEE187"}} d="M363.744,338.91H148.256c-2.381,0-4.31-1.929-4.31-4.31s1.929-4.31,4.31-4.31h215.488
        c2.381,0,4.31,1.929,4.31,4.31S366.125,338.91,363.744,338.91z"/>
    <path style={{fill:"#EAA22F"}} d="M363.744,330.29H256v8.62h107.744c2.381,0,4.31-1.929,4.31-4.31S366.125,330.29,363.744,330.29z"/>
    <rect x="238.037" y="218.419" style={{fill:"#E09112"}} width="89.781" height="17.958"/>
    <rect x="256" y="218.419" style={{fill:"#FF5419"}} width="71.828" height="17.958"/>
    <rect x="166.219" y="254.328" style={{fill:"#E09112"}} width="89.781" height="17.958"/>
    <rect x="238.037" y="254.328" style={{fill:"#D35933"}} width="89.781" height="17.958"/>
    <rect x="256" y="254.328" style={{fill:"#B54324"}} width="71.828" height="17.958"/>
    <g>
        <rect x="202.128" y="218.419" style={{fill:"#FFC61B"}} width="17.958" height="17.958"/>
        <rect x="166.219" y="326.163" style={{fill:"#FFC61B"}} width="71.83" height="17.958"/>
    </g>
    <rect x="166.219" y="218.419" style={{fill:"#FF5419"}} width="35.914" height="17.958"/>
    <rect x="306.7" y="289.168" style={{fill:"#FFC61B"}} width="11.609" height="17.958"/>
    <rect x="166.219" y="289.168" style={{fill:"#FF5419"}} width="140.481" height="17.958"/>
    <rect x="256" y="289.168" style={{fill:"#C92F00"}} width="50.697" height="17.958"/>
    <path style={{fill:"#38C6D9"}} d="M282.936,354.856c-2.381,0-4.31-1.929-4.31-4.31V210.91c0-2.381,1.929-4.31,4.31-4.31
        c2.381,0,4.31,1.929,4.31,4.31v139.636C287.246,352.927,285.317,354.856,282.936,354.856z"/>
    <path style={{fill:"#71E2EF"}} d="M297.348,204.602l-11.966,7.977c-1.483,0.988-3.412,0.988-4.894,0l-11.966-7.977
        c-1.227-0.819-1.964-2.196-1.964-3.67v-15.063c0-2.436,1.976-4.411,4.411-4.411h23.931c2.436,0,4.411,1.976,4.411,4.411v15.063
        C299.313,202.406,298.575,203.783,297.348,204.602z"/>
  </svg>
);

const tooltip = (
  <Tooltip id="showLog">
    Log 보기
  </Tooltip>
);

export default TodoLogButton;

