import React, {Component, Fragment} from 'react';
import { AuthContext } from '../../Context/Context';
import {NavLink} from 'react-router-dom';

class SelectDepartment extends Component{

    state = {
        dept: null
    }


    handleSelectChange = (e) => {
        this.setState({dept: e.target.value});
    }


    static contextType = AuthContext

    render() {

        const {changeDept} = this.context;

        return (
            <Fragment>
                <div className="row dep" style={{ margin: 'auto', width: '20%'}}>
                    <div className="input-field col s12">
                        <h5 style={{justifyContent:'center', display:'flex'}}>Select Department</h5>
                        <select style={{display: 'block'}} onChange={this.handleSelectChange}>
                            <option value="" disabled default>Choose your option</option>
                            <option value="BE">BE</option>
                            <option value="MCA">MCA</option>
                        </select>
                        <br/>

                        <button onClick={() => changeDept(this.state.dept)} className="waves-effect waves-light btn" style={{margin: 'auto', display: 'flex', justifyContent: 'center'}}>
                            <NavLink to="teaching" style={{ color: '#ffffff'}}>Next</NavLink>
                        </button>
                        {/* <label>Materialize Select</label> */}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SelectDepartment