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
class MoveUp_Transaction extends jsTPS_Transaction {
    constructor(newIndex, moveUp, moveDown) {
        // KEEP THESE FOR LATER
        super();
        this.index = newIndex;
        this.moveUp = moveUp;
        this.moveDown = moveDown;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.moveUp(this.index);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.moveDown(this.index-1);
    }   

    getIndex() {
        return this.index;
    }

    setIndex(index) {
        this.index = index;
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

export default MoveUp_Transaction