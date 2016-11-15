

document.addEventListener('init', function(event) {


  var page = event.target;

  if (page.id === 'login') {

    page.querySelector('#register').onclick = function() {



      document.querySelector('#myNavigator').pushPage('registration.html', {data: {title: 'Register'}});





    };

     page.querySelector('#login').onclick = function() {

       verifyDetails();

    };

  }

  else{


    if (page.id === 'register') {

  //  page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }

}
});





function verifyDetails(){


 var userData = [] ;

var db = {};
var numberOfRecords = 0;

var items = 0 ;

var userName = "";

var userPassword = "";

var count = 0;

var decryptedName = "";

var    userData = "";

var name ="";

  var text= ["User ID ","User Password"];





 var db = getConnectionObject("records");




try {

if( checkTextBox("logininput",text) ){


   userData = getData("logininput");

     userName = userData[0];
     userPassword = userData[1];


db.executeSql('Select * from record').then(function(records){







  for(items = 0 ; items < records.length ; items++){






   name = records[items].key;
   userName = generateHashKey(userName + userPassword);

 console.log(name);
 console.log(userName);

if(name.length){


       if(validateCredential( userName ,name)){


  sessionStorage.setItem("randomID",generateHashKey(userPassword));

  sessionStorage.setItem("userDatabaseName",generateHashKey(userPassword));

       document.querySelector('#myNavigator').pushPage('mainmodule.html', {data: {title: 'Main Application'}});

              count = count + 1;



          }

      }




  }


  if(count == 0){


ons.notification.alert({title :"Login Error" ,message: 'UserName or Password Invalid', modifier:'cta'});
  }



});

}


}

catch(err) {

   alert(err.message);
}







}





   function validateCredential(userTexBoxName,userName){

    if(userName === userTexBoxName){


        return true;

    }
    else{

        return false;
    }









}



   function checkTextBox(textBoxID,text){


    var flag=0;
    var object = document.getElementsByClassName(textBoxID);



    for(var items =0 ;items<object.length;items++){



        if( object[items].value == "" ){

            ons.createPopover('popover.html').then(function(popover) {

                  document.getElementById('errorpage').style.color ='red'
                 document.getElementById('errorpage').innerHTML = text[items]+" "+"Cannot Be Empty" ;
                console.log(popover)
              document.getElementById('popover').show(document.getElementsByClassName(textBoxID)[items]);


            });
          //document.getElementById('errorpage').innerHTML = text[items]+" "+"Cannot Be Empty" ;
          // document.getElementById('popover').show(document.getElementsByClassName(textBoxID)[items]);


            flag = 0;
           break


        }
        else{

            flag++;



        }



    }

  if(flag){


      return true;


  }
  else{


      return false;
  }







}
