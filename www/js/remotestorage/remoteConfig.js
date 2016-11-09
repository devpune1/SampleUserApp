// Enable change events for changes in the same browser window

function load(){


RemoteStorage.config.changeEvents.window = false;

// Claim read/write access for the /myfavoritedrinks category
remoteStorage.access.claim('bicSoft','rw');

// Display the RS connect widget
remoteStorage.displayWidget();

remoteStorage.bicSoft.init();

remoteStorage.bicSoft.getUserData(function(transactions){

for(var id in transactions){




     removeDuplicate(transactions[id]);


  }


});



remoteStorage.on('disconnected', function() {
  //emptyDrinks();
});
}
