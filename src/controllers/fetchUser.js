export const signIn = async (email, password)=> {

  let heroku = 'https://movilesp2.herokuapp.com/signin'
  let local = 'http://10.0.0.94:3000/signin'    
        
  let info = { email: email, password: password };            
      
    const res = await fetch(heroku, {
        method: 'post', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }

   
export const signUp = async(name, email, password, admin)=> {  
  
  let heroku = 'https://movilesp2.herokuapp.com/signup'
  let local = 'http://10.0.0.94:3000/signup'


    let account = {name:name, email:email, password:password, admin:admin};            
    
    const res = await fetch(heroku, {
      method: 'post', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      })
      
      return res
    

  }



export const updateUser = async (name, email, password, iduser, poster)=> {  

  let heroku = 'https://movilesp2.herokuapp.com/updateuser'
  let local = 'http://10.0.0.94:3000/updateuser'

  if(!name && !email && !password && !poster){
    alert('Please fill the fields')
  }else{
    let account = {name:name, email:email, password:password, iduser:iduser, poster:poster};            
    
   const res =await fetch(heroku, {
      method: 'put', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      })
      return res
  }

    
    

  }