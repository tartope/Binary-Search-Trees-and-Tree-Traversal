//Udemy

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
      //if the input value equals the current nodes value, return undefined (if the value already exists)
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
  remove(value){
    //if the tree is empty, return false
    if(this.root === null) return false;

    //start at root with variable currentNode
    let currentNode = this.root;
    //make a parent node to currentNode, set to null because the root is the top node
    let parentNode = null;

    //loop through as long as currentNode is not null
    while(currentNode !== null){
      //if input value is less than current nodes value {traverse parentNode to currentNode, and currentNode to left}
      if(value < currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.left;
      //else if input value is greater than current nodes value {traverse parentNode to currentNode, and currentNode to right}
      }else if(value > currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.right;
      }else if(value === currentNode.value){
        //There's a match:
        //option 1: if currentNode has no right child
        if(currentNode.right === null){
          //if root is chosen for removal {assign currentNode.left to root}
          if(parentNode === null){
            this.root = currentNode.left;
          }else{
            //if parentNode > current nodes value {assign currentNodes left value to parentNodes left pointer}
            if(parentNode.value > currentNode.value){
              parentNode.left = currentNode.left;
            //else if parentNode < current nodes value, {assign currentNodes left value to parentNodes right pointer}
            }else if(parentNode.value < currentNode.value){
              parentNode.right = currentNode.left;
            }
          }
        //option 2: currentNodes right child doesn't have a left child
        //else if currentNodes right then left value is null {assign currentNode's left value to it}
        }else if(currentNode.right.left === null){
          currentNode.right.left = currentNode.left;
          //if root is chosen for removal {assign currentNodes right value to root}
          if(parentNode === null){
            this.root = currentNode.right;
          //else, parentNode > current nodes value {assign currentNodes right value to parentNodes left pointer}
          }else{
            if(parentNode.value > currentNode.value){
              parentNode.left = currentNode.right;
            //or if parentNode < current nodes value, assign currentNodes right value to parentNodes right pointer
            }else if(parentNode.value < currentNode.value){
              parentNode.right = currentNode.right;
            }
          }
        //option 3: currentNodes right child, has a left child
        }else{
          //find the right child's left most child
          //assign leftMost to currentNodes right, left value
          let leftMost = currentNode.right.left;
          //assign leftMostParent to currentNodes right value
          let leftMostParent = currentNode.right;
          //as long as the leftMost's left value is not null
          while(leftMost.left !== null){
            //traverse leftMostParent to leftMost and leftMost to leftMost's left value
            leftMostParent = leftMost;
            leftMost = leftMost.left;
          }
          //assign leftMost's right values to the leftMostParents left pointer (LMP gets the subtree of LM's right)
          leftMostParent.left = leftMost.right;
          //assign leftMost left pointer to currentNodes left value (LM takes the place of currentNode)
          leftMost.left = currentNode.left;
          //assign leftMost right pointer to currentNodes right value (LM takes the place of currentNode)
          leftMost.right = currentNode.right;
          //if root is chosen for removal {assing leftMost to root}
          if(parentNode === null){
            this.root = leftMost;
          //otherwise, if currentNode value is less than parent node value {assign leftMost to parentNode left}
          }else{
            if(currentNode.value < parentNode.value){
              parentNode.left = leftMost;
            //otherwise, if currentNode value is greater than parent node value {assign leftMost to parentNode right}
            }else if(currentNode.value > parentNode.value){
              parentNode.right = leftMost;
            }
          }
        }
        //move out of option 3 else statement, set currentNodes left/right to null, and return true if removed
        currentNode.left = null;
        currentNode.right = null;
        return currentNode;
      }
    }
  }
    

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
tree.insert(6);
tree.insert(15);
// tree.insert(10);  //should return undefined because value is already in tree
// console.log(tree.find(10));
console.log(tree.remove(10));

console.log(tree);
console.log(tree.printListArray());