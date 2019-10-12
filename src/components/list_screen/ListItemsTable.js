import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header"
                        onClick={this.props.sortItemsByTask.bind(this, this.props.todoList)}
                    >   Task</div>
                    <div className="list_item_due_date_header"
                        onClick={this.props.sortItemsByDueDate.bind(this, this.props.todoList)}
                    >   Due Date</div>
                    <div className="list_item_status_header"
                        onClick={this.props.sortItemsByStatus.bind(this, this.props.todoList)}
                    >   Status</div>
                </div>
                    {
                        this.props.todoList.items.map((todoItem)=>(
                            <ListItemCard 
                                goItem={this.props.goItem}
                                removeItem={this.props.removeItem}
                                moveItemUp={this.props.moveItemUp}
                                moveItemDown={this.props.moveItemDown}
                                itemsUpdated={this.props.itemsUpdated}
                                key={todoItem.key}
                                index={this.props.todoList.items.indexOf(todoItem)}
                                length={this.props.todoList.items.length}
                                listItem={todoItem} />
                        ))
                    }
            </div>
        )
    }
}

export default ListItemsTable
