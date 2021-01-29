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
}

module.exports = BST;