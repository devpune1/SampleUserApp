// Enable change events for changes in the same browser window

function load(){


RemoteStorage.config.changeEvents.window = false;

// Claim read/write access for the /myfavoritedrinks category
remoteStorage.access.claim('bicSoft','rw');

// Display the RS connect widget
remoteStorage.displayWidget();

remoteStorage.bicSoft.init();

remoteStorage.bicSoft.getUserData(function(transactions){

for(var id in transactions){



conseole.log("here",id)
    removeDuplicate(transactions[id]);


  }


});



}


function removeDuplicate(object){

   console.log(object);
    var numberOfItem = null;
  var userData = {};
  var flag = false;
  var userEncryptionKey = null;
  var count = 0;
  var countArray = [] ;
  var userName = [];
  var dataItem = [];

  var dataSource = [];
   var userArray = getInputId();
 var db =  getDatabaseObject("records");


 db.executeSql('SELECT * FROM  userData').then (function(results) {


 userEncryptionKey =  sessionStorage.getItem("randomID") ;


 if(results.length){

     // createTableHeader();



        for(numberOfItem = 0 ; numberOfItem < results.length ; numberOfItem++) {

               //  console.log( "obj"+object.userName);


                  userData  = decryptedData(results[numberOfItem],userEncryptionKey,userArray);

                   console.log( decryptedData(object.userName, userEncryptionKey,userArray) );

                    if(userData.website!== object.website){

                             count = count + 1;


                    }
                    else{


                        count = 0;

                        break;

                    }




             }

           if(count){
                console.log("asdasd")

                dbObject.put('userData',userObject).done(function(){


                });

           }




 }
 else{


   dbObject.put('userData',userObject).done(function(){
     
   });



 }







}, function(e) {

  throw e;


});




    }
