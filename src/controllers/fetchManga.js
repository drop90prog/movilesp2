export const saveManga = async (name)=> {

  let heroku = 'https://movilesp1.herokuapp.com/savemanga'
  let local = 'http://10.0.0.94:3000/savemanga'
        
  let info = { name: name };            
      
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