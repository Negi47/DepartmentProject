    
import React, {Component,Fragment} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/Login.css"
import { AuthContext } from '../../Context/Context';
import {NavLink} from 'react-router-dom'


class Login extends Component {

    state = {
        email: '',
        password: '',
        popupmsg: null,
        isLoggedIn: null
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitUser = (e, handleSessionUpdate) => {
        e.preventDefault()

        axios.post('/user/searchuser', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            if (!res.data)
                this.setState({popupmsg: "err in login", isLoggedIn: false})
            else {
                sessionStorage.setItem('username', res.data.username)
                handleSessionUpdate()
                this.setState({isLoggedIn: true})
            } 
                
        })
        .catch(err => console.log(err))

      }


      static contextType = AuthContext

    render() {


        const {handleSessionUpdate} = this.context


        if (this.state.isLoggedIn || sessionStorage.getItem('username'))
            return <Redirect to="selectdepartment"/>

        return(
            <Fragment>
                <div className="login">
                    
                    <div className="login_form center">
                        <h3 className="brand-logo center" id="label_lgn" >Login</h3>
                        <form onSubmit={e => this.submitUser(e, handleSessionUpdate)}>
                            {/* <input type="text" name="email" className="login_txt" placeholder="email" onChange={this.handleFormChange}/><br/>
                            <input type="text" name="password" className="login_txt" placeholder="password" onChange={this.handleFormChange}/><br/>
                            <button type="submit" className="login_btn">Login</button> */}

                        <div className="input-field col s6">
                            <i className="material-icons prefix" id="icon">person</i>
                            <input id="icon_prefix" type="text" name="email" className="validate" onChange={this.handleFormChange}/><br/>
                            <label htmlFor="icon_prefix">email/username</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix" id="icon">remove_red_eye</i>
                            <input id="icon_password" type="password" name="password" className="validate" onChange={this.handleFormChange}/><br/>
                            <label htmlFor="icon_password">password</label>
                        </div>

                        <button type="submit" className="waves-effect waves-light btn" id="lgn_button">Login</button>
                        
                        {/* <a href=""></a> */}

                        </form>
                    </div>

                    <div className="divloginright">
                        <p style={{fontsize:'20px', margin: 'auto', color: 'grey'}} >New to TeachingDiary</p>
                        <NavLink to="/signup">
                            <button type="submit" class="btn register_btn"><i class="material-icons left">input</i> Register </button>
                        </NavLink>
                    </div>
                </div>

                {
                    this.state.popupmsg ?
                    <div> {this.state.popupmsg} </div> :
                    null

                }
            </Fragment>
        )
    }

}

export default Login