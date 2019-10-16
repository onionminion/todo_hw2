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
    constructor(submitItem, cancelItem, item) {
        super();
        this.submitItem = submitItem;
        this.cancelItem = cancelItem;
        this.item = item;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.submitItem(this.item);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.cancelItem(this.item);
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