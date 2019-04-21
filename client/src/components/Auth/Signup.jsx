import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/Signup.css"

class Signup extends Component {

    state = {
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
                <div class ="signup_form">
                    <h3>Signup</h3>
                    <form onSubmit={e => this.submitUser(e)}>
                    <input type="text" class="signup_label" placeholder="username" name="username" onChange={this.handleFormChange} /><br/>
                    <input type="text" class="signup_label" placeholder="email" name="email" onChange={this.handleFormChange} /><br/>
                    <input type="text" class="signup_label" placeholder="password" name="password" onChange={this.handleFormChange} /><br/>
                    <button type="submit" class="sub_btn">Register</button>
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