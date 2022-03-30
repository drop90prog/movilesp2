export const saveChapter = async (mangaid, chaptername, number)=> {

    let heroku = 'https://movilesp1.herokuapp.com/savechapter'
    let local = 'http://10.0.0.94:3000/savechapter'
          

    if(chaptername=='')chaptername='(no name)'

    let info = { mangaid: mangaid, chaptername: chaptername, number: number };            
        
      const res = await fetch(local, {
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          })
          return res.json()


    }
  
  
export const findChapters = async(mangaid)=> {
        
    let heroku = 'https://movilesp1.herokuapp.com/findchapters'
    let local = 'http://10.0.0.94:3000/findchapters'
    let info = { mangaid: mangaid };  
    
    const res = await fetch(local, {
        method: 'post',
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }


  