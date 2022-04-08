
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
            console.log(`findIndexActive found it: ${result}`)

            return res.status(200).send({result})
        }
        if(!result){

 
            console.log(`findIndexActive not found it: ${req.body}`)

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

    let iduser = req.body.iduser;
    let chapterid =  req.body.chapterid;

    Indexactive.findOne({ iduser:iduser, chapterid:chapterid }, (err,result)=>{
        if(result){
           
            console.log(`updateIndexActive found it: ${result}`)

            let id = result._id
            let indexactive = req.body.indexactive

            Indexactive.findByIdAndUpdate(id,{"indexactive":indexactive }, (err, result)=>{
            if(result){
                //este result es el documente que estaba antes de actualizarlo
                res.status(200).send({message:`index active updated to: ${indexactive}`})
            }
            if(err)return res.status(500).send({message: err}) 
            })       

        }
        if(!result){
           
            console.log("updateIndexActive not found")
            console.log(req.body)

        }

    })

  };






module.exports = {
    saveIndexActive,
    findIndexActive,
    updateIndexActive,

}