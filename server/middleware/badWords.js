const badWords = require("bad-words")
const filter = new badWords()

const kataKotor = ['bajingan','titit','Perek', 'Pecun', 'kontol', 'memek', 'ngentot', 'ngewe', 'jembut','bangsat', 'jancuk', 'kampret', 'goblok']

filter.addWords(...kataKotor);

function filterBadWords(req,res,next){
    
    let content = req.body.content
    content = filter.clean(content)
    req.body.content = content
    next()
}

module.exports = filterBadWords

// console.log(filter.clean(word))
