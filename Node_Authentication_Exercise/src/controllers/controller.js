const userService = require("../services/service");

module.exports.signup = async (req,res) =>{
    const response = await userService.signup(req.body);
    res.send(response);
}

module.exports.login = async (req,res) =>{
    const response = await userService.login(req.body);
    res.send(response);
}