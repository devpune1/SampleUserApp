// Enable change events for changes in the same browser window

function load(){


RemoteStorage.config.changeEvents.window = false;

// Claim read/write access for the /myfavoritedrinks category
remoteStorage.access.claim('bicService','rw');

// Display the RS connect widget
remoteStorage.displayWidget();

remoteStorage.bicService.init();

remoteStorage.bicService.getAllData().then(function(transactions){

for(var id in transactions){



     //clearRemoteStorage(transactions[id].date);
    removeDuplicate(transactions[id]);


  }


});



}


function removeDuplicate(object){


    var numberOfItem = null;
  var userDataObject = {};
  var flag = false;
  var userEncryptionKey = null;
  var count = 0;
  var countArray = [] ;
  var userName = [];
  var dataItem = [];

  var dataSource = [];
   var userArray = getInputId();


 var db =  getConnectionObject("records");


 db.executeSql('SELECT * FROM  userData').then (function(results) {


 userEncryptionKey =  sessionStorage.getItem("randomID") ;


 if(results.length){

     // createTableHeader();



        for(numberOfItem = 0 ; numberOfItem < results.length ; numberOfItem++) {

                console.log(object);


                  userDataObject  = results[numberOfItem];


                    if(generateHashKey(userDataObject.userinfo) !== generateHashKey(object.userinfo)){

                             count = count + 1;


                    }
                    else{


                        count = 0;

                        break;

                    }




             }

           if(count){
                console.log("asdasd")

                  db.put('userData',userDataObject).done(function(){

                   });


           }




 }
 else{

console.log("asdasd")

  db.put('userData',object).done(function(){

   });



 }







}, function(e) {

  throw e;


});




    }


    function clearRemoteStorage(timeStamp){

        remoteStorage.bicService.removeUserData(timeStamp);

    }
