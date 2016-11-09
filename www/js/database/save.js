


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




function saveRecords(){

    var userData ="";
    var userObject = "";
    var dbObject = getConnectionObject('records');
    var userArray = ""
       var text = ["Name","Mobile","Email","Date","Password","Confirm"];

    if(checkUserTextBox("registerinput",text)){


    userData = getData("registerinput");

    userArray = getRegistrationInputId();

    userObject = createUserDataObject(userData,userData[4],userArray);








     dbObject.put( 'record',userObject).done(function(){

        console.log("entered ");

     });

    clearInputs("registerinput");
    }
    else{





    }


}




function clearInputs(className){

      var elements = document.getElementsByClassName(className);



  for (var items = 0; items < elements.length; items++) {


       elements[items].value ="";

    }







}


function getTableName(){

    var table ="record";

    return table;

}


function checkUserTextBox(textBoxID,text){


    var flag=0;
    var object = document.getElementsByClassName(textBoxID);



    for(var items = 0 ;items<object.length;items++){



        if(object[items].value ==""){


            ons.createPopover('popover.html').then(function(popover) {

                  document.getElementById('anotherpage').style.color="red";
                 document.getElementById('anotherpage').innerHTML = text[items]+" "+"Cannot Be Empty" ;
                console.log(popover)
              document.getElementById('errpopover').show(document.getElementsByClassName(textBoxID)[items]);


            });
           flag = 0;
           break;

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
