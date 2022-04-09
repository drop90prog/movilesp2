export const saveReply = async (commentid, chapterid, iduser, name, reply)=> {



    let heroku = 'https://movilesp1.herokuapp.com/savereply';
    let local = 'http://10.0.0.94:3000/savereply';


    let info = {commentid:commentid, chapterid:chapterid, iduser:iduser, name:name, reply:reply};    
            
        
      const res = await fetch(local, {
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          })
          return res.json()

}



export const findReplies = async(chapterid)=> {

    let info = {chapterid:chapterid}; 
    
    let heroku = 'https://movilesp1.herokuapp.com/findreplies'
    let local = 'http://10.0.0.94:3000/findreplies'
        
        const res = await fetch(local, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }



export const deleteReply = async (replyid)=> {

    let heroku = 'https://movilesp1.herokuapp.com/deletereply'
    let local = 'http://10.0.0.94:3000/deletereply'
            
    let info = { replyid: replyid };            
        
        const res = await fetch(local, {
            method: 'delete', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }