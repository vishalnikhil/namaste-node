//server using express

//order matters in route why because js is a syncronous single-threaded language

//mongoose use krna sikha 

//agar name pass karoge in connection string agar db name exist nhi krta then it will craete a new databas with the name

//schema created for a user

//for error handling always use try catch block method

//what is the difference between json object and js object

to covert the json data from the user we need to convert it to js object so as to save it to db for that we use a middleware
called express.json()

User.find({}) will give you all documents in mongo db

User.findOne return only only that matches(random)

  
learner a lot about schema validation required default unique trim

validate(value) //to validate some condition then only add user like gender should only be male female or other

add more validator for every input field(validation is very important)

//for validation there is a libraray called validator to validate email npm i validator
 isvalid email ,, is strong password


validation can be done in schema level as well as api level

never trust request.body

//once you hash a password that is encryt then you cannot get your password back for the hash 
hence the user will only know his password

for hashing passwrod we use bcrypt library


// itne api sirf app.js mein agar jyada bara app to dikkat hoga is liye we use express.router() specific api ko group krte hai aur iske 
route banate hai bilkul waise hi am karta hai jaise app.js mein krta tha phir isko app.js mein import krte hai








