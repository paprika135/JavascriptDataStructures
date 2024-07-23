import {RedblackTree} from "./redblackTree.mjs";

const rbt = new RedblackTree();
// rbt.insert(3);
// rbt.insert(2);
// rbt.insert(1);
rbt.insert(1);
rbt.insert(2);
rbt.insert(3);

const printNode = (val)=>console.log(val);

// rbt.postOrderTraverse(printNode);//后序遍历
// rbt.inOrderTraverse(printNode);//中序遍历
rbt.preOrderTraverse(printNode);//先序遍历