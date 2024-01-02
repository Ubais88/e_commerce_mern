import express from 'express';
// require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 8000;



app.get('/', (req , res) => {
    res.send("<h1>Server Is Ready</h1>")
})


app.listen(3330 , () => {
    console.log(`Server is listening on ${PORT}`);
})


