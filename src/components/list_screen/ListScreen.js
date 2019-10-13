import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import Add from './icons/Add.png'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    setListName(initName) {
        let oldName = this.props.todoList.name;
        let trimmedName = initName.trim();
        if (trimmedName === "") {
            this.props.todoList.name = oldName;
            console.log("List name cannot be empty. Try again");
        }
        else 
            this.props.todoList.name = initName;        
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    setListOwner(owner) {
        this.props.todoList.owner = owner;
    }
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash showDialog={this.props.showDialog}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.getListName()} 
                            type="text" 
                            onChange={(event)=>this.setListName(event.target.value)}
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            onChange={(event)=>this.setListOwner(event.target.value)}
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} 
                    goItem={this.props.goItem}
                    removeItem={this.props.removeItem}
                    moveItemUp={this.props.moveItemUp}
                    moveItemDown={this.props.moveItemDown}
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
