import React, { Component } from 'react'
import ListItemStatus from './ListItemStatus'
import Up from './icons/MoveUp.png'
import Down from './icons/MoveDown.png'
import Delete from './icons/Close.png'

export class ListItemCard extends Component {
    render() {
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <ListItemStatus currentItem = {this.props.listItem}/>
                <img src={Delete} className='list_item_delete_img' onClick={this.props.removeItem.bind(this, this.props.listItem)}></img>
                <img src={Down} className='list_item_down_img' onClick={this.props.moveItemUp.bind(this, this.props.listItem)}></img>
                <img src={Up} className='list_item_up_img'></img>
            </div>
        )
    }
}

export default ListItemCard
