// a class that creates a node
class Node{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// const root = new Node(2);
// root.left = new Node(1);
// root.right = new Node(3);

// console.log(root);

//a class that creates a BST
class BinarySearchTree{
  constructor(){
    this.root = null;
  }

  //creates a node with a given value and inserts it in the BST
  //Time complexity: best case O(log n) if tree is balanced; O(n) if unbalanced (a one sided tree which is similar to a Singly Linked List)
  insert(value){
    //create new node
    const newNode = new Node(value);
    //if tree is empty (root is null), return new node
    if(this.root === null){
      //assign the new node to the root
      this.root = newNode;
      //return tree
      return this;
    }
    //start search at the root
    let currentNode = this.root;
    //loop through as long as tree is true (or 'while(currentNode !== null)')
    while(true){
      //if the input value equals the current nodes value, return undefined
      if(value === currentNode.value) return undefined;
      //if the input value is less than the current nodes value {if the current nodes left is empty, assign the new node to it, and return the tree}
      if(value < currentNode.value){
        if(currentNode.left === null){
          currentNode.left = newNode;
          return this;
        }
        //else continue traversing to the left
        currentNode = currentNode.left;
      //else, if the input value is greater than the current nodes value {if the current nodes right is empty, assign the new node to it, and return the tree}
      }else{
        if(currentNode.right === null){
          currentNode.right = newNode;
          return this;
        }
        //else continue traversing to the right
        currentNode = currentNode.right;
      }
    }
  }

  //searches the tree for a given value; returns true if found, or false if not found
  //Time complexity: best case O(log n) if tree is balanced; O(n) if unbalanced (a one sided tree which is similar to a Singly Linked List)
  find(value){
    //if the tree is empty, return false
    if(this.root === null) return false;
    //create variable to start search at root of tree
    let currentNode = this.root;
    //loop through the tree as long as current node is not null
    while(currentNode !== null){
      //if the input value is less than the current nodes value {traverse to the left}
      if(value < currentNode.value){
        currentNode = currentNode.left;
      //else if the input value is greater than the current nodes value {traverse to the right}
      }else if(value > currentNode.value){
        currentNode = currentNode.right;
      //else the input value is equal to the current nodes value {return true}
      }else{
        return true;
      }
    }
    //return false because value not found
    return false;
  }

  //removes the node with the given value
  remove(value){}

  printListArray(){
    const array = [];
    const q = [];
    q.push(this.root);
    while(q.length !== 0){
      const currentQueueSize = q.length;
      for(let i=0; i < currentQueueSize; i++){
        const node = q.shift();
        if(node.left !== null){
          q.push(node.left);
        }
        if(node.right !== null){
          q.push(node.right);
        }
        array.push(node.value);
      }
    }
    return array;
  }
  
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(7);
// tree.insert(10);  //should return undefined because value is already in tree
console.log(tree.find(10));

console.log(tree);
console.log(tree.printListArray());