export const saveImage = async (chapterid, url)=> {

let heroku = 'https://movilesp1.herokuapp.com/saveimage'
let local = 'http://10.0.0.94:3000/saveimage'
       
let info = { chapterid:chapterid, url:url };            
    
    const res = await fetch(local, {
        method: 'post', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
}


export const findImages = async(chapterid)=> {
        
    let heroku = 'https://movilesp1.herokuapp.com/findimages'
    let local = 'http://10.0.0.94:3000/findimages'
    let info = { chapterid: chapterid };  
    
    const res = await fetch(local, {
        method: 'post',
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }