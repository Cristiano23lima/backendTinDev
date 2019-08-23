const Dev = require("../model/Dev");

module.exports = {
    async store(req, res){

        const {devId} = req.params;
        const {user} = req.headers;//pega os dados enviados pelo header

        const loggedDev = await Dev.findById(user);//quem está dando o dislike
        const targetDev = await Dev.findById(devId);//quem está recebendo o dislike

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists' });
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};