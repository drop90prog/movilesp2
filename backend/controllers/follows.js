const Follow = require('../models/follows')




function saveFollow(req, res){

    const follow = new Follow({
        iduser: req.body.iduser,
        tokennp: req.body.tokennp,
        idmanga: req.body.idmanga,
    })        
    follow.save((err)=>{
        if(err)return res.status(500).send({message:`Error ${err}`})
        return res.status(200).send({message:"Added to favorites"})
    })
        
}//function saveRating

             


function findFollow(req, res){

    //muestra el favorito de una pelicula especidifa(para saber si el user dio like a una
    //pelicula en particular)

    Follow.find({iduser: req.body.iduser, idmanga: req.body.idmanga}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  
        if(result.length==0){
        return res.status(404).send({message:"not found"})
        }

        if(result.length>0){ 
            return res.status(200).send({status:200})
        }

        
    })//Rating.find
}


function findFollowsManga(req, res){



    Follow.find({idmanga: req.body.idmanga}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  
        if(result.length==0){
        return res.status(404).send({message:"not found"})
        }

        if(result.length>0){ 
            return res.status(200).send({result:result})
        }

        
    })//Rating.find
}





function find5LastRatings(req, res){

    Favorites.find({iduser: req.body.iduser}, (err,result)=>{

        if(err)return res.status(404).send({
            message:'errorrrrr'            
        })  

        if(result){
            return res.status(200).send({resultado:result})
        } 
        
    })//Rating.find
}


function deleteFollow (req,res) {
    console.log(req.body)   

    Follow.findOneAndDelete({iduser: req.body.iduser, idmanga:req.body.idmanga} , (err, result)=>{
        if(err)return res.status(500).send({message: err}) 
        if(result)res.status(200).send({message:'Successfully deleted'})
    })    
}




module.exports = {
    saveFollow,
    findFollow,
    findFollowsManga,
    deleteFollow,
    
}



