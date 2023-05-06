const express = require("express")
const firebase = require('firebase')
const bodyParser=require('body-parser')

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static(__dirname+'/public'));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDahmi6bWQb_DorRP3q1xdfzwVwnat7-jk",
    authDomain: "database-bd5d3.firebaseapp.com",
    projectId: "database-bd5d3",
    storageBucket: "database-bd5d3.appspot.com",
    messagingSenderId: "367037702612",
    appId: "1:367037702612:web:56c40b9a3c44a3493e7641",
    measurementId: "G-W8FB8JCCJ2"
  };

  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();

app.get('/getAll',(req,res)=>{
    (async()=>{
        try{
            let response=[]
            await db.collection('user').get().then(querysnapshot=>{
                let docs=querysnapshot.docs;
                for(let doc of docs){
                    response.push(doc.data())
                }
                console.log("done")
                return res.status(200).send(response)
                
            })
        }
        catch(error){
            console.log("error")
            return res.status(500).send(error)
        }
    })()
})

app.get('/getby/:id', async (req, res) => {
    try {
        console.log(req.params.id)
      const userRef = db.collection("user").doc(req.params.id);
      const response = await userRef.get();
      res.send(response.data());
      console.log(response.data())
    } catch(error) {
      res.send(error);
      console.log(error)
    }
  });

app.post('/create', async (req, res) => {
    try {
      console.log(req.body.user.idUser);
      const id = req.body.user.emailUser;
      
      const userJson = {
        name:req.body.user.nameUser,
        age:req.body.user.ageUser,
        gender:req.body.user.genderUser,
        email:req.body.user.emailUser,
        number:req.body.user.idUser,
        password:req.body.user.passwordUser,
        role:req.body.user.roleUser,
        school:req.body.user.schoolUser,

      
      };
      console.log("succes");
      const usersDb = db.collection('user'); 
      const response = await usersDb.doc(id).set(userJson);
       res.send(response);
    } catch(error) {
        console.log(error);
      res.send(error);
    }
  })

  app.delete('/delete/:email', async (req, res) => {
    try {
      const response = await db.collection("user").doc(req.params.email).delete();
      res.send(response);
    } catch(error) {
        console.log(error);
      res.send(error);
    }
  })

  app.post('/update', async(req, res) => {
    try {
      console.log(req.body)
      const email=req.body.user.emailUser;
      console.log(email)
      const newFirstName = req.body.user.nameUser;
      console.log(newFirstName)
      const newNumber =req.body.user.idUser;
      console.log(newNumber)
      const newAge=req.body.user.ageUser;
      console.log(newAge)
      const newGender=req.body.user.genderUser;
      console.log(newGender)
      const newPassword=req.body.user.passwordUser;
      console.log(newPassword)
      const newSchool=req.body.user.schoolUser;
      console.log(newSchool)
      const newRole=req.body.user.roleUser;
      console.log(newRole)
      const userRef = await db.collection("user").doc(email)
      .update({
        name: newFirstName,
        gender:newGender,
        age:newAge,
        email:email,
        number:newNumber,
        school:newSchool,
        role:newRole,
        password:newPassword

      });
      res.send(userRef);
    } catch(error) {
      res.send(error);
    }
  })

  app.get('/sign/:user', async (req, res) => {
    try {
        console.log(req.params.user)
      const userRef = db.collection("user").doc(req.params.user);
      const response = await userRef.get();
      res.send(response.data());
      console.log(response.data())
    } catch(error) {
      res.send(error);
      console.log(error)
    }});

const port=process.env.port || 5000
app.listen(port,()=>{
    console.log("Server worked at port",port)
})

/////boook
app.get('/getAllBooks',(req,res)=>{
  (async()=>{
      try{
          let response=[]
          await db.collection('book').get().then(querysnapshot=>{
              let docs=querysnapshot.docs;
              for(let doc of docs){
                  response.push(doc.data())
              }
              console.log("done")
              return res.status(200).send(response)
              
          })
      }
      catch(error){
          console.log("error")
          return res.status(500).send(error)
      }
  })()
})

