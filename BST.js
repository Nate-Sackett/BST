/**
 * Basic (not self-balancing) implementation of a Binary Search Tree
 * @author Nate Sackett
 */
module.exports = class BST {
    /**
     * Constructs a BST node with specified numerical key, any value, and null children.
     * - BST is NOT self-balancing
     * - this.left is a BST with keys smaller than this BST.
     * - this.right is a BST with keys larger than this BST.
     * - No relationship is assumed between key and value. Any relationship must be user defined.
     * @param {number} key The key of the BST node
     * @param {*} value The value for this BST node; null if unspecified
     */
    constructor(key, value=null) {

        // Type validation (number only)
        if (typeof key !== "number")
            throw new Error("Key of BST node must be a number!");
            
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }


    /**
     * Iteratively add a BST node to the BST.
     * @param {BST} node The BST node to be added.
     * @throws Error when node isn't a BST node or node.value isn't a unique number.
     */
    add(node) {
        // Input type validation (node must be a BST node)
        if ( node === null || node === undefined || !node.hasOwnProperty("key") || typeof node.key !== "number" 
        || !node.hasOwnProperty("value") || !node.hasOwnProperty("left") || !node.hasOwnProperty("right") ) {
            throw new Error("Only valid for BST nodes.");
        }

        let curr = this; // Current location in BST; start from root
        let done = false;

        while(!done) {

            // Check that the key is unique
            if (curr.key === node.key)
                throw new Error(`${node.key} is not a unique key.`);

            // Left child
            if (node.key < curr.key) {

                // Try adding as left child
                if (curr.left === null) {
                    curr.left = node;
                    done = true;
                }

                // Else, iterate left
                else
                    curr = curr.left;
            }
            // Right child
            else { // (curr.key < node.key)

                // Try adding as right child
                if (curr.right === null) {
                    curr.right = node;
                    done = true;
                }
                
                // Else, iterate right
                else
                    curr = curr.right;
            }
        }
    }

    
    /**
     * Finds and returns a value from the BST, given the matching key.
     * @param {number} key The key matching the desired value.
     * @returns Value of matching key or undefined if the key DNE.
     */
    getValue(key) {

        // Type validation (number only)
        if (typeof key !== "number")
            throw new Error("Key of BST node must be a number!");

        // Reference to the current node in the BST
        let curr = this;

        // Loop until a match is found or DNE
        while(curr.key !== key) {

            // Try to iterate left
            if (key < curr.key) {
    
                // Check for valid left child (exit condition)
                if (curr.left === null)
                    return undefined;
    
                // Iterate left
                curr = curr.left;
    
            // Try to iterate right
            } else { // curr.key < key
    
                // Check for valid right child (exit condition)
                if (curr.right === null)
                    return undefined;
                
                // Iterate right
                curr = curr.right;
            }
        }

        // Return value from matching key
        return curr.value;
    }


    /**
     * Finds and updates a value from the BST, given the matching key.
     * @param {number} key The key matching the node to be updated.
     * @returns The old value of the node, or undefined if the key was not found.
     */
    update(key, newValue) {

        // Type validation (number only)
        if (typeof key !== "number")
            throw new Error("Key of BST node must be a number!");

        // Reference to the current node in the BST
        let curr = this;

        // Loop until a match is found or DNE
        while(curr.key !== key) {

            // Try to iterate left
            if (key < curr.key) {
    
                // Check for valid left child (exit condition)
                if (curr.left === null)
                    return undefined;
    
                // Iterate left
                curr = curr.left;
    
            // Try to iterate right
            } else { // curr.key < key
    
                // Check for valid right child (exit condition)
                if (curr.right === null)
                    return undefined;
                
                // Iterate right
                curr = curr.right;
            }
        }

        // Return matching key after finding match
        const temp = curr.value;
        curr.value = newValue;
        return temp;
    }


    /**
     * Outputs sorted array of BST values (only)
     * - Array sorted from smallest to largest key value
     * @returns Sorted array of BST values
     * @example (BST) root.toArray := [ 'val_4', 'val_5' ]
     */
    toArray() {
        let arr = [];

        // Recursive helper function
        function toArrayHelper(curr) {

            // Evaluate left child first
            if (curr.left !== null)
                toArrayHelper(curr.left);
            
            // Push self once left child fully evaluated
            arr.push(curr.value);
    
            // Evaluate right child after self
            if (curr.right !== null)
                toArrayHelper(curr.right);
        }

        // Call (private) recursive helper function
        toArrayHelper(this);

        // Return sorted array of values
        return arr;
    }


    /**
     * Outputs sorted BST of key value pairs as an array of objects.
     * - Sorted from smallest to largest key value.
     * @returns Sorted array of key/value objects
     * @example (BST) root.toKVArray := [ { key: 4, value: 'val_4' }, { key: 5, value: 'val_5' } ]
     */
    toKVArray() {
        let arr = [];

        // Recursive helper function
        function toKVArrayHelper(curr) {

            // Evaluate left child first
            if (curr.left !== null)
                toKVArrayHelper(curr.left);
            
            // Push self once left child fully evaluated
            arr.push({key: curr.key, value: curr.value});
    
            // Evaluate right child after self
            if (curr.right !== null)
                toKVArrayHelper(curr.right);
        }

        // Call (private) recursive helper function
        toKVArrayHelper(this);

        // Return array of key, value pair objects
        return arr;
    }


    /**
     * Outputs sorted array of all BST keys
     * @example (BST) root.getKeys := [ 4, 5 ]
     * @returns Sorted array of BST keys
     */
    getKeys() {
        let arr = [];

        // Recursive helper function
        function getKeyHelper(curr) {

            // Evaluate left child first
            if (curr.left !== null)
                getKeyHelper(curr.left);
            
            // Push self once left child fully evaluated
            arr.push(curr.key);
    
            // Evaluate right child after self
            if (curr.right !== null)
                getKeyHelper(curr.right);
        }

        // Call (private) recursive helper function
        getKeyHelper(this);

        // Return array of key, value pair objects
        return arr;
    }


    /**
     * Deletes a BST node given a valid key, then returns the key and value inside an object.
     * Does nothing and returns null given an invalid (numerical) key.
     * @param {number} key The key of the BST node to be deleted.
     * @throws Error ("Key of BST node must be a number!") when provided a key that is not a number.
     * @throws Error ("Deleting root node when no other nodes exist is undefined.") when attempting to delete root node with zero children
     * @returns key/value pair inside an object if node removed, or null if node does not exist.
     * @example root.delete(5); // If successful, returns: { key: 5, value: {associated value} }, else returns: null
     */
    delete(key) {
        // Input validation
        if (typeof key !== "number")
            throw new Error("Key of BST node must be a number!");

        let matchParent = null; // Parent of current matching node
        let match = this; // Current matching node

        // ----- Find node with matching key and its parent -----
        try {
            while (match.key !== key) {

                // Update parent of match
                matchParent = match;
                
                // Iterate left
                if (key < matchParent.key)
                    match = matchParent.left;

                // Iterate right
                else // matchParent.key < key
                    match = matchParent.right;
            }
        // Catches reference to null.left or null.right if no match is found
        } catch (err) {
            return null;
        }

        // ----- Find in-order successor to match, swap in the successor, and remove match

        // Variable to hold the old value of the match before it's overwritten
        let matchData;
        
        // Case 1: At least one child of match is null
        if ( match.left===null || match.right===null ) {
            
            // Find successor node to replace match
            let successor = match.left===null ? match.right : match.left; // Yields null if both children are null
            
            // Special case: match is the root node (this)
            // - Because one or fewer children exist, match can be directly transformed into successor, thus removing the root from the BST
            if (matchParent === null) { // match === this

                // Cannot delete root node if no other nodes exist
                if (successor == null)
                    throw new Error("Deleting root node when no other nodes exist is undefined.");

                // Remove root node from tree by transforming it into its successor
                match.key = successor.key;
                match.value = successor.value;
                match.left = successor.left;
                match.right = successor.right;
            }
            
            // Otherwise, remove match from the BST normally by dereferencing it
            else {
                // Find relation between match and matchParent (i.e. Is match equal to matchParent.left or matchParent.right?)
                const relation = match.key < matchParent.key ? "left" : "right";

                matchParent[relation] = successor;
            }
            // Store return value from match
            matchData = { key: match.key, value: match.value };
        }
        
        // Case 2: Neither child of match are null
        else {

            // Find in-order successor and its parent
            let successorParent = null;
            let successor = match.right; // successor.key > match.key
            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }
            
            // -- Update data --
            
            // Store values from match before updating/deleting
            matchData = { key: match.key, value: match.value };
            
            // Special case: successor is the direct child of match
            if (successorParent === null) { // match.right === successor

                // Transform match into successor, dereferencing successor
                // - (will update key and value of match to those of successor later)
                match.right = successor.right;
            }

            // Regular case: successor isn't the direct child of match
            else { // successorParent !== null

                // Remove reference to successor from its parent
                successorParent.left = successor.right;
            }

            // Replace match's key and value with those from successor
            match.key = successor.key;
            match.value = successor.value;
        }

        // ----- Finally return key/value pair in an object -----
        return matchData;
    }

    
    /**
     * Converts this BST into a balanced BST (the height difference between leaf nodes is at most 1)
     * - Distributes nodes as evenly as possible such that the height of the tree is log_2(Number of Nodes) rounded up.
     * @returns {BST} Returns the root node of a balanced BST with the data of the input tree.
     * @example root = root.balance(); // Overwrites root with a balanced version of the same tree.           
     * - Input:  5      Output:  5
     * -        / \             / \
     * -       4   6           3   7
     * -      /     \         / \ / \
     * -     3       7       2  4 6  8
     * -    /         \
     * -   2           8
     */
    balance() {

        // Sort BST into array
        const sorted = this.toKVArray();

        // Get BST from sorted array
        return balanceHelper(0, sorted.length-1);

        /**
         * Recursive helper function
         * @param {number} first The first index
         * @param {number} last The last index
         */
        function balanceHelper(first, last) {

            // Base case: first and last index have crossed
            if (first > last)
                return null;

            // Calculate midpoint (rounding up)
            const m = Math.ceil( (last - first)/2 ) + first;

            // Make a new node
            const newNode = new BST(sorted[m].key, sorted[m].value);

            // Recursively define left and right subtrees
            newNode.left = balanceHelper(first, m-1);
            newNode.right = balanceHelper(m+1, last);

            // Return completed tree
            return newNode;
        }
    }
}