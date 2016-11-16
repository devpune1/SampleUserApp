


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
    var dbObject = getConnectionObject(sessionStorage.getItem("userDatabaseName"));
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

  var db = getConnectionObject(sessionStorage.getItem("userDatabaseName"));

  var userKey = sessionStorage.getItem('randomID');

   document.getElementById('usertable').innerHTML ="";
   createTableHeader();
 db.executeSql('SELECT * FROM userData').then (function(results) {





 if(results.length){

         console.log(results.length);


        for(numberOfItem = 0 ; numberOfItem < results.length ; numberOfItem++) {

                  userData = decryptUserData(results[numberOfItem],userArray,userKey);

                console.log( userData)

                    if(userData){

                            count = count + 1;
                       createTable(count,userData.name,userData.password,userData.website,userData.hint,userData.date)
                      ///  dataSource.push(getArrayOfData(userData,getInputId()));


                    }





             }




            if(count == 0){

                 document.getElementById('usertable').innerHTML = "No Records Found ";



            }
            else{


                //displaySortedData(dataSource);
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

  var db = getConnectionObject(sessionStorage.getItem("userDatabaseName"));
  db.clear('userData').done(function() {



      alert("All Records Inside Database  Cleared");


});
}





function createTable(count,userName,userPassword,userWebsite,userHint,userDate){

    var userRowNumber,userTable,createTable,userRow,userPasswordRow,userWebsiteNameRow,userNameRow,userHintRow,userDateRow,userActionButton,deleteRecord,editRecord;
     var userKey;






      deleteRecord = document.createElement('label');
    deleteRecord.id = 'deletebutton';
        deleteRecord.value="Delete" ;


         userRow = document.createElement('tr');


          userTable=document.getElementById('usertable');
           var createTablebody = document.createElement('tbody');
          createTable=document.createElement('Table');
          createTable.id='result';

          userRow=document.createElement('tr');

          deleteRecord = document.createElement('input');
            deleteRecord.type="button";
            deleteRecord.id = 'deletebutton';
            deleteRecord.width = '30';
             deleteRecord.value = 'Delete';

          editRecord = document.createElement('input');
            editRecord.type="button";
          editRecord.id= 'editbutton';
          // editRecord.value= 'edit';
        //  editRecord.setAttribute('src', 'images/edit.png');

          deleteRecord.style.background = "edit.png" ;


          userRowNumber =document.createElement('td');
          userNameRow=document.createElement('td');
          userPasswordRow=document.createElement('td');
          userWebsiteNameRow=document.createElement('td');
          userHintRow=document.createElement('td');
          userDateRow = document.createElement('td');



          deleteRecord.onclick = function (){
              console.log(userDate)
               deleteData(userDate);


           }

           editRecord.onclick = function() {

                userKey = getSessionPassword();
                generateEditForm(userName,userPassword,userWebsite,userHint,userDate,userKey);

              getRecord();

          }






        console.log(userDate)
          userRowNumber.appendChild(document.createTextNode(count));
          userNameRow.appendChild(document.createTextNode(userName));
          userPasswordRow.appendChild(document.createTextNode(userPassword));
          userWebsiteNameRow.appendChild(document.createTextNode(userWebsite));
          userHintRow.appendChild(document.createTextNode(userHint));
         userDateRow.appendChild(document.createTextNode(toDate(userDate,userDateRow)));

           userRowNumber.width='25px';
           userNameRow.width='175px';
           userPasswordRow.width='175px';
           userWebsiteNameRow.width='175px';
           userHintRow.width='175px';
           userDateRow.width='175px';

            userRow.appendChild(userRowNumber);
            userRow.appendChild(userNameRow);
            userRow.appendChild(userPasswordRow);
            userRow.appendChild(userWebsiteNameRow);
            userRow.appendChild(userHintRow);
           userRow.appendChild( userDateRow);



            userRowNumber.width='100px';

            userActionButton = document.createElement('td');

           userActionButton.width ='150px';

           userActionButton.appendChild(deleteRecord);

           ///userActionButton.appendChild(editRecord);

         userRow.appendChild(userActionButton);


         createTable.appendChild(userRow);
         createTablebody.appendChild( createTable);

        userTable.appendChild(createTablebody);



}





function createTableHeader(){


    var userRowNumber,userTable,userRow,createTable,userNameRow,userWebsiteRow,userPasswordRow,userHintRow,userDateRow;
    var userDeleteButton,deleteRecord,userEditButton,editRecord;


      userNameRow = document.createElement('th');

         userTable = document.getElementById('usertable');
          createTable = document.createElement('Table');
          createTable.id='headertable';
          createTable.class='tablesorter';
          createTable.style.borderColor="black";



          userRow=document.createElement('tr');
          userDeleteButton = document.createElement('th');
          userEditButton = document.createElement('th');

          userRowNumber = document.createElement('th');
          userNameRow = document.createElement('th');
          userPasswordRow = document.createElement('th');
          userWebsiteRow = document.createElement('th');
          userHintRow  = document.createElement('th');
          userDateRow  = document.createElement('th');





          userRowNumber.appendChild(document.createTextNode("No."));
          userNameRow.appendChild(document.createTextNode("User Name"));
          userPasswordRow.appendChild(document.createTextNode("User Password"));
          userWebsiteRow.appendChild(document.createTextNode("User Website"));
          userHintRow.appendChild(document.createTextNode("User Hint"));
          userDateRow.appendChild(document.createTextNode("Last Update"));



           userDeleteButton.appendChild(document.createTextNode("Action"));

           userRowNumber.width='25px';
           userNameRow.width='175';
           userPasswordRow.width='175';
           userWebsiteRow.width='175';
           userHintRow.width='175';
           userDateRow.width='175';

           userDeleteButton.width='175px';
           userEditButton.width='175px';

          userRow.appendChild(userRowNumber);
           userRow.appendChild(userNameRow);
           userRow.appendChild(userPasswordRow);
           userRow.appendChild(userWebsiteRow);
           userRow.appendChild(userHintRow);
           userRow.appendChild(userDateRow);

           userRow.appendChild(userDeleteButton);







            createTable.appendChild(userRow);

        userTable.appendChild(createTable);



}




/*===================================================DELETE USER RECORD=========================================================*/



function deleteData(objectKey) {




    var flag = null;

              flag = confirm("Do you want to delete");


                    if(flag){



                       remoteStorage.bicService.removeUserData(objectKey);

                      deleteRecord("userData",objectKey);


                    }





}


function deleteRecord(userTable,userId){

     var db =  getConnectionObject(sessionStorage.getItem('userDatabaseName'));

     db.remove(userTable,userId);
                       reloadTable();

}

function closeApp(){



}
