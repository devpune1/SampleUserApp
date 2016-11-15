
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










      userData = getData("registerinput");

      userArray = getRegistrationInputId();

    if(validateTextboxInput(userData,userArray,"registerinput")){




    userObject = createUserDataObject(userData,userData[5],userArray);



if(userData[5] === userData[6]) {

          console.log("entered "+userData[1]);
          console.log("entered "+userData[5]);

userObject["key"] = generateHashKey(userData[1]+userData[5]);

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

            callErrorPopOver(textBoxID,items,text[items] +" Cannot Be Empty" );

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

  document.getElementsByClassName("loginError")[items].style.display = "block";
   document.getElementsByClassName("loginError")[items].style.color = "red";
  document.getElementsByClassName("loginError")[items].innerHTML = text;


}


function validateTextboxInput(userData,textboxID,textboxPosition){




     var items = 0;
   var count = 0;

    var validInput = [];
  var text = ["User Name",'User ID',"User Mobile No.","User Email Address","Birth Date"," User Password","User Confirm Password"];

    // console.log("DAta"+userData);




     for(items = 0 ; items < userData.length ; items++){


         switch(items){



             case 0 :

                    if(userData[items]){


                    if(validateString(userData[items])){
                        validInput[items] = true;

                     callErrorPopOver(textboxPosition,items," ");
                    }
                    else{

                          validInput[items] = false;

                    callErrorPopOver(textboxPosition,items," Only String Accepted With Space ");


                    }
                }
                else{

                     validInput[items] = false;


                     callErrorPopOver(textboxPosition,items,text[items]+" Required*");




                }





                 break;

                case 1 :



                 if(userData[items]){

                    if(validateUserId(userData[items])){

                          validInput[items] = true;
                   callErrorPopOver(textboxPosition,items,"");

                    }
                    else{

                          validInput[items] = false;
                            callErrorPopOver(textboxPosition,items,"Must be string or alpha-numeric ");
                            break;
                    }
                 }
                 else{

                       validInput[items] = false;

                       callErrorPopOver(textboxPosition,items,text[items]+" Required*");




                 }

                   // console.log(validateUserId(userData[items]));

                 break;






                  case 2 :


                 //   console.log(validateMobileNumber(userData[items]))


                    if(userData[items]){

                    if(validateMobileNumber(userData[items])){

                         validInput[items] = true;
                          callErrorPopOver(textboxPosition,items,"");

                    }
                    else{

                         validInput[items] = false;
                           callErrorPopOver(textboxPosition,items,"Only Number Accepted Up To 10 Digit");



                    }
                   }

                  else{

                         validInput[items] = false;
                       callErrorPopOver(textboxPosition,items,text[items]+" Required*");



                    }

                 break;


                    case 3 :

                    if(userData[items]){

                    if(validateEmail(userData[items])){

                        validInput[items] = true;
                       callErrorPopOver(textboxPosition,items,"");

                    }
                    else{

                        validInput[items] = false;
                        callErrorPopOver(textboxPosition,items,"Enter Valid Email Address ");

                    }
                    }
                    else{


                         validInput[items] = false;

                         callErrorPopOver(textboxPosition,items,text[items]+" Required*");
                    }



                 break;


                  case 4:



                    if(userData[items]){
                          validInput[items] = true;
                           callErrorPopOver(textboxPosition,items,"");

                    }
                    else{

                          validInput[items] = false;

                         callErrorPopOver(textboxPosition,items,text[items]+" Required*");

                    }



                 break;




                 case 5 :

                // console.log("case"+validatePassword(userData[items]))

                 if(userData[items]){

                    if(validatePassword(userData[items])){

                          validInput[items] = true;
                           callErrorPopOver(textboxPosition,items,"");

                    }
                    else{

                          validInput[items] = false;

                        callErrorPopOver(textboxPosition,items,"Must Be At Least 8 with 1 UpperCase,1 Digit and character");

                    }
                 }
                 else{

                       validInput[items] = false;

                         callErrorPopOver(textboxPosition,items,text[items]+" Required*");




                 }

                   // console.log(validatePassword(userData[items]));

                 break;

        case 6:
             if(userData[items]){

                    if(validatePassword(userData[items])){

                          validInput[items] = true;
                      // promptAboutValidData("confirm",userData[items],items);
                       callErrorPopOver(textboxPosition,items,"");
                    }
                    else{

                          validInput[items] = false;
                          callErrorPopOver(textboxPosition,items,"Must Be At Least 8 with 1 UpperCase,1 Digit and character");


                    }
                 }
                 else{

                       validInput[items] = false;

                       callErrorPopOver(textboxPosition,items,text[items]+" Required*");




                 }





            break;


             default :

             break;

         }



     }


     for(items = 0; items < validInput.length; items++){


         if(!validInput[items]){

             count = count + 1;

         }

     }


     if(count){



         return false;

     }
    else{


        return true;

    }




 }


function validateString(userEnteredName) {



      var namepattern= /^([a-zA-Z]*((\s)))+[a-zA-Z]*/;




    if(namepattern.test(userEnteredName))
    {


                return true;
    }
    else{



                return false;
    }


}

function validateEmail( userEnteredEmail ) {

    var emailpattern = /\S+@\S+\.\S+/;



    if(isFieldEmpty(userEnteredEmail) && emailpattern.test(userEnteredEmail)){

        return true;


    }
    else{

        return false;
    }



}


function validateMobileNumber(userEnterednumber){


    var numberpattern = /^[978]{1}[0-9]{9}$/;

  //  console.log( "asdasd" +numberpattern.test(userEnterednumber));

        if(isFieldEmpty(userEnterednumber) && numberpattern.test(userEnterednumber))
        {


              return true;


         }
         else
          {

              return false;
         }


}




function validatePassword(password){


var passPassword=/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,}/;



if(passPassword.test(password) && isFieldEmpty(password) ){



    return true


}

else{


    return false;



}



}

function validateUserId(password){


var passPassword=/^[a-zA-Z0-9]+(?:[a-zA-Z0-9]+)*$/;



if(passPassword.test(password) && isFieldEmpty(password)  ){



    return true


}

else{


    return false;



}



}
function isFieldEmpty( filedData ) {

    if(filedData ===""){

        return false;
    }
    else{

         return true;

    }
}
