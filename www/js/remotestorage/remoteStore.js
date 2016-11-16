

function defineUserModule(){


RemoteStorage.defineModule('bicService', function(privateClient) {

  privateClient.declareType('data', {

    type: 'object',
    description : 'User Data',
    properties: {

    userinfo: { type: 'string' },

      website: { type:'string' },

      hint: { type: 'string' }




    },

    required: ['userinfo','website','hint']

  });

  return {


    exports: {


      init: function() {


       privateClient.cache('');



      },

      on: privateClient.on,

      addUserData: function(Id,userData) {

        Id = Id.toString().replace(/\s|\//g, '-');



        return privateClient.storeObject('data',Id,userData);


      },


      editUserData: function(userId,userData) {

       userId = userId.toString().replace(/\s|\//g, '-');

         return privateClient.storeObject('data',userId,userData);

      },

      removeUserData: function(userId) {

      userId = userId.toString().replace(/\s|\//g, '-');



          return  privateClient.remove(userId);
      },

      getAllData: function() {

        return privateClient.getAll('');

      },


     getById: function(obj) {


     obj = obj.toString().replace(/\s|\//g, '-');

              return privateClient.getObject(obj);

                }




    }
  };

});
}
