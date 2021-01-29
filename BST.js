/**
 * Basic (non self-balancing) recursive implementation of a Binary Search Tree with CRUD features
 */
class BST {
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
        // TODO: Be able to change value

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
        if ( node !== null && node !== undefined && !node.hasOwnProperty("key") && typeof node.key === "number" 
        && !node.hasOwnProperty("value") && !node.hasOwnProperty("left") && !node.hasOwnProperty("right") ) {
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


    // TODO: Test and make it look better
    delete(key) {
        // Input validation
        if (typeof key !== "number")
            throw new Error("Key of BST node must be a number!");

        let prev; // Previous node -> Parent of matching node
        let curr = this; // Current node -> Matching node

        // ----- Find node with matching key and its parent -----
        while (curr.key !== key) {

            // Update prev
            prev = curr;
            
            // Iterate left
            if (key < prev.key) {

                // End if no matches
                if (prev.left === null)
                    return null;
                
                else
                    curr = prev.left;
            }

            // Iterate right
            else { // prev.key < key

                // End if no matches
                if (prev.right === null)
                    return null;

                else
                    curr = prev.right;
            }
        }
        // ----- Find successor node then update pointers -----

        // Case 1: curr < prev
        if (curr.key < prev.key) {

            // Case 1A: curr.left is null
            if (curr.left === null)
                prev.left = curr.right; // Possible for this to be null

            // Case 1B: curr.right is null
            else if (curr.right === null)
                prev.left = curr.left; // May overwrite null with null

            // Case 1C: Neither curr.left nor curr.right are null
            else {
                // Find the child just larger and its parent
                let parent = curr;
                let child = curr.right;
                while (child.left !== null) {
                    parent = child;
                    child = child.left;
                }
                console.log(`parent: ${parent.value}, child: ${child.value}`);
                // -- Update references --

                // Extract child (child.left === null)
                parent.left = child.right;

                // Attach child to curr's children
                child.left = curr.left;
                child.right = curr.right;

                // Attach prev to child
                prev.left = child;
            }
        }    
        // Case 2: prev < curr
        else {
    
            // Case 2A: curr.left is null
            if (curr.left === null)
                prev.right = curr.right; // Possible for this to be null

            // Case 2B: curr.right is null
            else if (curr.right === null)
                prev.right = curr.left; // May overwrite null with null

            // Case 1C: Neither curr.left nor curr.right are null
            else {
                // Find the child just larger and its parent
                let parent = curr;
                let child = curr.right;
                while (child.left !== null) {
                    parent = child;
                    child = child.left;
                }
                console.log(`parent: ${parent.value}, child: ${child.value}`);
                // -- Update references --

                // Extract child (child.left === null)
                parent.left = child.right;

                // Attach child to curr's children
                child.left = curr.left;
                child.right = curr.right;

                // Attach prev to child
                prev.right = child;
            }
        }

        // ----- Finally return key/value pair in an object -----
        return { key: curr.key, value: curr.value };
    }


    /**
     * Finds and returns a value from the BST, given the matching key.
     * @param {number} key The key matching the desired value.
     * @returns Value of matching key or undefined if the key DNE.
     */
    getValue(key) {

        // Base case
        if (this.key === key)
            return this.value;
        
        // Iterate left
        else if (key < this.key) {

            // Check for valid left child
            if (this.left === null)
                return undefined;

            return this.left.getValue(key);

        // Iterate right
        } else { // this.key < key

            // Check for valid right child
            if (this.right === null)
                return undefined;
            
            return this.right.getValue(key);
        }
    }


    /**
     * Outputs sorted array of BST values (only)
     * - Array sorted from smallest to largest key value
     * @example (BST) root.toArray := [ 'val_4', 'val_5' ]
     * @returns Sorted array of BST values
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
     * @example (BST) root.toKVArray := [ { key: 4, value: 'val_4' }, { key: 5, value: 'val_5' } ]
     * @returns Sorted array of key/value objects
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
}

module.exports = BST;