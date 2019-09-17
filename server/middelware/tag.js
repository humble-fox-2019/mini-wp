const tag = require('../models/tag')
module.exports = async function addTag (req,res,next){
    if(!req.body.tagList ){
        return next()
    }
    let tags = req.body.tagList.split(',')
    let result = []
    console.log(tags , ' MOST IMPORTANT !!!')
    for(let i in tags){
       await tag.findOneAndUpdate({
            name : tags[i]
        },{
            $set : {
                name : tags[i]
            }
        },{  new: true, runValidators: true, upsert: true  })
        .then(data=>{
            result.push(data)
            console.log(data)
        })
        .catch(next)
    }
    req.body.tempTag = result
    next()
}