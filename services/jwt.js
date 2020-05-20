const jwt = require("jwt-simple");
const moment = require("moment");
const secretWordToken = "School2020"

exports.createtoken = function(user)
{
    const payload = {
        id:user._id,
        name: user.name,
        surnameP: user.surnameP,
        surnameM: user.surnameM,
        email:user.email,
        typeOfUsers : user.typeOfUsers,
        iat: moment().unix(),
        exp: moment().add(1,"day").unix()
    }    
    return jwt.encode(payload,secretWordToken);
}