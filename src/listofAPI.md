

# DEVtinder apis

 ## AUTH ROUTER
-post/signup
-post/login
-post/logout

## profilerouter
-get   /profile/view
-patch  /profile/edit
-patch /profile/password

 ## connectionnrequestrouter
post /request/send/intrested:userID
post /request/send/ignored/:userID

this 2 api can be clubbed to make dynamuc api if left swipe intrested and if right ignored

post/request/send/:status/:userId




-post/ request/review/accepted/:requestID
-post /request/review/rejected/:requestID

this 2 api can also be clubbed now keep in mind you can only accept or reject if the current status is intrested




 ## userRouter


  -get/user/requests/recieved   //gets you all the pending request for the logged in user
  -get/user/connections
  -get/user/feed
  
  -get/user/profile

  this is get api it fill fetch data from db be carefull you will give data to the user that are in their scope
  //next world war will happen because of DATA
  //DATA is the New OIL



















