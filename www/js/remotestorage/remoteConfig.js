// Enable change events for changes in the same browser window

function load(userDatabaseName){

  console.log(userDatabaseName);

RemoteStorage.config.changeEvents.window = false;

// Claim read/write access for the /myfavoritedrinks category
remoteStorage.access.claim('bicService','rw');

// Display the RS connect widget
remoteStorage.displayWidget();

remoteStorage.bicService.init();

remoteStorage.bicService.getAllData().then(function(transactions){
<<<<<<< HEAD
//clearRemoteStorage();
for(var id in transactions){



  console.log("value   reb="+transactions[id]);

=======

for(var id in transactions){



     //clearRemoteStorage(transactions[id].date);
>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1
    removeDuplicate(transactions[id],userDatabaseName);


  }


});



}


function removeDuplicate(object,userDatabaseName){


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

console.log(userDatabaseName);

 var db =  getConnectionObject(userDatabaseName);


if(object !== true){

 db.executeSql('SELECT * FROM  userData').then (function(results) {


<<<<<<< HEAD

=======
<<<<<<< HEAD
if(object !== true){
>>>>>>> 56ec56f9914e55bcb4c263c6b74e7b779205a5be


 if(results.length  ){
=======
 userEncryptionKey =  sessionStorage.getItem("randomID") ;


 if(results.length){

     // createTableHeader();

>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1


        for(numberOfItem = 0 ; numberOfItem < results.length ; numberOfItem++) {

<<<<<<< HEAD
                console.log("value ="+object);
=======
                console.log(object);
>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1


                  userDataObject  = results[numberOfItem];


<<<<<<< HEAD
                    if(   generateHashKey(userDataObject.userinfo) !== generateHashKey(object.userinfo)){
=======
                    if(generateHashKey(userDataObject.userinfo) !== generateHashKey(object.userinfo)){
>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1

                             count = count + 1;


                    }
                    else{


                        count = 0;

                        break;

                    }




             }

           if(count){


<<<<<<< HEAD
                  db.put('userData',object).done(function(){
                          console.log("entered");
=======
                  db.put('userData',userDataObject).done(function(){

>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1
                   });


           }




 }
 else{



  db.put('userData',object).done(function(){
<<<<<<< HEAD
    console.log("entered");

   });





}

}, function(e) {

  throw e;


});
<<<<<<< HEAD
}

}
=======
=======

   });



 }

>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1




<<<<<<< HEAD
    }
>>>>>>> 56ec56f9914e55bcb4c263c6b74e7b779205a5be


    function clearRemoteStorage(){

      remoteStorage.bicService.getAllData().then(function(transactions){

      for(var id in transactions){



        remoteStorage.bicService.removeUserData(transactions[id].date);



        }


      });
=======


}, function(e) {

  throw e;


});




    }


    function clearRemoteStorage(timeStamp){

        remoteStorage.bicService.removeUserData(timeStamp);
>>>>>>> f41d697d57dffe7f99f93dbe4c082b2edb3060a1

    }
