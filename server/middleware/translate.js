const translate = require('@vitalets/google-translate-api');


function translateToIna(req,res,next){

    let content = req.body.content
    let title = req.body.title

    translate(content, {to: 'id'}).then(res => {
    let languageFrom = res.from.language.iso

    if(languageFrom=="id"){
        console.log("ini bahasa indonesia")
        next()
    }
    else{
        
        req.body.content = res.text
        let tags= req.body.tags
        tags += ",translated"
        req.body.tags = tags
        next()
    }
    // console.log(res.text);
    //=> I speak English
    // console.log(res.from.language.iso);
    //=> nl
}).catch(next);

}
// console.log(translateToIna())
module.exports = translateToIna
