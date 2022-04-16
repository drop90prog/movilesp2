module.exports = {
    port: process.env.PORT || 3000,  
/*     db: process.env.MONGODB || 'mongodb://localhost:27017/dbname',   */  
    
    db: process.env.MONGODB || 'mongodb+srv://moviles:moviles@movilesp2.tpprk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',



    
    SECRET_TOKEN: 'topocho'
}