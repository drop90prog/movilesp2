export const saveManga = async (name, poster)=> {

  let heroku = 'https://movilesp1.herokuapp.com/savemanga'
  let local = 'http://10.0.0.94:3000/savemanga'

  if(!poster)poster='https://directory.usacarry.com/wp-content/uploads/2021/06/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpeg'
        
  let info = { name: name, poster:poster };            
      
    const res = await fetch(local, {
        method: 'post', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }


export const findMangas = async()=> {
        
  let heroku = 'https://movilesp1.herokuapp.com/findmangas'
  let local = 'http://10.0.0.94:3000/findmangas'
      
    const res = await fetch(local, {
        method: 'get'
        })
        return res.json()
  }


export const updateManga = async(mangaid, newname)=> {

  let info = { mangaid: mangaid, newname: newname };  
      
  let heroku = 'https://movilesp1.herokuapp.com/updatemanga'
  let local = 'http://10.0.0.94:3000/updatemanga'
      
  const res = await fetch(local, {
    method: 'post', 
    body: JSON.stringify(info), 
    headers:{            
        'Content-Type': 'application/json'
    }
    })
    return res.json()
  }



export const deleteManga = async (mangaid)=> {

  let heroku = 'https://movilesp1.herokuapp.com/deletemanga'
  let local = 'http://10.0.0.94:3000/deletemanga'
       
  let info = { mangaid: mangaid };            
      
    const res = await fetch(local, {
        method: 'delete', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }