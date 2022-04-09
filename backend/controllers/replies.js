const Reply = require('../models/replies')


function saveReply(req, res){     

    const reply = new Reply({
        commentid: req.body.commentid,
        chapterid: req.body.chapterid,
        iduser: req.body.iduser,
        name: req.body.name,
        reply: req.body.reply,
    })        
    reply.save((err)=>{
        if(err)return res.status(500).send({message:`Error ${err}`})
        return res.status(200).send({message:"done"})
    })

}//function saveComment


function findReplies(req, res){
    
    Reply.find({chapterid: req.body.chapterid}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })

        if(result.length==0){
            return res.status(404).send({message:"no replies yet"})
        } 

        if(result.length>0){
            return res.status(200).send({result:result})
        } 
        
    })//Reply.find
}



function deleteReply (req,res) {
   

    Reply.findByIdAndDelete({_id: req.body.replyid} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}





module.exports = {
    saveReply,
    findReplies,
    deleteReply,
}



