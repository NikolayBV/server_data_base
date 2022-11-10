import express from 'express';
import * as mongoose from "mongoose";
import myRoutes from './routes/routes';
import cors from 'cors';
import env from 'process';


const PORT = process.env.PORT || 8080;


const app = express();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(myRoutes)

const path: string | undefined = process.env["DATABASE_URL_MDB"];

async function start(){
    try{
        await mongoose.connect(path!);
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    }
    catch (e){
        console.log(e)
    }
}

start()




