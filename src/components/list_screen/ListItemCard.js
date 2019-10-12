import React, { Component } from 'react'
import ListItemStatus from './ListItemStatus'
import Up from './icons/MoveUp.png'
import Down from './icons/MoveDown.png'
import Delete from './icons/Close.png'

export class ListItemCard extends Component {
    disableUp = () => {
        if (this.props.index === 0) {
            return {
                background: 'lightgray',
                cursor: 'default'
            }
        }
    }

    disableDown = () => {
        if (this.props.index === this.props.length-1) {
            return {
                background: 'lightgray',
                cursor: 'default'
            }
        }
    }

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
                <img src={Down} className='list_item_down_img' style={this.disableDown()} onClick={this.props.moveItemDown.bind(this, this.props.index)}></img>
                <img src={Up} className='list_item_up_img' style={this.disableUp()} onClick={this.props.moveItemUp.bind(this, this.props.index)}></img>
            </div>
        )
    }
}

export default ListItemCard
