import { Compare,compare, defaultCompare } from '../utils/compare.mjs';
import { Node } from './modules/node.mjs';

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }

    //插入一个新的key
    insert(key) {
        //如果二叉搜索树的根节点是空说明这个树是一个空树
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            //如果不是空树我们就需要递归的找到正确的插入位置再插入key，所以我们单独写一个方法。
            this.insertNode(this.root, key);
        }
    }

    insertNode(node, key) {
        //如果要插入的key比根节点的值小说明要这个key要插入到二叉搜索树的左侧
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                //如果左侧节点不为空，我们就需要递归的调用插入节点的方法。
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    //中序遍历所有节点
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    inOrderTraverseNode(node, callback) {
        //如果传入的节点为空，说明已经遍历结束，此时停止递归调用。
        if (node != null) {
            //先递归遍历左侧子树的节点，这一步递归调用不走完，是不会继续往下走的。
            this.inOrderTraverseNode(node.left, callback);
            //在遍历完左侧子树后才会走到这一步。
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    //先序遍历所有节点
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    preOrderTraverseNode(node, callback) {
        if (node != null) {
            //由于先序遍历是先访问根节点，所以我们进入if条件判断之后，直接打印节点值。
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    //后序遍历所有节点
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }

    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            //后续遍历我们只需要最后打印根节点即可。
            callback(node.key);
        }
    }

    //返回树中的最小值/键
    min() {
        /*
            访问者模式，我们不能直接将操作数据的方法暴露而用户
            ,但js中没有private修饰符，这是属于一种自欺欺人的做法。
            后续我们可以通过一些特殊的方式在es6的类中建立私有属性或方法。
        */
        return this.minNode(this.root);
    }
    minNode(node){
        let current = node;
        //递归的查找最左侧的节点
        //while的停止条件是current不为空，但是它的左节点为空
        while(current != null && current.left !=null){
            current = current.left;
        }
        return current;
    }
    //返回树中的最大值/键
    max() { 
        return this.maxNode(this.root);
    }
    maxNode(node){
        let current = node;
        while(current != null && current.right != null){
            current = current.right;
        }
        return current;
    }
    //查找一个键,查找特定值得节点
    search(key) {
        return this.searchNode(this.root,key);
    }

    searchNode(node,key){
        if(node == null){
            //如果是空树，就不存在找特定值节点这一回事。当然也有可能是递归到最后，还是没有找到值为key的节点。
            return false;
        }
        //第一次进入这个判断时传入的是根节点，判断这个key是在根节点的左侧还是右侧，后续还是延续这个递归的进行判断。
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            //就是不停的把左侧的值传进去就行
            return this.searchNode(node.left,key);
        }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN){
            return this.searchNode(node.right,key);
        }else{
            //如果两个条件都不满足说明已经找到了
            return true;
        }
    }
    //从树中移除某个键
    remove(key) {}
}