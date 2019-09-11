import React from 'react'


function TeachingDiaryCheckbox(props) {

    return (
        <td>
            <div className="table_checkbox">
                <label className="valign-wrapper">
                    <input type="checkbox" 
                        className="filled-in" 
                        name={props.name} 
                        value={props.value} 
                        onChange={props.handleFormChange}
                        disabled={props.state_day.includes(props.value) ? false : props.isDisabled} />
                    <span></span>
                </label>
            </div>
        </td>
    )

}



export default TeachingDiaryCheckbox