import React, {Component} from 'react'
import "../../styles/Header.css"
import axios from 'axios';

class Header extends Component {

    state = {
        isSession: sessionStorage.getItem('username') ? true : false
    }


    logout = () => {
        sessionStorage.removeItem('username')
        this.setState({isSession: false})
    }


    render() {
        return(
            <div>
                {
                    this.state.isSession ?
                        <ul id="logoutdropdown" className="dropdown-content">
                            <li><button onClick={this.logout}>Logout</button></li>
                        </ul> :
                         null
                }
                <nav>
                    <div className="nav-wrapper">
                        <div>
                            <img src={process.env.PUBLIC_URL + "/images/brand.png"}></img>
                            <span className="brand-logo center">RAMAIAH INSTITUTE OF TECHNOLOGY</span>
                            <ul className="right">
                                <li>
                                    <span className="dropdown-trigger" data-target="logoutdropdown"><i className="material-icons">account_circle</i></span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* <a href="#" class="brand-logo center">Logo</a> */}
                    </div>
                </nav>
            </div>
        )
    }


}

export default Header