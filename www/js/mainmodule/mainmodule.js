


 //reloadTable();







function getUserData(className){

     var elements = document.getElementsByClassName(className);
  var userData = [];

  for (var items = 0; items < elements.length; items++) {

    if (typeof elements[items].value !== "undefined") {

        userData.push(elements[items].value);
      }
    }


    return userData;


}

function getInputId(){

var userID = ["name","password","website","hint","date"]

return userID;
}


function userRecord(){

    var userData ="";
    var userObject = "";
    var dbObject = getConnectionObject("records");
   var userKey ="";
    var userArray = "";
     var decrypted = "";
var dataBaseName =  sessionStorage.getItem("userDatabaseName");
    userData = getUserData("userinput");
    userData.push( new Date().getTime());

    userKey = sessionStorage.getItem('randomID');


    userArray =  getInputId();



    userObject = createDataObject(userData,userArray);

   userObject = createSensitiveEncryptedObject(userObject,userArray,userKey);



     dbObject.put('userData',userObject).done(function(){
       alert("done");

     });

    remoteStorage.bicService.addUserData(userObject.date,userObject);

     reloadTable();
    clearInputs("userinput");


}




function createDataObject(userData,userArray){

    var userDataObject = {};
    var userObjectKey = userArray;
    var userObjectValue = userData;

     for (var items = 0; items < userObjectKey .length; items++) {



     userDataObject[userObjectKey[items]] = userObjectValue[items];

    }

    console.log(userDataObject);

    return userDataObject;




}


function clearInputs(className){

      var elements = document.getElementsByClassName(className);



  for (var items = 0; items < elements.length; items++) {


       elements[items].value ="";

    }







}


function getUserTableName(){

    var table ="userData";

    return table;

}



function reloadTable(){



  var numberOfItem = null;
  var userData = {};
  var flag = false;
  var userEncryptionKey = null;
  var count = 0;
  var countArray = [] ;
  var userName = [];
  var dataItem = [];

  var dataSource = [];


   var userArray = ['userinfo','website','hint','date'];

  var db = getConnectionObject("records");

  var userKey = sessionStorage.getItem('randomID');

   console.log( userKey);

 db.executeSql('SELECT * FROM userData').then (function(results) {





 if(results.length){

         console.log(results.length);


        for(numberOfItem = 0 ; numberOfItem < results.length ; numberOfItem++) {

                  userData = decryptUserData(results[numberOfItem],userArray,userKey);

                console.log( userData)

                    if(userData){

                            count = count + 1;

                        dataSource.push(getArrayOfData(userData,getInputId()));


                    }





             }




            if(count == 0){

                 document.getElementById('usertable').innerHTML = "No Records Found ";



            }
            else{


                displaySortedData(dataSource);
                dataSource.length=0;
            }


 }

else{



                        //document.getElementById('usertable').visibility = "hidden ";







}









}, function(e) {

  throw e;


});



}






function displaySortedData(dataSource){


    $(document).ready(function() {

    $('#example').DataTable( {
        'responsive': true,
        "bJQueryUI": true,
         "destroy": true,
        data: dataSource,
              columns: [
                        { title: 'Name',  className: "center", },
                        {title: 'Password' ,  className: "center",},
                        { title: 'Website',  className: "center", },
                        {title: 'Hint',className: "center",},
                          {title: 'Date',className: "center",},
                          {title : 'Action',
                          default :-1,
                        className: "center",

                    "defaultContent": " <input type= 'button' value = 'Delete' class = 'deleteButton' > </input>"


                  },
                ]
    });



    $('#example').on('click', 'input.deleteButton', function (event) {

    var table = $('#example').DataTable();

     var dataSelected = table.row( $(this).parents('tr') ).data();

    // deleteData(dataSelected[0],dataSelected[1],dataSelected[2],dataSelected[3],"sam");



     table.row( $(this).parents('tr') ).remove().draw();






   //dataSelected.length = 0;


    } );




    });

}

function getArrayOfData(userData,userProperty){


    var items = 0;
    var dataItem = [];
    var userDateRow = {};

    console.log(userData)

    for(items = 0;items < userProperty.length;items++ ){


            console.log(userData[userProperty[items]])
if(userProperty[items] == 'date'){

    dataItem [items] =  toDate(userData[userProperty[items]]);
}
else{
        dataItem [items] = userData[userProperty[items]];
}

        }



    return dataItem;



}

