import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/TeachingDiary.css"
import { AuthContext } from '../../Context/Context';
import TeachingDiaryCheckbox from './TeachingDiaryCheckbox';


class TeachingDiary extends Component{

    state = {
        department: '',
        semester: '',
        section: '',
        fromterm: '',
        toterm: '',
        batch: '',
        subject: '',
        credits: 0,
        facultyname: '',
        totalhours: 0,
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        isSubmitted: null,
        creditType: null,
        timings: ['9:00-9:55', '9:55:10:50', '11:05-12:00', '12:00-12:55', '1:45-2:40', '2:40-3:35', '3:55-4:30'],
        practtimings : ['9:00-10:50', '11:05-12:55', '1:45-3:35', '2:40-4:30'],
        isDisabled: null
    }


    countTotalHours = e => {
        let val = Number(e.target.value);
        if (this.state.creditType === 'theory')
            this.setState({
                credits: val,
                totalhours: val * 14
            });
        else 
            this.setState({
                credits: val,
                totalhours: (val + val) * 14
            });

    }

    
    handleChangeCreditType = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
            credits: 0,
            totalhours: 0,
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: []
        })
        
    }


    handleCheckboxIsDisabled = (value, state_day, name) => {
        let time_selected = this.state.mon.length + this.state.tue.length + this.state.wed.length + this.state.thu.length + this.state.fri.length + this.state.sat.length;

        if (time_selected == this.state.credits) {
            return (
                <TeachingDiaryCheckbox
                    key={value}
                    name={name}
                    value={value}
                    state_day={state_day}
                    handleFormChange={this.handleFormChange}
                    isDisabled={true} />
            )
        }

        if (state_day.length) {
            if (state_day.includes(value)) {
                return (
                    <TeachingDiaryCheckbox
                        key={value}
                        name={name}
                        value={value}
                        state_day={state_day}
                        handleFormChange={this.handleFormChange}
                        isDisabled={false} />                    
                )
            }
            else {
                return (
                    <TeachingDiaryCheckbox
                        key={value}
                        name={name}
                        value={value}
                        state_day={state_day}
                        handleFormChange={this.handleFormChange}
                        isDisabled={true} />                    
                )
            }
        }
        else {
            return (
                <TeachingDiaryCheckbox
                    key={value}
                    name={name}
                    value={value}
                    state_day={state_day}
                    handleFormChange={this.handleFormChange}
                    isDisabled={false} />
            )
        }
    }


    handleFormChange = (e) => {

        console.log('handleFormChange', e.target.type);

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
                            fri: friupdate
                        })
                        break;
                
                    case "sat":
                        let satupdate = this.state.sat.filter(val => val != e.target.value)
                        this.setState({
                            sat: satupdate
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
            fromterm: this.state.fromterm,
            department: this.state.department,
            batch: this.state.batch,
            toterm: this.state.toterm,
            subject: this.state.subject,
            credits: this.state.credits,
            creditType : this.state.creditType,
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

      static contextType = AuthContext
    render() {

        if(!sessionStorage.getItem('username'))
            return <Redirect to= "/"/>

        if(this.state.isSubmitted)
            return <Redirect to="teachingtiming" />


        const {selected_dept} = this.context

        return(
            <div>
                <center>
                    <h5 className="teaching">Department of Computer Application</h5>
                    <h5 className="teaching">Generate Teaching Report</h5>

                    <h5 className="teaching">{selected_dept}</h5>
                </center>
                <div className="first_div row">
                    <form onSubmit={e => this.submitUser(e)}>
                    <div className="row">
                        <div className="input-field col s4 ">
                            <label className="diary_text">Name of the faculty </label>
                            <input type="text" name="facultyname" onChange={this.handleFormChange} />
                        </div>
                        <div className="input-field col s4">
                            <label className="diary_text">Semester </label>
                            <input type="text" name="semester" onChange={this.handleFormChange} />
                        </div>
                        <div className="input-field col s4">
                            <label className="diary_text">Department </label>
                            <input type="text" name="department" onChange={this.handleFormChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <label className="diary_text">Section </label>
                            <input type="text" name="section" onChange={this.handleFormChange} />
                        </div>
                        <div className="input-field col s4">   
                            <label className="diary_text">Course Code and Name </label>
                            <input type="text" name="subject" onChange={this.handleFormChange} />
                        </div>
                        <div className="input-field col s4">
                            <label className="diary_text">Batch </label>
                            <input type="text" name="batch" onChange={this.handleFormChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            {/* <label className="diary_text">FromTerm: </label> */}
                            <input type="date" name="fromterm" onChange={this.handleFormChange} />
                        </div>
                        <div className="input-field col s4">
                            {/* <label className="diary_text">To Term: </label> */}
                            <input type="date" name="toterm" onChange={this.handleFormChange} />
                        </div>
                        <div className="input-field col s5">   
                            {/* <label className="diary_text">Credits: </label> */}
                            <select style={{display: 'block'}} onChange={this.handleChangeCreditType} name="creditType">
                                <option disabled selected>Credits</option>
                                <option value="theory">Theory</option>
                                <option value="practical">Practical</option>
                            </select>
                            {/* <input type="text" name="credits" onChange={this.handleFormChange} /> */}
                        </div>   
                        <div className="input-field col s5">   
                            {/* <label className="diary_text">Credits: </label> */}
                            <select style={{display: 'block'}} onChange={this.countTotalHours}>
                                <option disabled selected>Select Credits</option>
                                {
                                    this.state.creditType !== null ?

                                        this.state.creditType === 'theory' ?

                                            <Fragment>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Fragment> :

                                            <Fragment>
                                                <option value="1">2</option>
                                                <option value="2">4</option>
                                            </Fragment> :

                                        null
                                }
                            </select>
                            {/* <input type="text" name="credits" onChange={this.handleFormChange} /> */}
                        </div>   
                        <div className="col s5">
                            {/* <label className="diary_text">Total no. of hours: </label>
                            <input type="text" name="totalhours" onChange={this.handleFormChange} /> */}
                            <p style={{color: 'black'}}>Total no. of Hours: {this.state.totalhours}</p>
                        </div>     
                        
                    </div>
                            
                            {/* Time Table */}
                            <br/>
                            {
                                this.state.creditType === 'theory' ?

                                <Fragment>
                                    <div>
                                        <table>
                                        <tbody>
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

                                                {
                                                    this.state.timings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.mon,
                                                        "mon"
                                                    ))
                                                }

                                            </tr>
                                            <tr>
                                                <td>Tuesday</td>

                                                {
                                                    this.state.timings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.tue,
                                                        "tue"
                                                    ))
                                                }
                                                
                                            </tr>
                                            <tr>
                                                <td>Wensday</td>

                                                {
                                                    this.state.timings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.wed,
                                                        "wed"
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td>Thursday</td>

                                                {
                                                    this.state.timings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.thu,
                                                        "thu"
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td>Friday</td>

                                                {
                                                    this.state.timings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.fri,
                                                        "fri"
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td>Saturday</td>

                                                {
                                                    this.state.timings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.sat,
                                                        "sat"
                                                    ))
                                                }
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Fragment> :

                                <Fragment>
                                    <div>
                                        <table>
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th className="center">9:00-10:50</th>
                                                <th className="center">11:05-12:55</th>
                                                <th className="center">1:45-3:35</th>
                                                <th className="center">2:40-4:30</th>
                                            </tr>    
                                            <tr>
                                                <td>Monday</td>

                                                {
                                                    this.state.practtimings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.mon,
                                                        "mon"
                                                    ))
                                                }

                                            </tr>
                                            <tr>
                                                <td>Tuesday</td>

                                                {
                                                    this.state.practtimings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.tue,
                                                        "tue"
                                                    ))
                                                }
                                                
                                            </tr>
                                            <tr>
                                                <td>Wensday</td>

                                                {
                                                    this.state.practtimings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.wed,
                                                        "wed"
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td>Thursday</td>

                                                {
                                                    this.state.practtimings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.thu,
                                                        "thu"
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td>Friday</td>

                                                {
                                                    this.state.practtimings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.fri,
                                                        "fri"
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td>Saturday</td>

                                                {
                                                    this.state.practtimings.map(t => this.handleCheckboxIsDisabled(
                                                        t,
                                                        this.state.sat,
                                                        "sat"
                                                    ))
                                                }
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Fragment>
                            }
                            <br/>
                        <button type="submit" className="sub_btn waves-effect waves-light btn">Submit</button>
                    </form>
                </div>
                


            </div>
        )
    }
}

export default TeachingDiary