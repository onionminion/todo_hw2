import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div id="todo_item">
                <div id="item_heading">Item<br /><br /></div>
                <div id="item_form_container">
                    <div id="item_description_container" className="item_text_toolbar">
                        <span id="item_description_prompt" className="item_prompt">Description:</span>
                        <input type="text" className="item_input" id="item_description_textfield" />
                    </div>
                    <div id="item_assigned_to_container" className="item_text_toolbar">
                        <span id="item_assigned_to_prompt" className="item_prompt">Assigned to:</span>
                        <input type="text" className="item_input" id="item_assigned_to_textfield" />
                    </div>
                    <div id="item_due_date_container" className="item_text_toolbar">
                        <span id="item_due_date_prompt" className="item_prompt">Due Date:</span>
                        <input type="date" className="item_input" id="item_due_date_picker" />
                    </div>               
                    <div id="item_completed_container" className="item_text_toolbar"> 
                        <span id="item_completed_prompt" className="item_prompt">Completed:</span>
                        <input type="checkbox" id="item_completed_checkbox" />
                    </div>           
                    <span id="item_form_submit_button" className="item_form_button">Submit</span>
                    <span id="item_form_cancel_button" className="item_form_button">Cancel</span>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
