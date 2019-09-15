const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: 'keyfile.json'
});


function safeSearch(req, res, next) {
    if (req.file) {
        const fileName = req.file.buffer
        client
            .safeSearchDetection(fileName)
            .then(result => {
                const detections = result[0].safeSearchAnnotation;
                let flag = true
                for (let i in detections) {
                    if (detections[i] !== 'VERY_UNLIKELY') {
                        flag = false
                    }
                }
                if (flag) {
                    next()
                } else {
                    next({
                        httpStatus: 400,
                        message: "Please Upload Photos that doesn't contains Adult, Medical, Spoof, Violence, and Racy contents"
                    })
                }

            }).catch(next)
    } else {
        next()
    }
}

module.exports = safeSearch