import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import "../../styles/Header.css"
import axios from 'axios';
import $ from 'jquery'
import { AuthContext } from '../../Context/Context';

class Header extends Component {

    state = {
        // isSession: sessionStorage.getItem('username') ? true : false,
        isVisible: false
    }


    logout = () => {
        sessionStorage.removeItem('username')
        this.props.removeSession()
    }

    changeLogoutVisible = () => {
        if (!this.state.isVisible) {
            console.log('lohoud visible: ', this.state.isVisible)
            document.addEventListener('click', this.outsideMenuClick)
        }
            
        else {
            console.log('lohoud visible: ', this.state.isVisible)
            document.removeEventListener('click', this.outsideMenuClick)

        }

        this.setState({isVisible: !this.state.isVisible})
    }

    outsideMenuClick = () => this.changeLogoutVisible()


    static contextType = AuthContext

    render() {


        const {isSession} = this.context;

        return(
            <div>
                {
                    isSession ?
                        <ul className="logoutbtn" style={this.state.isVisible ? {display: "block"} : null}>
                            <li>{sessionStorage.getItem('username')}</li>
                            <li><button onClick={() => this.logout(isSession)}  >Logout</button></li>
                        </ul> :
                         null
                }
                <nav className="Heder">
                    <div className="nav-wrapper">
                        <div>
                            <img src={process.env.PUBLIC_URL + "/images/brand.png"} className="responsive-img"></img>
                            <span className="brand-logo center" id="tag">RAMAIAH INSTITUTE OF TECHNOLOGY</span>

                            {
                                isSession ? 

                                    <ul className="right">
                                        <li>
                                            <span className="valign-wrapper" onClick={() => this.changeLogoutVisible()} >
                                                <i className="material-icons" style={{fontSize: '45px'}}>account_circle</i>
                                            </span>
                                        </li>
                                    </ul> :

                                    <ul className="right">
                                        <li>
                                            <NavLink to="/login" style={{fontSize: 'x-large',fontFamily: 'serif'}}>Login</NavLink>
                                        </li> 
                                    </ul>
                            }
                        </div>
                        
                        {/* <a href="#" class="brand-logo center">Logo</a> */}
                    </div>
                </nav>
            </div>
        )
    }


}

export default Header