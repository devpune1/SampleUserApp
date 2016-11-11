




function getData(className){

     var elements = document.getElementsByClassName(className);
     var userData = [];

  for (var items = 0; items < elements.length; items++) {

    if (typeof elements[items].value !== "undefined") {

          userData.push(elements[items].value);
      }
    }


    return userData;


}




function saveRecords() {

    var userData ="";
    var userObject = "";
    var dbObject = getConnectionObject('records');
    var userArray = ""
    var text = ["User Name",'User ID',"User Mobile No.","User Email Address","Birth Date"," User Password","User Confirm Password"];








    if( checkUserTextBox("registerinput",text)){


    userData = getData("registerinput");

    userArray = getRegistrationInputId();

    userObject = createUserDataObject(userData,userData[4],userArray);


if(userData[5] === userData[6]) {


          dbObject.put('record',userObject).done( function() {

          console.log("entered ");

     });

          clearInputs("registerinput");
    }

else {

            callErrorPopOver("registerinput",6,"Password Do not Match")


      }




  }


}




function clearInputs(className) {

      var elements = document.getElementsByClassName(className);

      for (var items = 0; items < elements.length; items++) {

       elements[items].value ="";

    }







}


function getTableName() {

    var table ="record";

    return table;

}


function checkUserTextBox(textBoxID,text){


    var flag=0;
    var object = document.getElementsByClassName(textBoxID);



    for(var items = 0 ;items<object.length;items++){



      if(object[items].value ==""){

            callErrorPopOver( textBoxID,items,text[items] +" Cannot Be Empty" );

            flag = 0;

            break;

        }
   else {

                flag++;

        }



    }

  if(flag) {


      return true;


  }
  else {


        return false;
  }







}



function callErrorPopOver(textBoxID,items,text) {

  ons.createPopover('popover.html').then(function(popover) {

        document.getElementById('anotherpage').style.color="red";
        document.getElementById('anotherpage').innerHTML = text+" ";
        console.log(popover);
        document.getElementById('errpopover').show(document.getElementsByClassName(textBoxID)[items]);


  });

}
