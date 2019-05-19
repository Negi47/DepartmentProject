import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/Signup.css"

class Signup extends Component {

    state = {
        facultyname: '',
        username: '',
        email: '',
        password: '',
        signupStatus: null,
        signupErr: ''
    }


    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitUser = (e) => {
        e.preventDefault()

        // axios.post('/user/searchuser', {
        //     email: this.state.email
        // })
        // .then(res => console.log(res))
        // .catch(err => console.log(err))

        axios.post('/user/adduser', {
            facultyname: this.state.facultyname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log('signup res: ', res)

            if (res.data)
                this.setState({signupStatus: res.data})
            else
                this.setState({signupStatus: res.data, signupErr: "err in signup"})
        })
        .catch(err => console.log(err))
      }

    render() {

        if (this.state.signupStatus == true)
            return <Redirect to="login" />

        return (

            <div>
                <div className ="signup_form center">
                    <center><h4 className="brand-logo center" id="signup_label">Signup</h4></center><br></br>
                    <form onSubmit={e => this.submitUser(e)}>
                        <div className="input-field col s6">
                            <i className="material-icons prefix" id="icon">person</i>
                            <input id="icon_prefix" type="text" className="validate" name="facultyname" onChange={this.handleFormChange} /><br/>
                            <label for="icon_prefix" id="signup_text">Faculty Name</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix" id="icon">person</i>
                            <input id="icon_prefix" type="text" className="validate" name="username" onChange={this.handleFormChange} /><br/>
                            <label for="icon_prefix" id="signup_text">Username</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix" id="icon">email</i>
                            <input id="icon_prefix" type="text" className="validate" name="email" onChange={this.handleFormChange} /><br/>
                            <label for="icon_prefix" id="signup_text">Email Id</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix" id="icon">remove_red_eye</i>
                            <input id="icon_prefix" type="text" className="validate" name="password" onChange={this.handleFormChange} /><br/>
                            <label for="icon_prefix" id="signup_text">Password</label>
                        </div>
                    <button type="submit" className="waves-effect waves-light btn" id="lgn_button">Register</button>
                    </form>
                </div>

                {
                    this.state.signupErr !== '' ? this.state.signupErr : null
                }
            </div>

        )
    }
}

export default Signup