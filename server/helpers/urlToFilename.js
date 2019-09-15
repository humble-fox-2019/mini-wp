function toName(url){
    let change = url.split('/')
    let filename= change[change.length-1]
    return filename
 }
 module.exports=toName