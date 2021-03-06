const Comment = require('../models/comments')


function saveComment(req, res){     

    const komentario = new Comment({
        comment: req.body.comment,
        iduser: req.body.iduser,
        avatar: req.body.avatar,
        chapterid: req.body.chapterid,
        name: req.body.name
    })        
    komentario.save((err)=>{
        if(err)return res.status(500).send({message:`Error ${err}`})
        return res.status(200).send({message:"done"})
    })

}//function saveComment


function findComments(req, res){
    
    Comment.find({chapterid: req.body.chapterid}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })

        if(result.length==0){
            return res.status(404).send({message:"no comments yet"})
        } 

        if(result.length>0){
            return res.status(200).send({result:result})
        } 
        
    })//Comment.find
}


function updateComment (req, res) {     
        
    Comment.findByIdAndUpdate(req.body.commentid,{comment: req.body.comment}, (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)return res.status(200).send({message:'Successfully updated'})
    })
     
 }//updateComment


function deleteComment (req,res) {
   

    Comment.findByIdAndDelete({_id: req.body.commentid} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}





module.exports = {
    saveComment,
    findComments,
    updateComment,
    deleteComment,
}



