const limit_offset = (object) =>{
    let { size, page } = JSON.parse(object) ;
    let nSize,nPage

    nSize = Number(size);
    nPage = Number(page);
    
    return {limit:nSize, offset:nPage};
};

module.exports = limit_offset;