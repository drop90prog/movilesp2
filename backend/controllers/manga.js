
const Manga = require('../models/manga')




function saveManga (req, res) {
   

    const manga = new Manga({
        name: req.body.name,
        poster: req.body.poster,
        creatorid: req.body.creatorid
    })

    manga.save((err)=>{
        if(err)res.status(500).send({message:`Error ${err}`})
        res.status(200).send({message:"new manga added"})
    })    
  };


  function findMangas(req, res){
    Manga.find({}, (err,result)=>{

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



function updateManga (req,res) {
    
    Manga.findByIdAndUpdate(req.body.mangaid,{name:req.body.newname}, (err, result)=>{
        if(err)return res.status(500).send({message: err})
        if(result)return res.status(200).send({message:'Successfully updated'})
       
    })
    
    
}



function deleteManga (req,res) {
      

    Manga.findByIdAndDelete({_id: req.body.mangaid} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}



module.exports = {
    saveManga,
    findMangas,
    updateManga,
    deleteManga,
}