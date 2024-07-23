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
    remove(key) {
        this.root = this.removeNode(this.root,key);
    }

    removeNode(node,key){
        //如果是空节点，我们就不用找了，因为要么是空树，要么就是没找到。
        if(node == null){
            return null;
        }//如果要删除的节点的key值小于根节点，我们就去树的左侧去找这个节点
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            //递归的调用本方法，将左侧的节点和key传入。
            node.left = this.removeNode(node.left,key);
            //递归的调用，就说明如果上面递归调用的函数不走完或者说没有return值的话，最终是不会走到这里的。
            return node;
        }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN){
            node.right = this.removeNode(node.right,key);
            return node;
        }else{
            //如果上面的条件都不满足了，说明我们已经找到要删除的节点。也就是key等于node.key
            //此时我们来完成删除操作
            //我们先来处理如果要删除的节点是一个叶子节点（叶子节点就是它没有任何的子节点），这种情况最好处理。
            if(node.left == null && node.right == null){
                //将找到的节点置空就行了
                node = null;
                //停止递归
                return node;
            }
            //当我们找的节点只有一侧有节点的话
            if(node.left == null){
                //将node的指针指向它的右侧子节点，原来的那个node对象在内存也就没有了指针引用它，所以它会被v8的垃圾回收机制给回收。
                node = node.right;
                return node;
            }else if(node.right == null){
                node = node.left;
                return node;
            }
            //要删除的节点两侧都有节点
            //找到要删除节点右侧子树的最小值
            const tempAux = this.minNode(node.right);
            node.key = tempAux.key;
            node.right = this.removeNode(node.right,tempAux.key);
            return node;
        }
    }


}