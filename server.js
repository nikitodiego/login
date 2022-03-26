const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const handlebars = require('express-handlebars')

const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('public'));

//Configuracion de handlebars
app.set("views", "./views");
app.set("view engine","hbs");
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: 'index',
}));

//MongoDB Atlas
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://nicojapaz:Spirit01@cluster0.guz7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30000
    }
}))

app.get('/', (req,res) => {
    res.send('Servidor express ok!')
})

app.get('/login', (req,res) => {
    res.render('form')
})

let nombre = ""
app.post('/logged', (req, res) => {
    nombre = req.body.nombre;
    req.session.nombre = nombre;
    //res.send(`Bienvenid@ ${nombre}.`);
    res.redirect('/logged')
  });

app.get('/logged', (req, res) => {
    if(req.session.nombre){
        res.render("bienvenida", { datos: { nombre: nombre }, listExists: true })
    }else{
        res.send("La sesión ha finalizado")
    }
    
});

app.get('/logout', (req,res) => {
    req.session.destroy( err => {
        if(!err) res.render("logout")
        else res.send({status: 'Logout ERROR', body: err})
    })
})

app.get('/info', (req,res) => {
    console.log('------------ req.session -------------')
    console.log(req.session)
    console.log('--------------------------------------')

    res.send('Send info ok!')
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

