import React, {Component, Fragment} from 'react'

class Fortnightly extends Component {
    render() {
        return(
            <Fragment>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="text" name="coursename"/>
                        <input type="text" name="facultyname"/>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Fortnightly;