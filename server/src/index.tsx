import express from 'express';



const  app =express();

const port = {};

app.get('/',(req, res) => {
    res.send('this is test app');
})

