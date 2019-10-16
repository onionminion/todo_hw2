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
class EditItem_Transaction extends jsTPS_Transaction {
    constructor(index, newItem, oldItem, submitItem, setCurrentItem) {
        super();
        this.index = index;
        this.newItem = newItem;
        this.oldItem = oldItem;
        this.submitItem = submitItem;
        this.setCurrentItem = setCurrentItem;
    }
    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.setCurrentItem(this.newItem, this.index);
    }
    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.setCurrentItem(this.oldItem, this.index);        
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

export default EditItem_Transaction