
var express=require("express");
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('notite', 'luminitaraduase', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Users = sequelize.define('users', {
    Username: Sequelize.STRING,
    Email: Sequelize.STRING,
    Parola: Sequelize.STRING
})

var Content = sequelize.define('content', {
    User_id: Sequelize.INTEGER,
    Materie: Sequelize.STRING,
    Comentariu: Sequelize.STRING,
    Contributie: Sequelize.STRING
})

Content.belongsTo(Users, {foreignKey: 'User_id', targetKey: 'Id'})
//Users.hasMany(Content)

var app=express();
app.use(bodyParser.json());

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));


//access static files
app.use(express.static('public'))
app.use('/nodeadmin', express.static('admin'))

app.use(express.json());       
app.use(express.urlencoded()); 

// get a list of Users
app.get('/users', function(request, response) {
    Users.findAll().then(function(users){
        response.status(200).send(users)
    })
        
})

// get one user by id
app.get('/users/:Id', function(request, response) {
    Users.findOne({where: {id:request.params.id}}).then(function(user) {
        if(user) {
            response.status(200).send(user)
        } else {
            response.status(404).send()
        }
    })
})

//create a new user
app.post('/users', function(request, response) {
    Users.create(request.body).then(function(user) {
        response.status(201).send(user)
    })
})

app.put('/users/:Id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.update(request.body).then(function(user){
                response.status(201).send(user)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/users/:Id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/content', function(request, response) {
    Content.findAll(
        {
            include: [{
                model: Users,
                where: { id: Sequelize.col('content.User_id') }
            }]
        }
        
        ).then(
            function(content) {
                response.status(200).send(content)
            }
        )
})

app.get('/content/:Id', function(request, response) {
    Content.findById(request.params.id).then(
            function(content) {
                response.status(200).send(content)
            }
        )
})

app.post('/content', function(request, response) {
    Content.create(request.body).then(function(content) {
        response.status(201).send(content)
    })
})

app.put('/content/:Id', function(request, response) {
    Content.findById(request.params.id).then(function(content) {
        if(content) {
            content.update(request.body).then(function(content){
                response.status(201).send(content)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/content/:Id', function(request, response) {
    Content.findById(request.params.Id).then(function(content) {
        if(content) {
            content.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/users/:Id/content', function(request, response) {
    Content.findAll({where:{User_id: request.params.Id}}).then(
            function(content) {
                response.status(200).send(content)
            }
        )
})


app.listen(8080);