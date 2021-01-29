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

        // Type validation (number only)
        if (typeof key === "number") {
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
        } else {
            throw new Error("Key of BST node must be a number!");
        }
    }

    /**
     * Pushes a BST node to the BST.
     * @param {BST} node The BST node to be added.
     * @throws Error when node isn't a BST node or node.value isn't a unique number.
     */
    push(node) {
        // Type validation (node must be a BST node)
        if ( node !== null && node !== undefined && !node.hasOwnProperty("key") && typeof node.key === "number" 
        && !node.hasOwnProperty("value") && !node.hasOwnProperty("left") && !node.hasOwnProperty("right") ) {
            throw new Error("Only valid for BST nodes.");
        }

        // Check that the key is unique
        if (this.key === node.key)
            throw new Error(node.key + " is not a unique key.");

        // Left child
        if (node.key < this.key) {

            // Try adding as left child (base case = no left child)
            if (this.left === null)
                this.left = node;

            // Recursive case
            else
                this.left.push(node);

        }
        // Right child
        else { // (this.key < node.key)

            // Try adding as right child (base case = no right child)
            if (this.right === null)
                this.right = node;
            
            // Recursive case
            else
                this.right.push(node);
        }
    }
}

module.exports = BST;