import jsTPS_Transaction from "./jsTPS_Transaction.js"

/**
 * AddToNum_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 2.0
 */
class AddItem_Transaction extends jsTPS_Transaction {
    constructor(addItem, removeItemOfKey, item) {
        super();
        this.addItem = addItem;
        this.removeItemOfKey = removeItemOfKey;
        this.newItem = item;
        this.oldItem = {
            key: this.newItem.key,
            description: this.newItem.description,
            due_date: this.newItem.due_date,
            assigned_to: this.newItem.assigned_to,
            completed: this.newItem.completed
        }
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.addItem(this.newItem);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.removeItemOfKey(this.oldItem.key);
        this.newItem = this.oldItem;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Add ";
    }
}

export default AddItem_Transaction