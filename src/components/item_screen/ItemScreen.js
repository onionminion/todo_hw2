import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        document.onkeyup = null;
        return (
            <div id="todo_item">
                <div id="item_heading">Item<br /><br /></div>
                <div id="item_form_container">
                    <div id="item_description_container" className="item_text_toolbar">
                        <span id="item_description_prompt" className="item_prompt">Description:</span>
                        <input 
                            defaultValue={this.props.getItemDescription()} 
                            type="text" 
                            onChange={(event)=>this.props.setItemDescription(event.target.value)}
                            id="item_description_textfield"
                            className="item_input" />
                    </div>
                    <div id="item_assigned_to_container" className="item_text_toolbar">
                        <span id="item_assigned_to_prompt" className="item_prompt">Assigned to:</span>
                        <input 
                            defaultValue={this.props.getItemAssignedTo()} 
                            type="text" 
                            onChange={(event)=>this.props.setItemAssignedTo(event.target.value)}
                            id="item_assigned_to_textfield"
                            className="item_input" />
                    </div>
                    <div id="item_due_date_container" className="item_text_toolbar">
                        <span id="item_due_date_prompt" className="item_prompt">Due Date:</span>
                        <input 
                            defaultValue={this.props.getItemDueDate()} 
                            type="date" 
                            onChange={(event)=>this.props.setItemDueDate(event.target.value)}
                            id="item_due_date_picker"
                            className="item_input" />
                    </div>               
                    <div id="item_completed_container" className="item_text_toolbar"> 
                        <span id="item_completed_prompt" className="item_prompt">Completed:</span>
                        <input 
                            defaultChecked={this.props.getItemCompleted()} 
                            type="checkbox" 
                            onChange={(event)=>this.props.setItemCompleted(event.target.checked)}
                            id="item_completed_checkbox" />
                    </div>           
                    <span id="item_form_submit_button" className="item_form_button" onClick={this.props.processEditItem.bind(this.props.todoItem)}>Submit</span>
                    <span id="item_form_cancel_button" className="item_form_button" onClick={this.props.cancelAdding}>Cancel</span>
                </div>
            </div>
        )
    }
}


export default ItemScreen
