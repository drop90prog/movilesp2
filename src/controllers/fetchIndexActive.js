export const saveIndexActive = async (iduser, chapterid)=> {

    let heroku = 'https://movilesp1.herokuapp.com/saveindexactive'
    let local = 'http://10.0.0.94:3000/saveindexactive'
           
    let info = { iduser:iduser, chapterid:chapterid, indexactive:0 };            
        
        const res = await fetch(local, {
            method: 'post', 
            body: JSON.stringify(info), 
            headers:{            
                'Content-Type': 'application/json'
            }
            })
            return res.json()
    }
    
    
export const findIndexActive = async(iduser, chapterid)=> {
        
    let heroku = 'https://movilesp1.herokuapp.com/findindexactive';
    let local = 'http://10.0.0.94:3000/findindexactive';

    let info = { iduser:iduser, chapterid:chapterid };            
    
    const res = await fetch(local, {
        method: 'post',
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
    }


export const updateIndexActive = async(iduser, chapterid, indexactive)=> {
        
    let heroku = 'https://movilesp1.herokuapp.com/updateindexactive';
    let local = 'http://10.0.0.94:3000/updateindexactive';

    let info = { iduser:iduser, chapterid:chapterid, indexactive:indexactive };            
    
    const res = await fetch(local, {
        method: 'put',
        body: JSON.stringify(info), 
        headers:{            
            'Content-Type': 'application/json'
        }
        })
        return res.json()
    }