
let heroku = 'https://movilesp1.herokuapp.com/signup'
let local = 'http://10.0.0.94:3000/signup'

export const fetchSignUp = (name, email, password)=> {    
        
    let account = {name: name, email: email, password: password};            
    
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

