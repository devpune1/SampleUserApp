
document.addEventListener('ready',function(event){
    
  var page = event.target;
  
  if (page.id === 'login') {
    
    page.querySelector('#login').onclick = function() {
      alert();
     verifyDetails();
    };
  } 
    
    
}



);
    

