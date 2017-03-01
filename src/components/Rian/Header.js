import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import moment from 'moment';
import '../../styles/Header.css';
import LogInModal from './LogInModal';
import SignUpModal from './SignUpModal';

export default class Header extends Component {
  constructor(props){
    super(props);
  }
  handleLogOut(e) {
    e.preventDefault();
    this.props.userLogOut()
  }
  render() {
  
    const today = moment().format('YYYY MMM Do');
  
    return (
      <div>
        <div className="backColor">
          <div className="col-xs-2 LogoFont">
            <span>Rian</span>
          </div>
          <div className="col-xs-5 alignRight">
            <svg width="20px" height="20px" viewBox="343 0 48 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <path d="M343,29.9097166 L343,2 C343,2 351.906567,-1.8260993 366.500574,2.8926758 C381.094582,7.6114497 391,0 391,0 L391,30.3730962 C391,30.3730962 384,37 366,33 C356.133596,30.8074659 348.139945,30.3757706 345,31.8060039 L345,60 L343,60 L343,29.9097166 L343,29.9097166 Z M366.5,5.2764401 C353.692714,1.2467703 345,3.7942699 345,3.7942699 L345,28.9911628 C345,28.9911628 347.106973,26.6490405 366.5,30.473333 C385.893027,34.2976257 389,28.9911633 389,28.9911633 L389,4 C389,4 379.307287,9.3061088 366.5,5.2764401 L366.5,5.2764401 Z" id="flag" stroke="none" fill="#929292 " fillRule="evenodd"></path>
            </svg>
          </div>
          {this.props.User.username === null ? 
            <div className="col-xs-5 alignRight">
              <LogInModal
                userLogIn={(form)=>this.props.userLogIn(form)}
              />
              <SignUpModal
                userSignUp={(form)=>this.props.userSignUp(form)}
              />
            </div>
            :
            <div className="col-xs-5 alignRight">
              <Button type="submit" bsStyle="danger" 
                onClick={(e)=>this.handleLogOut(e)}>
                로그아웃
              </Button>
            </div>}
        </div>
      </div>
    );
  }
}
