// Create web server using Express.js
// Create a route for POST /api/comments
// Validate the request body
// If invalid, return 400 Bad Request
// If valid, create a comment object and store in array
// Return the comment object with status 201 Created
const Joi = require('joi');
const express = require('express');
const app = express();
const comments = [
    {id: 1, name: 'Comment 1'},
    {id: 2, name: 'Comment 2'},
    {id: 3, name: 'Comment 3'},
    {id: 4, name: 'Comment 4'},
    {id: 5, name: 'Comment 5'},
    {id: 6, name: 'Comment 6'},
    {id: 7, name: 'Comment 7'},
    {id: 8, name: 'Comment 8'},
    {id: 9, name: 'Comment 9'},
    {id: 10, name: 'Comment 10'},
];

app.use(express.json());

app.get('/api/comments', (req, res) => {
    res.send(comments);
});

app.post('/api/comments', (req, res) => {
    const {error} = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = {
        id: comments.length + 1,
        name: req.body.name
    };
    comments.push(comment);
    res.status(201).send(comment);
});

function validateComment(comment) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(comment, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));