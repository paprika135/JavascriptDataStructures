import BinarySearchTree from "./binarySearchTree/src/binarySearchTree.mjs";
import { Compare, defaultCompare } from './binarySearchTree/utils/compare.mjs';
import { RedblackTreeNode, Color } from "./binarySearchTree/src/modules/redblackTreeNode.mjs";
// import _ from "lodash";

export class RedblackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }


    //向红黑树中插入节点
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
        //如果节点不为null，且有父节点，且父节点的颜色是红色，且自己的颜色不为为黑色(也就是红色)
        while(node && node.parent && node.parent.isRed() && node.color !== Color.BLACK){
            //此时已经违反了红黑树的规则，也就是一条路径上出现了
            //那此时我们还要根据其叔叔节点的颜色先判断是做旋转还是做color flip
            //我们需要判断父节点是指祖父节点的左侧还是右侧
            let parent = node.parent;
            const grandParent = parent.parent;
            if(grandParent && grandParent.left === parent){//我们知道如果两个指针指向的是一块内存，它们之间比较是为真的。
                const uncle = grandParent.right;
                if(uncle && uncle.color === Color.RED){
                    //做color flip
                    grandParent.color = Color.RED;
                    //颜色翻转的规则：红色的自己，黑色的父亲和叔叔节点，红色的祖父节点。
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    //将节点的引用指向它的祖父节点，因为此时我们插入节点位置直到它的祖父这棵树已经是合法的了，就没必要再一步步递归的向上检查了。
                    node = grandParent;
                }else{//如果uncle不存在，值为null的节点视作黑色节点，此时我们需要做旋转
                    if(node === parent.right){//此时我们就做一个RR左旋
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    this.rotationLL(grandParent);//LL向右的旋转
                    parent.color = Color.BLACK;
                    grandParent.color = Color.RED;
                    node = parent;
                }
            }else{
                //如果父节点是右侧节点
                const uncle = grandParent.left;
                if(uncle && uncle.color === Color.RED){//叔叔节点的颜色为红色,我们只需要做颜色翻转就行
                    // 这个是没问题的
                    grandParent.color = Color.RED;
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                }else{
                    if(node === parent.left){
                        this.rotationLL(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    //这里也没问题
                    this.rotationRR(grandParent);
                    parent.color = Color.BLACK;
                    grandParent.color = Color.RED;
                    node = parent;
                }
            }
            this.root.color = Color.BLACK;//保证根节点的颜色始终是黑色
        }
    }


    //红黑树的旋转
    rotationLL(node){
        const tmp = node.left;//temp既是uncle节点
        node.left = tmp.right;
        if(tmp.right && tmp.right.key){
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        }else{
            if(node === node.parent.left){
                node.parent.left = tmp;
            }else{
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }
    
    rotationRR(node){
        const tmp = node.right;
        node.right = tmp.left;
        if(tmp.left && tmp.left.key){
            tmp.left.parent = node; 
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        }else{
            if(node === node.parent.left){
                node.parent.left = tmp;
            }else{
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }


}