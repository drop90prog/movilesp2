export const saveFollow = async (iduser, idmanga)=> {

    let heroku = 'https://movilesp1.herokuapp.com/savefollow';
    let local = 'http://10.0.0.94:3000/savefollow';


    let info = {iduser:iduser, idmanga:idmanga};            
        
      const res = await fetch(local, {
          method: 'post', 
          body: JSON.stringify(info), 
          headers:{            
              'Content-Type': 'application/json'
          }
          })
          return res.json()

}


export const findFollow = async(iduser, idmanga)=> {

    let info = {iduser:iduser, idmanga:idmanga}; 
    
    let heroku = 'https://movilesp1.herokuapp.com/findfollow'
    let local = 'http://10.0.0.94:3000/findfollow'
        
        const res = await fetch(local, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }




export const deleteFollow = async (iduser, idmanga)=> {

    let heroku = 'https://movilesp1.herokuapp.com/deletefollow'
    let local = 'http://10.0.0.94:3000/deletefollow'
            
    let info = {iduser:iduser, idmanga:idmanga};            

        const res = await fetch(local, {
            method: 'delete', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }