import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    getItemDescription() {
        return this.props.todoItem.description;
    }
    setItemDescription(description) {
        this.props.todoItem.description = description;
    }
    getItemAssignedTo() {
        return this.props.todoItem.assigned_to;
    }
    setItemAssignedTo(assignedTo) {
        this.props.todoItem.assigned_to = assignedTo;
    }
    getItemDueDate() {
        return this.props.todoItem.due_date;
    }
    setItemDueDate(dueDate) {
        this.props.todoItem.due_date = dueDate;
    }
    getItemCompleted() {
        return this.props.todoItem.completed;
    }
    setItemCompleted(completed) {
        this.props.todoItem.completed = completed;
    }
    cancelAdding = () => {
        this.props.loadList(this.props.todoList);
        this.props.todoList.items.pop();
    }
    render() {
        return (
            <div id="todo_item">
                <div id="item_heading">Item<br /><br /></div>
                <div id="item_form_container">
                    <div id="item_description_container" className="item_text_toolbar">
                        <span id="item_description_prompt" className="item_prompt">Description:</span>
                        <input 
                            defaultValue={this.getItemDescription()} 
                            type="text" 
                            onChange={(event)=>this.setItemDescription(event.target.value)}
                            id="item_description_textfield"
                            className="item_input" />
                    </div>
                    <div id="item_assigned_to_container" className="item_text_toolbar">
                        <span id="item_assigned_to_prompt" className="item_prompt">Assigned to:</span>
                        <input 
                            defaultValue={this.getItemAssignedTo()} 
                            type="text" 
                            onChange={(event)=>this.setItemAssignedTo(event.target.value)}
                            id="item_assigned_to_textfield"
                            className="item_input" />
                    </div>
                    <div id="item_due_date_container" className="item_text_toolbar">
                        <span id="item_due_date_prompt" className="item_prompt">Due Date:</span>
                        <input 
                            defaultValue={this.getItemDueDate()} 
                            type="date" 
                            onChange={(event)=>this.setItemDueDate(event.target.value)}
                            id="item_due_date_picker"
                            className="item_input" />
                    </div>               
                    <div id="item_completed_container" className="item_text_toolbar"> 
                        <span id="item_completed_prompt" className="item_prompt">Completed:</span>
                        <input 
                            defaultValue={this.getItemCompleted()} 
                            type="checkbox" 
                            onChange={(event)=>this.setItemCompleted(event.target.value)}
                            id="item_completed_checkbox" />
                    </div>           
                    <span id="item_form_submit_button" className="item_form_button" onClick={this.props.loadList.bind(this, this.props.todoList)}>Submit</span>
                    <span id="item_form_cancel_button" className="item_form_button" onClick={this.cancelAdding}>Cancel</span>
                </div>
            </div>
        )
    }
}


export default ItemScreen
