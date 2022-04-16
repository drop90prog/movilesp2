export const saveFollow = async (iduser, tokennp, idmanga, name)=> {

    let heroku = 'https://movilesp2.herokuapp.com/savefollow';
    let local = 'http://10.0.0.94:3000/savefollow';


    let info = {iduser:iduser, tokennp:tokennp, idmanga:idmanga, name:name};            
        
      const res = await fetch(heroku, {
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
    
    let heroku = 'https://movilesp2.herokuapp.com/findfollow'
    let local = 'http://10.0.0.94:3000/findfollow'
        
        const res = await fetch(heroku, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }

    //grupo de personas que siguen un manga especifico
export const findFollowsManga = async(idmanga)=> {

    let info = {idmanga:idmanga}; 
    
    let heroku = 'https://movilesp2.herokuapp.com/findfollowsmanga'
    let local = 'http://10.0.0.94:3000/findfollowsmanga'
        
        const res = await fetch(heroku, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }

    //mangas seguidos por alguien especifico
export const findFollowsMangas = async(iduser)=> {

    let info = {iduser:iduser}; 
    
    let heroku = 'https://movilesp2.herokuapp.com/findfollowsmangas'
    let local = 'http://10.0.0.94:3000/findfollowsmangas'
        
        const res = await fetch(heroku, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }




export const deleteFollow = async (iduser, idmanga)=> {

    let heroku = 'https://movilesp2.herokuapp.com/deletefollow'
    let local = 'http://10.0.0.94:3000/deletefollow'
            
    let info = {iduser:iduser, idmanga:idmanga};            

        const res = await fetch(heroku, {
            method: 'delete', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }