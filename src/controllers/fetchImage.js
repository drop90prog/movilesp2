export const saveImage = async (chapterid, url)=> {

let heroku = 'https://movilesp2.herokuapp.com/saveimage'
let local = 'http://10.0.0.94:3000/saveimage'
       
let info = { chapterid:chapterid, url:url };            
    
    const res = await fetch(heroku, {
        method: 'post', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
}


export const findImages = async(chapterid)=> {
        
    let heroku = 'https://movilesp2.herokuapp.com/findimages'
    let local = 'http://10.0.0.94:3000/findimages'
    let info = { chapterid: chapterid };  
    
    const res = await fetch(heroku, {
        method: 'post',
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }


export const deleteImage = async (imageid)=> {

let heroku = 'https://movilesp2.herokuapp.com/deleteimage'
let local = 'http://10.0.0.94:3000/deleteimage'
        
let info = { imageid:imageid };            
    
    const res = await fetch(heroku, {
        method: 'delete', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
}

