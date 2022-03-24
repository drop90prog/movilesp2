
const Manga = require('../models/manga')




function saveManga (req, res) {
   

    const manga = new Manga({
        name: req.body.name,
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

        if(result.length>0){ console.log(">0")
            return res.status(200).send({content:result, message:"found them"})
        } 

        if(result.length==0){console.log("==0")
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
    saveManga,
    findMangas,
}