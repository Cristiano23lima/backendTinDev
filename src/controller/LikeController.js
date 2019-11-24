const Dev = require("../model/Dev");

module.exports = {
    async store(req, res){
        console.log(req.io, req.connectedUsers);

        const {devId} = req.params;
        const {user} = req.headers;//pega os dados enviados pelo header

        const loggedDev = await Dev.findById(user);//quem está dando o like
        const targetDev = await Dev.findById(devId);//quem está recebendo o like

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if(targetDev.likes.includes(loggedDev._id)){//verifica se o id ja sofreu like
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);//estou avisando que o usuario logado deu um match no targetDev
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);//estou avisando que o target logado deu match com o loggedDev
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};