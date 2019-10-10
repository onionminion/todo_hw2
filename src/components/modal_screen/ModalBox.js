import React, { Component } from 'react'

const MODAL_CLASS = ['modal'];

export class ModalBox extends Component {
    makeInvisible = () => {
        if (MODAL_CLASS.includes('is_visible'))
            MODAL_CLASS.pop();
        this.props.hideDialog();
    }

    confirmDelete = () => {
        this.props.removeList(this.props.todoList);
        if (MODAL_CLASS.includes('is_visible'))
            MODAL_CLASS.pop();
    }

    render() {
        if (this.props.trashClicked)
            MODAL_CLASS.push('is_visible');

        return (
            <div className={MODAL_CLASS.join(' ')} id="modal_yes_no_dialog" data-animation="slideInOutLeft" >
                <div className="modal_dialog">
                    <header className="dialog_header">
                        Delete list?
                    </header>
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                    </section>
                        <button id="dialog_yes_button" onClick={this.confirmDelete}>Yes</button>
                        <button id="dialog_no_button" onClick={this.makeInvisible}>No</button>
                    <footer className="dialog_footer">
                        The list will not be retreivable.
                    </footer>
                </div>
            </div>
        )
    }
}

export default ModalBox