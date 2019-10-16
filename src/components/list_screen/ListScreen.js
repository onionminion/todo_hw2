import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import Add from './icons/Add.png'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    detectKeys = (event) => {
        if (event.ctrlKey && event.key === "z") {
            event.preventDefault();
            this.props.executeUndo();
        }
        else if (event.ctrlKey && event.key === "y") {
            event.preventDefault();
            this.props.executeRedo();
        }
    }
    render() {
        return (
            <div id="todo_list" onKeyUp={this.detectKeys} tabIndex="0">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash showDialog={this.props.showDialog}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.props.getListName()} 
                            type="text" 
                            onChange={(event)=>this.props.processSetListName(event.target.value)}
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.props.getListOwner()}
                            type="text" 
                            onChange={(event)=>this.props.processSetListOwner(event.target.value)}
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} 
                    editItem={this.props.editItem}
                    removeItem={this.props.removeItem}
                    processMoveItemUp={this.props.processMoveItemUp}
                    processMoveItemDown={this.props.processMoveItemDown}
                    processRemoveItem={this.props.processRemoveItem}
                    itemsUpdated={this.props.itemsUpdated}
                    sortItemsByTask={this.props.sortItemsByTask}
                    sortItemsByDueDate={this.props.sortItemsByDueDate}
                    sortItemsByStatus={this.props.sortItemsByStatus} />
                <img src={Add} className='item_button' onClick={this.props.addNewItem}></img>
            </div>
        )
    }
}

export default ListScreen