function toDate(userTimeStamp){

var userDate = new Date(userTimeStamp);

var formatted_date =userDate.getDate() + "/" + (userDate.getMonth()  + 1) + "/" + userDate.getFullYear()

  return formatted_date;
}


function deleteData( userName,userPassword,userWebsite,userHint,userKey) {

    var numberOfItems = null;
   var path = "";

    var propertyNameArr = ["name","password","website","hint"];

    var userData = [userName,userPassword,userWebsite,userHint];

     var db = getConnectionObject("records");


    var userDataObject = createDataObject(userData,propertyNameArr);


   console.log(userDataObject);
    var items=0;
    var flag = null;







db.keys('userData').done(function(keys) {

    db.values('userData').done(function(userData) {



      for ( numberOfItems= 0; numberOfItems < keys.length; numberOfItems++) {


              flag = validateUserData(userDataObject,userData[numberOfItems],"sam",propertyNameArr);

                   console.log(flag)

                    if(flag){


                         //remoteStorage.bicS.removeUserData(userName);
                       db.remove('userData',keys[numberOfItems]);
                       reloadTable();

                      break;

                    }


      }

    })


  });




}




function validateUserData(userDataObject,results,userEncryptionKey,userDataProperty){

    var flag = 0;


   results = decryptedData(results,userEncryptionKey,userDataProperty);

   userDataObject = decryptedData(userDataObject,userEncryptionKey,userDataProperty);



    console.log(results);


console.log(userDataObject);

    if(userDataObject){



    for(var items = 0; items <  userDataProperty.length ; items++){




            if(results[userDataProperty[items]] == userDataObject[userDataProperty[items]]){


                        flag = 1;



            }
            else {



                flag = 0 ;
                break ;
            }



    }


    }

else{


    flag = 0;


}

    return flag;


}
function  validateSensitiveData(userid){


    switch (userid){

        case "name":

            return true;


        break;

        case "password":

            return true;


            break;

             case "userinfo":

            return true;


            break;



        default :
        return false;
        break;


    }





}




function createSensitiveEncryptedObject(userData,userArray,userKey){

    var encryptedObj ={};
    var encryptedData ="";
    var items =0;


     console.log(userData);

    for(items = 0 ; items <userArray.length; items++){

        if(validateSensitiveData(userArray[items])){

            encryptedObj[userArray[items]] = userData[userArray[items]];



        }


    }

       console.log(encryptedObj)
       encryptedObj = JSON.stringify(encryptedObj);
       console.log(  encryptedObj );

     encryptedData = encryptData(encryptedObj,userKey) ;
     console.log(encryptedData);

    return createEncryptedObject(encryptedData,userData,userArray);



}

function createEncryptedObject(encryptedData,userData,userArray){

    var  encryptedObj ={};

      for(var items = 0 ; items < userArray.length; items++){

        if(! validateSensitiveData(userArray[items])){

            encryptedObj[userArray[items]] = userData[userArray[items]];

            console.log("her")

        }


    }
      encryptedObj["userinfo"] = (encryptedData);

    console.log( encryptedObj)
    return    encryptedObj;
}





 function decryptUserData(userData,userArray,userKey){

  var encryptedObj ={};
    var encryptedData ={};
    var items = 0;

console.log(userData);
     console.log(userData+"Array "+userArray+"Key "+userKey);

    for(items = 0 ; items <userArray.length; items++){



        if(validateSensitiveData(userArray[items])){

          encryptedData = decryptToPlainData(userData[userArray[items]],userKey);

              encryptedObj = (encryptedData);
                console.log(encryptedObj);




        }
        else{


            encryptedObj[userArray[items]] = userData[userArray[items]];

        }



    }



   return    encryptedObj;
 }


 function getUserInfoData(userData,userArray){


     var userDecrytedData ={};

     for(var items = 0;items <userData.length ;items++  ){

         if(validateSensitiveData(userArray[items])){

              userDecrytedData[userArray[items]] = userData[userArray[items]];



         }



     }


     return   userDecrytedData;



 }



function clearDb(){

  var db = getConnectionObject("records");
  db.clear('userData').done(function() {



      alert("All Records Inside Database  Cleared");


});
}


function closeApp(){




}
