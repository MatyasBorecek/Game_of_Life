const express = require('express');
const gameOfLifeService = require('./Services/Universe');

const app = express();
const port = 5000;

app.get('/nextGeneration', (req, res) => {
    const nextGeneration = gameOfLifeService.getNextGeneration();
    res.json(nextGeneration);
});

//By default, redirect to `/nextGeneration` end-point.
app.get('/', (req, res) => {
    res.redirect('/nextGeneration');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});