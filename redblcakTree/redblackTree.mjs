import BinarySearchTree from "./binarySearchTree/src/binarySearchTree.mjs";
import { Compare, defaultCompare } from './binarySearchTree/utils/compare.mjs';
import { RedblackTreeNode, Color } from "./binarySearchTree/src/modules/redblackTreeNode.mjs";

class RedblackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }


    //像红黑树中插入节点
    insert(key) {
        if (this.root == null) {
            this.root = new RedblackTreeNode(key);
            this.root.color = Color.BLACK;
        }else {
            const newNode = this.insertNode(this.root,key);
            this.fixTreeProperties(newNode);//用于在插入节点修复红黑树
        }
    }

    //重写insertNode方法
    insertNode(node,key){
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            if(node.left == null){
                node.left = new RedblackTreeNode(key);
                node.left.parent = node;//记录父节点是谁
                return node.left;
            }else{//如果没有找到合适的位置，继续递归寻找
                return this.insertNode(node.left,key);
            }
        }else if(node.right == null){
            node.right = new RedblackTreeNode(key);
            node.right.parent = node;
            return node.right;
        }else{
            return this.insertNode(node.right,key);
        }
    }

    //在插入节点之后，我们要判断红黑树是否被violate了，如果有要及时的修复
    fixTreeProperties(node){
        while(node && node.parent && node.parent.color.isRed() && node.color !== Color.BLACK){//如果节点不为null，且有父节点，且父节点的颜色是红色，且自己的颜色为黑色
            //此时已经违反了红黑树的规则，也就是一条路径上出现了
            //那此时我们还要根据其叔叔节点的颜色先判断是做旋转还是做color flip
            
        }
    }

    
}