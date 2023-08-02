let nPages = 1;
let paginate ={
    size:24,
    page:1
};

const controls_paginate ={
    previous:()=>{
        if(paginate.page < 0){
            paginate.page = 1;
        }
        if(paginate.page > 1){
            paginate.page --;
        }
    },
    next:()=>{
        if(paginate.page >= nPages){
            paginate.page = nPages;
        };
        if(paginate.page < nPages){
            paginate.page ++;
        };
    },
};