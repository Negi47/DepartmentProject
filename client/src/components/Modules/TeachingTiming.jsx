import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class TeachingTiming extends Component {


    state = {
        semester: '',
        section: '',
        term: '',
        credits: '',
        facultyname: '',
        totalhours: '',
        date_and_timing: []
    }


    componentDidMount() {
        //localhost:3000/teaching/Teachingdiary/negi
        axios.get('/teaching/getTeachingDetails/' + sessionStorage.getItem('username'))
            .then(data => {
                console.log('teachin time all: ', data)
                console.log('teacning timing: ', data.data)
                // this.setState({
                //     term: data.data.term,
                //     section: data.data.section,
                //     credits: data.data.credits,
                //     facultyname: data.data.facultyname,
                //     semester: data.data.semester,
                //     totalhours: data.data.totalhours,
                //     mon: data.data.days.mon,
                //     tue: data.data.days.tue,
                //     wed: data.data.days.wed,
                //     thu: data.data.days.thu,
                //     fri: data.data.days.fri,
                //     sat: data.data.days.sat
                // })

                this.handleSetState(data.data)

            })
            .catch(err => console.log(err))
    }


    handleSetState = (data) => {
        let term = data.term.split(' - '),
            start = new Date(term[0]),
            end = new Date(term[1]),
            daylist = [],
            store_date = [],
            date_and_timing = []

        for(var dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
            daylist.push(new Date(dt));
        }

        daylist.forEach(v => {
            if(v.getDay() !== 0)
            {
                store_date = [...store_date, v.toDateString()]   
            }
                // store_date = [...store_date, v.toISOString().slice(0,10)]
                
        })

        store_date.forEach(dt => {

            switch (dt.slice(0,3)) {
                case "Mon":
                    date_and_timing = [...date_and_timing, {date: dt, time: data.days.mon}]
                    break;

                case "Tue":
                    date_and_timing = [...date_and_timing, {date: dt, time: data.days.tue}]
                    break;

                case "Wed":
                    date_and_timing = [...date_and_timing, {date: dt, time: data.days.wed}]
                    break;

                case "Thu":
                    date_and_timing = [...date_and_timing, {date: dt, time: data.days.thu}]
                    break;

                case "Fri":
                    date_and_timing = [...date_and_timing, {date: dt, time: data.days.fri}]
                    break;

                case "Sat":
                    date_and_timing = [...date_and_timing, {date: dt, time: data.days.sat}]
                    break;
            
                default:
                    break;
            }
        })

        this.setState({date_and_timing})


    }


    render() {

        if(!sessionStorage.getItem('username'))
            return <Redirect to="/"/>



        return(

            <Fragment>

                <table>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    {
                        this.state.date_and_timing.map(store => (
                            <tr>
                                <td>
                                    {store.date}
                                </td>
                                <td>
                                    {store.time.join(" | ")}
                                </td>
                            </tr>
                        ))
                    }
                </table>

            </Fragment>

        )

    }
}

export default TeachingTiming