import { Node } from "./node.mjs";

export const Color = {
    RED:"red",
    BLACK:"black"
}

export class RedblackTreeNode extends Node {
    constructor(key){
        super(key);
        this.key = key;
        this.color = Color.RED;//默认插入的节点颜色为红色
        this.parent = null;//用于记录插入节点的父节点
    }

    isRed(){
        return this.color === Color.RED;
    }
}