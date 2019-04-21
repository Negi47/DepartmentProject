import React, {Component} from 'react'

class HolidayList extends Component{
    
    render() {
        return(
            <Fragment>

            <div>
                <input type="button" name="view"/>
            </div>

            <table>
                <th>
                    <td>SL.NO.</td>
                    <td>DATE</td>
                    <td>DAY</td>
                    <td>PARTICULARS</td>
                </th>
            </table>

            </Fragment>
        )
    }
}

export default HolidayList