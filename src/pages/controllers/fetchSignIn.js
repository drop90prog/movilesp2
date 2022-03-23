let heroku = 'https://movilesp1.herokuapp.com/signin'
let local = 'http://10.0.0.94:3000/signin'



export const fetchSignIn = async (email, password, navigation)=> {
        
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