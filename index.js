const express = require('express');
const app = express();
const path = require('path');
const fetch = require("node-fetch");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/components'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render('home');
})

app.get('/plans', async (req, res) => {
    res.render('plans');
})

app.post('/weather', async (req, res) => {
    const p = req.body.place;
    // console.log(p);
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${p}&appid=bc712872d3f4593f943b44199d195021`, { method: 'POST' })
        .then((response) => response.json())
        .then((result) => {
            // console.log(result.cod);
            if (result.cod != '404')
                res.render('info', { json: result });
            else
                res.render("error");
        })
        .catch((e) => {
            res.render("error");
        })
})

app.get('/about', async (req, res) => {
    res.render('about');
})
app.listen(3010, () => {
    console.log("Listen on port 3010");
})


// https://api.openweathermap.org/data/2.5/weather?q=ghazipur&appid=bc712872d3f4593f943b44199d195021