const Compare = {
    LESS_THAN:-1,
    BIGGER_THAN:1 
};

export function compare(a,b){
    if(a < b){
        return -1;
    }
    if (a > b){
        return 1;
    }
    //a等于b
    return 0;
}


export function defaultCompare(a,b){
    if(a === b){
        return 0;
    }

    return a < b ? Compare.LESS_THAN : Compare.LESS_THAN;
}
