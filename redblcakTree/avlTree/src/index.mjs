import { AVLTree } from "./AVLTree.mjs";

const tree = new AVLTree();

// tree.insert(50);
// tree.insert(30);
// tree.insert(70);
// tree.insert(10);
// tree.insert(40);
// tree.insert(35);

// tree.insert(70);
// tree.insert(50);
// tree.insert(80);
// tree.insert(72);
// tree.insert(90);
// tree.insert(75);

tree.insert(70);
tree.insert(60);
tree.insert(80);
tree.insert(90);
tree.insert(50);
tree.insert(75);
tree.insert(72);

// tree.insert(70);
// tree.insert(60);
// tree.insert(80);
// tree.insert(50);
// tree.insert(75);
// tree.insert(90);
// tree.insert(71);

const printNode = (val)=>console.log(val);
tree.postOrderTraverse(printNode);//后续遍历没问题，一定是插入算法出现了问题，出现旋转了
console.log("-------------分割线---------------");
tree.remove(50);

tree.postOrderTraverse(printNode);



