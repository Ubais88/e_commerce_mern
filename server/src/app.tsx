import express from 'express';
import userRoutes from "./routes/user.js"
// require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 8000;


// using routes
app.use('/ap1/v1/user', userRoutes)


app.get('/', (req , res) => {
    res.send("<h1>Server Is Ready</h1>")
})


app.listen(3330 , () => {
    console.log(`Server is listening on ${PORT}`);
})


