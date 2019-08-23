const Dev = require("../model/Dev");

module.exports = {
    async store(req, res){

        const {devId} = req.params;
        const {user} = req.headers;//pega os dados enviados pelo header

        const loggedDev = await Dev.findById(user);//quem está dando o like
        const targetDev = await Dev.findById(devId);//quem está recebendo o like

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if(targetDev.likes.includes(loggedDev._id)){//verifica se o id ja sofreu like
            console.log("Deu match");
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};