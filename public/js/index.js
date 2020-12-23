function validate(){
    if(window.location.href.indexOf('/insert')){            
        if(document.forms[0].name.value.length <= 2){    
            alert('ERROR FIELD NAME REQUIRED');
            return false                
        }               
        if(document.forms[0].email.value.length <= 2){
            alert('ERROR FIELD EMAIL REQUIRED')
            return false
        }       
    }    
    if(window.location.pathname.includes('/update')){  
        console.log('hola')          
        if(document.forms[0].name.value.length <= 2){    
            alert('ERROR FIELD NAME REQUIRED');
            return false                
        }                         
    }  
    return true 
}

