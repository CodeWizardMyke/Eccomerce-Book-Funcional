function emptyValuesRemove(data){
   return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''))
}
module.exports = emptyValuesRemove;