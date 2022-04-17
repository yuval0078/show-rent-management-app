const mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/finale_project_usersDB'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
