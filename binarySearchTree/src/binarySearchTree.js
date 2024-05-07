import {compare,defaultCompare} from '../utils/compare';
import { Node } from '../src/modules/node';

export default class BinarySearchTree{
    constructor(compareFn = defaultCompare){
        this.compareFn = compareFn;
        this.root = null;
    }

    //插入一个新的建
    insert(){}
    //查找一个键
    search(){}
    //中序遍历所有节点
    inOrderTraverse(){}
    //先序遍历所有节点
    preOrderTraverse(){}
    //后序遍历所有节点
    postOrderTraverse(){}
    //返回树中的最小值/键
    min(){}
    //返回树中的最大值/键
    max(){}
    //从树中移除某个键
    remove(key){}
}