app.post('/createbook', async (req, res) => {
  try {
    console.log(req.body.book.id);
    const id = req.body.book.id;
    
    const bookJson = {
      id:req.body.book.id,
      title:req.body.book.title,
      author:req.body.book.author,
      row:req.body.book.row,
      av:req.body.book.av,  
    };
    console.log("succes");
    const usersDb = db.collection('book'); 
    const response = await usersDb.doc(id).set(bookJson);
     res.send(response);
  } catch(error) {
      console.log(error);
    res.send(error);
  }
})
app.delete('/deletebook/:id', async (req, res) => {
  try {
    const response = await db.collection("book").doc(req.params.id).delete();
    res.send(response);
  } catch(error) {
      console.log(error);
    res.send(error);
  }
})

app.get('/getbook/:id', async (req, res) => {
  try {
      console.log(req.params.id)
    const userRef = db.collection("book").doc(req.params.id);
    const response = await userRef.get();
    res.send(response.data());
    console.log(response.data())
  } catch(error) {
    res.send(error);
    console.log(error)
  }
})

app.post('/updatebook', async(req, res) => {
  try {
    console.log(req.body)
    const id=req.body.book.id;
    console.log(id)
    const title = req.body.book.title;
    console.log(title)
    const author =req.body.book.author;
    console.log(author)
    const row=req.body.book.row;
    console.log(row)
    const av=req.body.book.av;
    console.log(av)

    const userRef = await db.collection("book").doc(id)
    .update({
      id: id,
    title:title,
      author:author,
      row:row,
      av: av,
    });
    res.send(userRef);
  } catch(error) {
    res.send(error);
  }
})
///reservations

app.post('/reserve', async(req, res) => {
  try {
    console.log(req.body);
    const id = req.body.reservation.id;
    
    const resJson = {
      id:req.body.reservation.id,
      email:req.body.reservation.email, 
      date:req.body.reservation.date,
      book:req.body.reservation.book,
      room:req.body.reservation.room
    };
    console.log("succes");
    const usersDb = db.collection('reservation'); 
    const response = await usersDb.doc(id).set(resJson);
     res.send(response);
  } catch(error) {
      console.log(error);
    res.send(error);
  }

})


app.get('/getresby/:email', async (req, res) => {
  (async()=>{
  try {
      console.log(req.params.email)
    const userRef = db.collection("reservation");
    let response=[];
    await userRef.where('email','==',req.params.email).get().then(querysnapshot=>{
      let docs=querysnapshot.docs;
      for(let doc of docs){
          response.push(doc.data())
      }
      console.log("done")
      return res.status(200).send(response)
      
  })
  } catch(error) {
    res.send(error);
    console.log(error)
  }
})()});

app.get('/getbook/:id', async (req, res) => {
  try {
      console.log(req.params.id)
    const userRef = db.collection("book").doc(req.params.id);
    const response = await userRef.get();
    res.send(response.data());
    console.log(response.data())
  } catch(error) {
    res.send(error);
    console.log(error)
  }
})

app.post('/updateroom', async(req, res) => {
  try {
    console.log(req.body)
    const room_number=req.body.room.room_number;
    console.log(room_number)
    const av = req.body.room.av;
    console.log(av)
   

    const userRef = await db.collection("room").doc(room_number)
    .update({
      room_number: room_number,
    av:av
    });
    res.send(userRef);
  } catch(error) {
    res.send(error);
  }
})

app.get('/getAllRooms',(req,res)=>{
  (async()=>{
      try{
          let response=[]
          await db.collection('room').get().then(querysnapshot=>{
              let docs=querysnapshot.docs;
              for(let doc of docs){
                  response.push(doc.data())
              }
              console.log("done")
              return res.status(200).send(response)
              
          })
      }
      catch(error){
          console.log("error")
          return res.status(500).send(error)
      }
  })()
})

app.get('/getAllRes',(req,res)=>{
  (async()=>{
      try{
          let response=[]
          await db.collection('reservation').get().then(querysnapshot=>{
              let docs=querysnapshot.docs;
              for(let doc of docs){
                  response.push(doc.data())
              }
              console.log("done")
              return res.status(200).send(response)
              
          })
      }
      catch(error){
          console.log("error")
          return res.status(500).send(error)
      }
  })()
})
app.delete('/deleteres/:id', async (req, res) => {
  try {
    const response = await db.collection("reservation").doc(req.params.id).delete();
    res.send(response);
    console.log(response);
  } catch(error) {
      console.log(error);
    res.send(error);
  }
})