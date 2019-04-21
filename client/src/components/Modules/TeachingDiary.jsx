import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/TeachingDiary.css"


class TeachingDiary extends Component{

    state = {
        semester: '',
        section: '',
        term: '',
        credits: '',
        facultyname: '',
        totalhours: '',
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        isSubmitted: null
    }

    handleFormChange = (e) => {

        console.log(e.target.type);

        if (e.target.type == "checkbox") {
            if (e.target.checked) {
                switch (e.target.name) {
                    case "mon":
                        this.setState({
                            mon: [...this.state.mon, e.target.value]
                        })
                        break;

                    case "tue":
                        this.setState({
                            tue: [...this.state.tue, e.target.value]
                        })
                        break;

                    case "wed":
                        this.setState({
                            wed: [...this.state.wed, e.target.value]
                        })
                        break;

                    case "thu":
                        this.setState({
                            thu: [...this.state.thu, e.target.value]
                        })
                        break;
                    
                    case "fri":
                    this.setState({
                        fri: [...this.state.fri, e.target.value]
                        })
                        break;

                    case "sat":
                        this.setState({
                            sat: [...this.state.sat, e.target.value]
                        })
                        break;

                    default:
                        break;
                }
            }
            else {
                switch (e.target.name) {
                    case "mon":
                        let monupdate = this.state.mon.filter(val => val != e.target.value)
                        this.setState({
                            mon: monupdate
                        })
                        break;

                    case "tue":
                        let tueupdate = this.state.tue.filter(val => val != e.target.value)
                        this.setState({
                            tue: tueupdate
                        })
                        break;

                    case "wed":
                        let wedupdate = this.state.wed.filter(val => val != e.target.value)
                        this.setState({
                            wed: wedupdate
                        })
                        break;

                    case "thu":
                        let thuupdate = this.state.thu.filter(val => val != e.target.value)
                        this.setState({
                            thu: thuupdate
                        })
                        break;
                    
                    case "fri":
                        let friupdate = this.state.fri.filter(val => val != e.target.value)
                        this.setState({
                            thu: friupdate
                        })
                        break;
                
                    case "sat":
                        let satupdate = this.state.sat.filter(val => val != e.target.value)
                        this.setState({
                            thu: satupdate
                        })
                        break;    
                    
                    default:
                        break;
                }
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }


    submitUser = (e) => {
        e.preventDefault()

        axios.post('/teaching/addteachingdiary', {
            
            semester: this.state.semester,
            section: this.state.section,
            term: this.state.term,
            credits: this.state.credits,
            facultyname: this.state.facultyname,
            totalhours: this.state.totalhours,
            days: {
                mon: this.state.mon,
                tue: this.state.tue,
                wed: this.state.wed,
                thu: this.state.thu,
                fri: this.state.fri,
                sat: this.state.sat
            },
            username: sessionStorage.getItem('username')
        })

        .then(res => {
            if(res.data)
                this.setState({isSubmitted: true})
            else
                this.setState({isSubmitted: false})
        })
        .catch(err => console.log(err))

      }


    render() {

        if(!sessionStorage.getItem('username'))
            return <Redirect to= "/"/>

        if(this.state.isSubmitted)
            return <Redirect to="teachingtiming" />

        return(
            <div>
                <center>
                    <label>Department of Computer pplication</label><br/>
                    <label class="teaching">GENERATE TEACHING DIARY</label>
                </center>
                <div class="first_div">
                    <form onSubmit={e => this.submitUser(e)}>
                        <label class="diary_text">Semester: </label>
                            <input type="text" name="semester" onChange={this.handleFormChange} />
                        <label class="diary_text">Section: </label>
                            <input type="text" name="section" onChange={this.handleFormChange} />
                        <label class="diary_text">Term: </label>
                            <input type="text" name="term" onChange={this.handleFormChange} />
                        <label class="diary_text">Credits: </label>
                            <input type="text" name="credits" onChange={this.handleFormChange} />
                        <label class="diary_text">Name of the faculty: </label>
                            <input type="text" name="facultyname" onChange={this.handleFormChange} />
                        <label class="diary_text">Total no. of hours: </label>
                            <input type="text" name="totalhours" onChange={this.handleFormChange} />
                            
                            {/* Time Table */}
                            <br></br>
                            <div class ="second_div">
                                <table>
                                    <tr>
                                        <th></th>
                                        <th>9:00-9:55</th>
                                        <th>9:55-10:50</th>
                                        <th>11:05-12:00</th>
                                        <th>12:00-12:55</th>
                                        <th>1:45-2:40</th>
                                        <th>2:40-3:35</th>
                                        <th>3:55-4:30</th>
                                    </tr>    
                                    <tr>
                                        <td>Monday</td>
                                        <td><input type="checkbox" name="mon" value="9:00 - 9:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="mon" value="9:55-10:50" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="mon" value="11:05-12:00" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="mon" value="12:00-12:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="mon" value="1:45-2:40" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="mon" value="2:40-3:35" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="mon" value="3:55-4:30" onChange={this.handleFormChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>Tuesday</td>
                                        <td><input type="checkbox" name="tue" value="9:00 - 9:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="tue" value="9:55-10:50" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="tue" value="11:05-12:00" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="tue" value="12:00-12:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="tue" value="1:45-2:40" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="tue" value="2:40-3:35" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="tue" value="3:55-4:30" onChange={this.handleFormChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>Wensday</td>
                                        <td><input type="checkbox" name="wed" value="9:00-9:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="wed" value="9:55-10:50" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="wed" value="11:05-12:00" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="wed" value="12:00-12:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="wed" value="1:45-2:40" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="wed" value="2:40-3:35" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="wed" value="3:55-4:30" onChange={this.handleFormChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>Thursday</td>
                                        <td><input type="checkbox" name="thu" value="9:00 - 9:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="thu" value="9:55-10:50" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="thu" value="11:05-12:00" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="thu" value="12:00-12:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="thu" value="1:45-2:40" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="thu" value="2:40-3:35" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="thu" value="3:55-4:30" onChange={this.handleFormChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>Friday</td>
                                        <td><input type="checkbox" name="fri" value="9:00 - 9:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="fri" value="9:55-10:50" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="fri" value="11:05-12:00" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="fri" value="12:00-12:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="fri" value="1:45-2:40" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="fri" value="2:40-3:35" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="fri" value="3:55-4:30" onChange={this.handleFormChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>Saturday</td>
                                        <td><input type="checkbox" name="sat" value="9:00 - 9:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="sat" value="9:55-10:50" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="sat" value="11:05-12:00" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="sat" value="12:00-12:55" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="sat" value="1:45-2:40" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="sat" value="2:40-3:35" onChange={this.handleFormChange}/></td>
                                        <td><input type="checkbox" name="sat" value="3:55-4:30" onChange={this.handleFormChange}/></td>
                                    </tr>
                                </table>
                            </div>
                        <button type="submit" class="sub_btn">Submit</button>
                    </form>
                </div>
                


            </div>
        )
    }
}

export default TeachingDiary