import BinarySearchTree from './binaryTree/src/binarySearchTree.mjs';
import { defaultCompare,Compare } from './binaryTree/utils/compare.mjs';
import { Node } from './binaryTree/src/modules/node.mjs';//导入节点类


const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

export class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);//调用父类的构造函数
        this.compareFn = compareFn;
        this.root = null;
    }

    //计算节点高度
    getNodeHeight(node) {
        /*
            如果没有字节点，就返回-1
            这样的话最后一计算高度就是0
        */
        if (node == null) {
            return -1;//没有子节点的树的高度是0
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }

    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    //向左的单旋转
    rotationRR(node) {
        const temp = node.right;
        node.right = temp.left;
        temp.left = node;
        return temp;
    }

    //向右的单旋转
    rotationLL(node) {
        const temp = node.left;
        node.left = temp.right;
        temp.right = node;
        return temp;
    }

    //向左的双旋转
    rotationLR(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    //向右的双旋转
    rotationRL(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    //访问者模式，向用户暴露插入节点的方法
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }

    //向avlTree中插入节点
    insertNode(node, key) {
        // 第一次传入的节点是根节点,递归到合适的位置就是插入节点的操作。
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            // 现在我们要做的就是找到适当的位置插入节点。
            node.left = this.insertNode(node.left,key);
        } else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN){
            node.right = this.insertNode(node.right,key);
        } else {
            return node;//既不大于也不小与就是相等，相等就是重复
        }

        //在将插入的节点return出去后，就会走到这个部分，这个部分就是用于做旋转的
        //获取节点的平衡因子
        const balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            //左侧不平衡就需要做向右的旋转
            //但是我们要搞清楚新插入的节点是插入到了左侧子节点的左侧还是右侧
            //如果是插入到了左侧，就只需要做一次向右的单旋转就够了，否则就需要做向右的双旋转
            if(this.compareFn(key,node.left.key) === Compare.LESS_THAN){
                node = this.rotationLL(node);
            }else{
                return node = this.rotationRL(node);
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            if(this.compareFn(key,node.right.key) === Compare.BIGGER_THAN){
                node = this.rotationRR(node);
            }else{
                return this.rotationLR(node);
            }
        }
        return node;
    }

    //由于我们先前在binary写过remove()和removeNode()方法，这里我们重写removeNode()就可以
    removeNode(node,key){
        //移除节点的逻辑与父类binaryTree一致
        node = super.removeNode(node,key);
        //删除节点后返回的node值有可能为null，这个根据删除的节点的类型有关
        if(node == null){
            return node;
        }
        //即使是删除后return node 为null，仍旧可以通过递归计算它的父节点的平衡因子，然后通过平衡因子判断具体要做什么操作
        const balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor  === BalanceFactor.UNBALANCED_LEFT){
            //左侧不平衡,要先判断左侧子树的是否平衡
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            if(balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft ===  BalanceFactor.SLIGHTLY_UNBALANCED_LEFT ){
                //此时不需要再对子树做向左的单旋转
                return this.rotationLL(node);
            }
            if(balanceFactorLeft === BalanceFactor.UNBALANCED_RIGHT){
                return this.rotationRL(node);
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            const balanceFactorRight = this.getBalanceFactor(node.right);
            if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationRR(node);
            }
            if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationLR(node);
            }
        }
        //不需要做旋转RL
        return node;
    }
}