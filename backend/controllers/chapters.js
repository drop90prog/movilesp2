
const Chapters = require('../models/chapters')




function saveChapter (req, res) {


        Chapters.find({mangaid: req.body.mangaid, number: req.body.number}, (err, result)=> {
            if(result.length>0)return res.status(404).send({message:"Duplicated"})
            if(err)return res.status(500).send({message:`Error ${err}`})            
            
            const chapter = new Chapters({
                mangaid: req.body.mangaid,
                chaptername: req.body.chaptername,
                number: req.body.number
            })
        
            chapter.save((err)=>{
                if(err)return res.status(500).send({message:`Error ${err}`})
                return res.status(200).send({message:"new chapter added"})
            })  
            
        })//findone


  };



  function findChapters(req, res){
    Chapters.find({mangaid: req.body.mangaid}, (err,result)=>{

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


function updateChapter (req,res) {
    
    Chapters.findByIdAndUpdate(req.body.chapterid,{chaptername:req.body.newname}, (err, result)=>{
        if(err)return res.status(500).send({message: err})
        if(result)return res.status(200).send({message:'Successfully updated'})
       
    })
    
    
}



function deleteChapter (req,res) {
      

    Chapters.findByIdAndDelete({_id: req.body.chapterid} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}











module.exports = {
    saveChapter,
    findChapters,
    updateChapter,
    deleteChapter,
}