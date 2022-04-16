export const saveImage = async (name, chaptername, number)=> {

    let heroku = 'https://movilesp2.herokuapp.com/saveimage'
    let local = 'http://10.0.0.94:3000/saveimage'
          
    let info = { name: name, chaptername: chaptername, number: number };            
        
      const res = await fetch(heroku, {
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          })
          return res.json()
    }
  
  
export const findChapters = async(name)=> {
        
let heroku = 'https://movilesp2.herokuapp.com/findchapters'
let local = 'http://10.0.0.94:3000/findchapters'
let info = { name: name };  
    
    const res = await fetch(heroku, {
        method: 'post',
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }