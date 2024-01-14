var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

//connect to the database
mongoose.connect(process.env.MONGO_URI);

//create schema - it's like a blueprint
var todoSchema = new mongoose.Schema({
    item:String
});

// create a model
   var Todo = mongoose.model('Todo', todoSchema);
// var item1 = Todo({item:'buy flowers'}).save()


// var data = [{ item: 'Get Milk' }, { item: 'Walk Dog' }, { item: 'Kick some coding ass' }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    app.get('/todo', async function (req, res) {
        try {
            const data = await Todo.find();
            res.render('todo', { todos: data });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/todo', urlencodedParser, async function (req, res) {
        try {
            const newData = new Todo(req.body);
            const data = await newData.save();
            res.json(data);
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.delete('/todo/:item', async function (req, res) {
        try {
            const data = await Todo.findOneAndDelete({ item: req.params.item.replace(/\-/g, " ") });
            res.json(data);
        } catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

