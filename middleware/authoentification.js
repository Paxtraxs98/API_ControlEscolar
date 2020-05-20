const jwt = require("jwt-simple");
const moment = require("moment");
const secretWordToken = "School2020"

exports.ensureAuth = function(req,res,next)
{
    if(!req.headers.authorization)
    {
        return res.status(403).send({message:"La Peticion No es Autorizada"})
    }
    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token,secretWordToken);
        if(payload.exp <= moment.unix())
        {
            return res.status(401).send({message:"El Token a Expirado"});
        }
    } catch (error) {
        return res.status(404).send({message:"El token no es valido"});
    }
    req.user = payload
    next();
}