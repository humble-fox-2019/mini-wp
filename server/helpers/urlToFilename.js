function toName(url){
   let halo = url.split('/')
   let filename= halo[halo.length-1]
   return filename

}
module.exports=toName