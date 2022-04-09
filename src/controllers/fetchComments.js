export const saveComment = async (comment, iduser, avatar, chapterid, name)=> {

    let heroku = 'https://movilesp1.herokuapp.com/savecomment';
    let local = 'http://10.0.0.94:3000/savecomment';


    let info = {comment:comment, iduser:iduser, avatar:avatar, chapterid:chapterid, name:name};            
        
      const res = await fetch(local, {
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          })
          return res.json()

}



export const findComments = async(chapterid)=> {

    let info = {chapterid:chapterid}; 
    
    let heroku = 'https://movilesp1.herokuapp.com/findcomments'
    let local = 'http://10.0.0.94:3000/findcomments'
        
        const res = await fetch(local, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }

export const updateComment = async (commentid, comment)=> {

    let heroku = 'https://movilesp1.herokuapp.com/updatecomment';
    let local = 'http://10.0.0.94:3000/updatecomment';


    let info = {commentid:commentid, comment:comment};            
        
        const res = await fetch(local, {
            method: 'put', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()

}





export const deleteComment = async (commentid)=> {

    let heroku = 'https://movilesp1.herokuapp.com/deletecomment'
    let local = 'http://10.0.0.94:3000/deletecomment'
            
    let info = { commentid: commentid };            
        
        const res = await fetch(local, {
            method: 'delete', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }