const axios = require("axios");
const Dev = require("../model/Dev");

module.exports = {
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
              { _id: { $ne: user }} ,//vai verificar se o id não é o mesmo do usuario logado 
              { _id: { $nin: loggedDev.likes }}, //verifica se o usuario já nao sofreu like pelo usuario logado
              { _id: { $nin: loggedDev.dislikes }}, //verifica se o usuario não sofreu dislike pelo usuario logado
            ],
        })

        return res.json(users);
    },
    async store(req, res){
        const {username} = req.body;

        const userExiste = await Dev.findOne({user: username});

        if(userExiste){
            return res.json(userExiste);
        }
        
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const {name, bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
}