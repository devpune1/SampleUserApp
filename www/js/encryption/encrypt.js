

function encryptData(userKey,userData){


 var encryptedData = "";

    var password = userKey; // user password.

      var iter= 1000; // Strengthen by a factor

      var mode ='ocb2'; // Mode for encryption.

      var keysize = 128; // 192 or 256

      var iv=sjcl.random.randomWords('4','0'); // Intial Vector

      var tag='64'; //Authentication strength

      var salt = sjcl.random.randomWords('2','0');

      var adata = generateHashKey(userData); //Authenticated data
      var rp = {};

      var p={};

      p.salt=salt;
      p.iter=iter;

      p = sjcl.misc.cachedPbkdf2(password, p);

      var key=p.key;

      salt=p.salt

      console.log(p);

        p = {

            adata:adata,

          iter:iter, mode:mode,

           ks:parseInt(keysize)


        };


        encryptedData = sjcl.encrypt(userKey, userData,p,rp);


 return encryptedData;
}

function decryptData(userData,userKey){





 var decryptedData =  sjcl.decrypt(userKey,userData);



return  JSON.parse(decryptedData);


}


function generateHashKey(userPassword){

   userPassword =  sjcl.hash.sha256.hash(userPassword);

   userPassword =   sjcl.codec.hex.fromBits(userPassword);


   return userPassword


}


function decryptAllData(userData,userKey,userArray){


     console.log(userArray)


       var userDecryptedData = {};


       for(var items = 0; items < userArray.length ; items++){



                   if(userArray[items] === "date"){


                         userDecryptedData[userArray[items]] = userData[userArray[items]];


                   }

                   else{


                        userDecryptedData[userArray[items]] =  decryptData(userData[userArray[items]],userKey);




                   }







       }

       return userDecryptedData;



}


function createUserDataObject(userData,userKey,userArray){

  var userDataObject = {};
  var userObjectKey = userArray;
  var userObjectValue = userData;




   for (var items = 0; items < userObjectKey .length; items++) {

       // userDataObject[userObjectKey[items]] = (userObjectValue[items],userKey);
   userDataObject[userObjectKey[items]] = encryptData(userObjectValue[items],userKey);
  }


  console.log(userDataObject);

  return userDataObject;




}



function getRegistrationInputId(){


  var inputId = [];


  inputId = ["name","number","email","date","password"];


  return inputId;
}
function getInputId(){


  var inputId = [];


  inputId = ["name","password","website","hint"];


  return inputId;
}
function decryptedData(userData,userKey,userArray){


     console.log(userArray)


       var userDecryptedData = {};


       for(var items = 0; items < userArray.length ; items++){




                  console.log(userData[userArray[items]]);

                        userDecryptedData[userArray[items]] =  userData[userArray[items]];












       }

       return userDecryptedData;



}


function decryptToPlainData(userData,userKey){



 var x =  sjcl.decrypt(userKey,userData);


return x ;


}
