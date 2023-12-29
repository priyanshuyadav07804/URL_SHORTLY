const express = require('express');
const {connectDB} = require('./db/connectDB');
require('dotenv').config();
const cors = require('cors')

const app = express();

app.use(cors({
    origin:'*'
}))
app.use(express.json());

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 4000;

const main = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (error) {
        console.log(error)
    }

}

main()

