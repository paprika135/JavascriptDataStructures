import {compare,defaultCompare} from '../utils/compare';
import { Node } from '../src/modules/node';

export default class BinarySearchTree{
    constructor(compareFn = defaultCompare){
        this.compareFn = compareFn;
        this.root = null;
    }

    //插入一个新的key
    insert(key){
        //如果二叉搜索树的根节点是空说明这个树是一个空树
        if(this.root ==  null){
            this.root = new Node(key);
        }else {
            //如果不是空树我们就需要递归的找到正确的插入位置再插入key，所以我们单独写一个方法。
            this.insertNode(this.root,key);
        }
    }

    insertNode(node,key){
        //如果要插入的key比根节点的值小说明要这个key要插入到二叉搜索树的左侧
        if(this.compareFn(key,node.key) === compare.LESS_THAN){
            if(node.left == null){
                node.left = new Node(key);
            }else{
                //如果左侧节点不为空，我们就需要递归的调用插入节点的方法。
                this.insertNode(node.left,key);
            }
        }else{
            if(node.right == null){
                node.right = new Node(key);
            }else{
                this.insertNode(node.right,key);
            }
        }
    }
    //查找一个键
    search(){}


    //中序遍历所有节点
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root,callback);
    }

    inOrderTraverseNode(node,callback){
        //如果传入的节点为空，说明已经遍历结束，此时停止递归调用。
        if(node != null){
            //先递归遍历左侧子树的节点，这一步递归调用不走完，是不会继续往下走的。
            this.inOrderTraverseNode(node.left,callback);
            //在遍历完左侧子树后才会走到这一步。
            callback(node.key);
            this.inOrderTraverseNode(node.right,callback);
        }
    }

    //先序遍历所有节点
    preOrderTraverse(callback){
        this.preOrderTraverse(this.root,callback)
    }

    preOrderTraverseNode(node,callback){
        if(node != null){
            //由于先序遍历是先访问根节点，所以我们进入if条件判断之后，直接打印节点值。
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }

    //后序遍历所有节点
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root,callback);
    }

    postOrderTraverseNode(node,callback){
        if(node != null){
            this.postOrderTraverseNode(node.left,callback);
            this.postOrderTraverseNode(node.right,callback);
            //后续遍历我们只需要最后打印根节点即可。
            callback(node.key);
        }
    }
    //返回树中的最小值/键
    min(){}
    //返回树中的最大值/键
    max(){}
    //从树中移除某个键
    remove(key){}
}