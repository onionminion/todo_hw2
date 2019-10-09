import React, { Component } from 'react'

export class ListItemStatus extends Component {
    render() {
        if (this.props.currentItem.completed) {
            return (
                <div className='list_item_card_completed'>
                    {this.displayStatus(this.props.currentItem.completed)}
                </div>
            )
        }
        else {
            return (
                <div className='list_item_card_not_completed'>
                    {this.displayStatus(this.props.currentItem.completed)}
                </div>
            )
        } 
    }

    displayStatus(isCompleted) {
        if (isCompleted) {
            return "Completed";
        }
        else
            return "Pending";
    }
}

export default ListItemStatus