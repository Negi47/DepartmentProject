import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/TeachingTiming.css"
import html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'

class TeachingTiming extends Component {


    state = {
        semester: '',
        section: '',
        fromterm: '',
        toterm: '',
        credits: '',
        facultyname: '',
        totalhours: '',
        date_and_timing: [],
        holidays: [
            'Wed May 01 2019'
        ]
    }


    componentDidMount() {
        //localhost:3000/teaching/Teachingdiary/negi
        axios.get('/teaching/getTeachingDetails/' + sessionStorage.getItem('username'))
            .then(data => {
                // console.log('teachin time all: ', data)
                // console.log('teacning timing: ', data.data)
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
        let fromterm = new Date(data[0].fromterm),
            toterm = new Date(data[0].toterm),
            daylist = [],
            store_date = [],
            date_and_timing = []

        for(var dt=fromterm; dt<=toterm; dt.setDate(dt.getDate()+1)){
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
                    date_and_timing = [...date_and_timing, {date: dt, time: data[0].days.mon}]
                    break;

                case "Tue":
                    date_and_timing = [...date_and_timing, {date: dt, time: data[0].days.tue}]
                    break;

                case "Wed":
                    date_and_timing = [...date_and_timing, {date: dt, time: data[0].days.wed}]
                    break;

                case "Thu":
                    date_and_timing = [...date_and_timing, {date: dt, time: data[0].days.thu}]
                    break;

                case "Fri":
                    date_and_timing = [...date_and_timing, {date: dt, time: data[0].days.fri}]
                    break;

                case "Sat":
                    date_and_timing = [...date_and_timing, {date: dt, time: data[0].days.sat}]
                    break;
            
                default:
                    break;
            }
        })

        this.setState({
            semester: data.semester,
            date_and_timing,
            credits: data.credits
        })


    }


    convertDomToPdf = () => {
        console.log("came inside button")
        const input = document.getElementById('div_to_print');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    }


    render() {

        if(!sessionStorage.getItem('username'))
            return <Redirect to="/"/>

        

        return(

            <Fragment>

                <div id="div_to_print" style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    width: '90%',
                    minHeight: '297mm',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                
                <div id="pdfdiv">
                    <div className="Main-head">
                        <div className="left-div">
                            <img src={process.env.PUBLIC_URL + "/images/logo.png"} className="responsive-img logo-img" ></img>
                        </div>
                        <div className="mid-div center">
                            Teaching Diary (Practical/Drawing)
                        </div>
                        <div className="right-div"></div>
                    </div>
                    <div className="bottom-div">
                        <p>Credits: {this.state.credits}</p>
                    </div>
                    <table className="timing-table">
                        <thead>
                            <tr>
                                <th>Sr. NO.</th>
                                <th style={{textAlign: 'center' ,border: '1px solid #00000030' }}>Date</th>
                                <th style={{textAlign: 'center'}}>Time</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.date_and_timing.map((store, index) => {
                                    return !this.state.holidays.includes(store.date) ?
                                    <tr key={index}>
                                        <td>
                                            {index+1}
                                        </td>
                                        <td className="timing-td-table">
                                            {store.date}
                                        </td>
                                        <td className="timing-td-table">
                                            {store.time.join(" | ")}
                                        </td>
                                        
                                    </tr> :
                                    null
                                })
                            }
                        </tbody>
                    </table>
                </div>

                </div>

                

                <button onClick={this.convertDomToPdf}>convert to pdf</button>

            </Fragment>

        )

    }
}

export default TeachingTiming