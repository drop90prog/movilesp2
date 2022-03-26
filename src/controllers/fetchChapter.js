export const saveChapter = async (name, chaptername)=> {

    let heroku = 'https://movilesp1.herokuapp.com/savechapter'
    let local = 'http://10.0.0.94:3000/savechapter'
          
    let info = { name: name, chaptername: chaptername };            
        
      const res = await fetch(local, {
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          })
          return res.json()
    }
  
  
export const findChapters = async(name)=> {
        
let heroku = 'https://movilesp1.herokuapp.com/findchapters'
let local = 'http://10.0.0.94:3000/findchapters'
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