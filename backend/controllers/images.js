
const Image = require('../models/images')




function saveImage (req, res) {
   

    const image = new Image({
        chapterid: req.body.chapterid,
        url: req.body.url
    })

    image.save((err)=>{
        if(err)res.status(500).send({message:`Error ${err}`})
        res.status(200).send({message:"new manga added"})
    })    
  };


  function findImages(req, res){
      console.log(req.body)
    Image.find({chapterid: req.body.chapterid}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result.length>0){ 
            return res.status(200).send({content:result, message:"found them"})
        } 

        if(result.length==0){console.log("not found")
            return res.status(404).send({message:"not found"})
        } 
        
    })//Comment.find
}


function deleteImage (req,res) {
      

    Image.findByIdAndDelete({_id: req.body.imageid} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}






module.exports = {
    saveImage,
    findImages,
    deleteImage,
}