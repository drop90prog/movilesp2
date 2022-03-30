
const Chapters = require('../models/chapters')




function saveChapter (req, res) {

    const savealo = async()=>{
        await Chapters.find({mangaid: req.body.mangaid, number: req.body.number}, (err, result)=> {
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
    }//savealo
   savealo() 
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