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
class NameChange_Transaction extends jsTPS_Transaction {
    constructor(getListName, setListName, initName) {
        // KEEP THESE FOR LATER
        super();
        this.oldName = getListName();
        this.setListName = setListName;
        this.newName = initName;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.setListName(this.newName);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.setListName(this.oldName);
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

export default NameChange_Transaction