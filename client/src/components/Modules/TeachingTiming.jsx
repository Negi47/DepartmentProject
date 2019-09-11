import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "../../styles/TeachingTiming.css"
import html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'

class TeachingTiming extends Component {


    state = {
        department: '',
        semester: '',
        section: '',
        batch: '',
        fromterm: '',
        toterm: '',
        credits: '',
        creditType: '',
        subject: '',
        facultyname: '',
        totalhours: '',
        date_and_timing: [],
        holidays: [
            'Wed May 01 2019',
            'Tue Jan 01 2019',
            'Sat Jan 26 2019',
            'Mon Mar 04 2019',
            'Wed Mar 20 2019'
        ]
    }


    componentDidMount() {
        
        axios.get('/teaching/getTeachingDetails/' + sessionStorage.getItem('username'))
            .then(data => {
                
                console.log('data: teaching timing: ', data.data)
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

        date_and_timing = date_and_timing.filter(e => e.time.length && !this.state.holidays.includes(e.date));

        this.setState({
            semester: data[0].semester,
            date_and_timing,
            fromterm: data[0].fromterm,
            toterm: data[0].toterm,
            credits: data[0].credits,
            creditType: data[0].creditType,
            department: data[0].department,
            section: data[0].section,
            batch: data[0].batch,
            term: data[0].term,
            subject: data[0].subject,
            facultyname: data[0].facultyname,
            totalhours: data[0].totalhours,
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
                    width: '58%',
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
                            Teaching Diary ({this.state.creditType})
                        </div>
                        <div className="right-div"></div>
                    </div>
                    <div className="bottom-div">
                        <p>Department: {this.state.department}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Semester: {this.state.semester}  
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Section: {this.state.section}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Term: {this.state.fromterm} to {this.state.toterm}</p>
                        <p>Batch: {this.state.batch} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Course code and Name: {this.state.subject} </p><p>Credits: {this.state.credits}</p>
                        <p>Name(s) of the faculty: {this.state.facultyname} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total No. of Session required: {this.state.date_and_timing.length}</p> 

                    </div>
                    

                    <div style={{padding: '0 1em'}}>

                        <table className="timing-table" border='1'>
                            <thead>
                                <tr>
                                    <th className="thtag" colSpan="3">Proposed plan of coverage of Syllabus</th>
                                    <th className="thtag" rowSpan="2">If not taken, Reasons</th>
                                    <th className="thtag" colSpan="2">Actual Coverage of Syllabus</th>
                                    <th className="thtag">Remarks</th>
                                    <th className="thtag">Initials of Faculty</th>
                                </tr>
                                <tr>
                                    <th className="thtag">Lesson No.</th>
                                    <th className="thtag" style={{textAlign: 'center' ,border: '1px solid #00000030' }}>Date</th>
                                    <th className="thtag" style={{textAlign: 'center'}}>Time</th>
                                    {/* <th rowSpan="2">If not taken, Reasons</th> */}
                                    <th className="thtag">Date</th>
                                    <th className="thtag">Time</th>
                                    <th className="thtag"></th>
                                    <th className="thtag"></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    this.state.date_and_timing.map((store, index) => {
                                        return !this.state.holidays.includes(store.date) && store.time.length ?

                                                <tr key={store.date}>
                                                    <td className="thtag">
                                                        {index+1}
                                                    </td>
                                                    <td className="timing-td-table thtag">
                                                        {store.date.slice(4,15)}
                                                    </td>
                                                    <td className="timing-td-table thtag">
                                                        {store.time}
                                                    </td>
                                                    <td className="thtag"></td>
                                                    <td className="thtag"></td>
                                                    <td className="thtag"></td>
                                                    <td className="thtag"></td>
                                                    <td className="thtag"></td>
                                                </tr> :

                                                null
                                    })
                                }

                                <tr> 
                                    <td className="thtag" colSpan="4" style={{textAlign : 'unset'}}>
                                        <p style={{paddingLeft : '16px'}}>Signature of Faculty</p>
                                        <p style={{paddingLeft : '16px'}}>Date: </p>
                                    </td>
                                    <td className="thtag" colSpan="4" style={{textAlign : 'unset'}}>
                                        <p style={{paddingLeft : '16px'}}>Signature of HOD</p>
                                        <p style={{paddingLeft : '16px'}}>Date: </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Columns to be filled by the teachers in the begining of the Semester, excluding known holidays.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;------------------------------------------------------------------------------------------</p>
                    <p style={{textAlign: 'center',fontWeight: '600'}}>Final remarks</p>
                    <div style={{display: 'flex', padding: '1em'}}>
                        <div style={{flex: 1}}>
                            <p>Signature of Facutly</p>
                            <p>Date: </p>
                        </div>
                        <div style={{flex: 1, borderLeft: '1px solid grey', padding: '0 1em'}}>
                            <p>Signature of HOD</p>
                            <p>Date: </p>
                        </div>
                    </div>
                </div>
                </div>

                <button onClick={this.convertDomToPdf}>convert to pdf</button>
            </Fragment>

        )

    }
}

export default TeachingTiming