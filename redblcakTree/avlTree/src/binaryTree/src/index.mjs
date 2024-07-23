import binarySearchTree from './binarySearchTree.mjs'

const bst = new binarySearchTree();


// bst.insert(7);
// bst.insert(15);
// bst.insert(5);

bst.insert(70);
bst.insert(60);
bst.insert(80);
bst.insert(50);
bst.insert(90);
bst.insert(100);


const printNode = (val)=>console.log(val);

// bst.inOrderTraverse(printNode);
bst.postOrderTraverse(printNode);
// console.log(bst.min());
// console.log(bst.max());

console.log(bst.search(15));