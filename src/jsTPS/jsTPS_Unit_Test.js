import AddToNum_Transaction from "./AddToNum_Transaction"
import AndMask_Transaction from "./AndMask_Transaction"
import Num from "./Num"
import jsTPS from "./jsTPS"

/**
 * jTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */
class jsTPS_Unit_Test {
    /**
     * This JUnit test is for testing the adding of transactions.
     */
    testAdd() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        var assert = require('assert');
        assert.equal(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        assert.equal(5, num.getNum());
        assert.equal(1, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(1, tps.getUndoSize());
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        assert.equal(15, num.getNum());
        assert.equal(2, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(2, tps.getUndoSize());
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    }
    
    /**
     * 
     */
    testAndMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        var assert = require('assert');
        assert.equal(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        assert.equal(4, num.getNum());
        assert.equal(2, tps.getSize());
        
        tps.undoTransaction();
        assert.equal(12, num.getNum());
        assert.equal(2, tps.getSize());
        assert.equal(1, tps.getRedoSize());
        assert.equal(1, tps.getUndoSize());

    }
    
    public void testOrMask() {
        
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        var assert = require('assert');
        assert.equal(num.getNum(), 0);
        assert.equal(tps.hasTransactionToUndo(), false);
        assert.equal(tps.hasTransactionToRedo(), false);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), false);
        assert.equal(35, num.getNum());
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), true);
        assert.equal(15, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(1, tps.getRedoSize());
        assert.equal(2, tps.getUndoSize());
        
        // UNDO ANOTHER
        tps.undoTransaction();
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), true);
        assert.equal(5, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(2, tps.getRedoSize());
        assert.equal(1, tps.getUndoSize());
        
        // AND ANOTHER
        tps.undoTransaction();
        assert.equal(tps.hasTransactionToUndo(), false);
        assert.equal(tps.hasTransactionToRedo(), true);
        assert.equal(0, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(3, tps.getRedoSize());
        assert.equal(0, tps.getUndoSize());
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        assert.equal(tps.hasTransactionToUndo(), false);
        assert.equal(tps.hasTransactionToRedo(), true);
        assert.equal(0, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(3, tps.getRedoSize());
        assert.equal(0, tps.getUndoSize());
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        var assert = require('assert');
        assert.equal(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), false);
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), false);
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equal(tps.hasTransactionToUndo());
        assert.equal(tps.hasTransactionToRedo(), false);
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), false);
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), true);
        assert.equal(15, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(1, tps.getRedoSize());
        assert.equal(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equal(tps.hasTransactionToUndo(), true);
        assert.equal(tps.hasTransactionToRedo(), false);
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    testClear() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        var assert = require('assert');
        assert.equal(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        assert.equal(35, num.getNum());
        assert.equal(0, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(70, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        assert.equal(70, num.getNum());
        assert.equal(0, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(105, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    }
}