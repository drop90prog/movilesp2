
const Chapters = require('../models/chapters')




function saveChapter (req, res) {
   

    const chapter = new Chapters({
        name: req.body.name,
        chaptername: req.body.chaptername,
    })

    chapter.save((err)=>{
        if(err)res.status(500).send({message:`Error ${err}`})
        res.status(200).send({message:"new chapter added"})
    })    
  };




  function findChapters(req, res){
    Chapters.find({name: req.body.name}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result.length>0){
            return res.status(200).send({content:result, message:"found them"})
        } 

        if(result.length==0){
            return res.status(404).send({message:"not found"})
        } 
        
    })//Comment.find
}



function deleteImage (req,res) {
    console.log(req.body.name)
    Imagee.findOneAndDelete({filename:req.body.name}, (err)=>{
        if(err)return res.status(500).send({message: err}) 
        return res.status(200).send({message:'Successfully deleted'})
    })
    
}



module.exports = {
    saveChapter,
    findChapters,
}