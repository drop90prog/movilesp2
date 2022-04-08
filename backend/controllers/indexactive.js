
const Indexactive = require('../models/indexactive')


function saveIndexActive (req, res) {



    Indexactive.findOne({
        iduser: req.body.iduser, 
        chapterid: req.body.chapterid,      
    }, (err,result)=>{
        if(result){
            return res.status(404).send({message:"index already set"})
        }
        if(!result){
           
            const indexactive = new Indexactive({
                iduser: req.body.iduser,
                chapterid: req.body.chapterid,
                indexactive: req.body.indexactive,
            })

            indexactive.save((err)=>{
                if(err)return res.status(500).send({message:`Error ${err}`})
                return res.status(200).send({message:"index 0 added"})
            })

        }

    })

  };


  function findIndexActive (req, res) {


    Indexactive.findOne({
        iduser: req.body.iduser, 
        chapterid: req.body.chapterid,
    }, (err,result)=>{
        if(result){
            return res.status(200).send({result})
        }
        if(!result){
            return res.status(404).send({message:"no index found"})
        }
    })
  };


function deleteImage (req,res) {
      

    Image.findByIdAndDelete({_id: req.body.imageid} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}



function updateIndexActive (req, res) {



    Indexactive.findOne({
        iduser: req.body.iduser, 
        chapterid: req.body.chapterid,
    }, (err,result)=>{
        if(result){
           
            Indexactive.findByIdAndUpdate(result._id,{"indexactive": req.body.indexactive }, (err, result)=>{
            if(result)res.status(200).send({message:`index active updated to: ${req.body.indexactive}`})
            if(err)return res.status(500).send({message: err}) 
            })       

        }
        if(!result){
           
            console.log("not found")

        }

    })

  };






module.exports = {
    saveIndexActive,
    findIndexActive,
    updateIndexActive,

}