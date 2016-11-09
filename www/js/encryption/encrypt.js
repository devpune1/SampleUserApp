function encryptData(userData,userKey){

      var encryptedData = "";

      var password = userKey; // user password.

        var iter= 1000; // Strengthen by a factor

        var mode ='ccm'; // Mode for encryption.

        var keysize = 128; // 192 or 256

        var iv= sjcl.random.randomWords('4','0'); // Intial Vector

        var tag='64'; //Authentication strength

        var salt = sjcl.random.randomWords('4','0');

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

            ts:parseInt(tag),

             ks:parseInt(keysize)


          };

             try{
                encryptedData = sjcl.encrypt(userKey, userData,p,rp);


             }
             catch(e){
              console.log(e.message);

             }


           return encryptedData;




 }


 function generateHashKey(userKey){

      var hashedKey=null;



     hashedKey = sjcl.hash.sha256.hash(userKey);

      hashedKey = sjcl.codec.hex.fromBits(hashedKey);

    return hashedKey;


}

function decryptData(userData,userKey){

  console.log("vale "+ userData)

   console.log(userKey);

   var x =  sjcl.decrypt(userKey,userData);

   console.log(x)
return x;


 }

 function decryptToPlainData(userData,userKey){

  console.log("vale "+ userData)

   console.log(userKey);

   var x =  sjcl.decrypt(userKey,userData);

   x = JSON.parse(x);

return x ;


 }

 function getRegistrationInputId(){

var userRegistrationID = ["name","mobile","email","date","password",];

return userRegistrationID;
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
