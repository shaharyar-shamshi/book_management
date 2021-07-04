
const tools = require('../lib/tools')

function validate(schema){
    return async(req, res, next) =>{
        try {
            const results = await schema.validate(req.body)
            if (results.error){
                return res.json(await tools.getResult(422, 
                    results.error.details[0]['message'].toString().replace(/["_\\]/gi, ' ').replace("  ", " ").trim()))
            } else{
                req.body = results.value
                next();
            }

        } catch (error) {
            return res.json(await tools.getResult(500, 'Something went wrong', '', ''));
        }
    }
}

module.exports = validate