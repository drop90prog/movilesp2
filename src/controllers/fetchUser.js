export const signIn = async (email, password)=> {

  let heroku = 'https://movilesp1.herokuapp.com/signin'
  let local = 'http://10.0.0.94:3000/signin'    
        
  let info = { email: email, password: password };            
      
    const res = await fetch(local, {
        method: 'post', 
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
  }

   
export const signUp = (name, email, password, admin)=> {  
  
  let heroku = 'https://movilesp1.herokuapp.com/signup'
  let local = 'http://10.0.0.94:3000/signup'


    let account = {name: name, email: email, password: password, admin:admin};            
    
    fetch(local, {
      method: 'post', 
      body: JSON.stringify(account), 
      headers:{            
          'Content-Type': 'application/json'
      }
      }).then(res =>{ 
      
        if(res.status==200) {          
          
          res.json().then((data) => {alert(data.message)});     

        }else res.json().then((data) => {alert(data.error)});
      
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log(response));
    

  }