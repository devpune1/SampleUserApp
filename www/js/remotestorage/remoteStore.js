RemoteStorage.defineModule('bicSoft', function(privateClient) {

  privateClient.declareType('data', {

    type: 'object',
    description : 'User Data',
    properties: {

      name: { type: 'string' },

      password: { type: 'string' },

      website: { type:'string' },

      hint: { type: 'string' }




    },

    required: ['name','password','website','hint']

  });

  return {


    exports: {


      init: function() {


       privateClient.cache('');



      },

      on: privateClient.on,

      addUserData: function(Id,userData) {

        var Id = Id.toString().replace(/\s|\//g, '-');

       var name = {name :"abhi"};

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

      getUserData: function() {

        return privateClient.getAll('');

      },


     getById: function(obj) {


     obj = obj.toString().replace(/\s|\//g, '-');

              return privateClient.getObject(obj);

                }




    }
  };

});
