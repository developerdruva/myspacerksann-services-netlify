import express, { Router } from "express";
import ServerlessHttp from "serverless-http";
// const express = require('express');
// const router = require('express/lib/router');   
// const ServerlessHttp = require('serverless-http');
const dotenv = require('dotenv');
import dotenv from 'dotenv';
// import DB from ''
const DB = require('./db/mongo/mongoConnection')
dotenv.config();

DB.connectToDB();
const PORT = process.env.PORT || 8080

const cors = require('cors');

const MyspaceRoutes = require('./routes/myspace.routes');
const SampleDataRoutes = require('./routes/sample.data.routes');
const UserAccountRoutes = require('./routes/account.user.routes');
// const todoListRoutes = require('./routes/todolist.user.routes');

const app = express();

app.use(express.json());
app.use(cors());

const router = Router();

router.get('/', (webReq, webRes) => {
    console.log('welcome this is myspace rksann application running.');
    console.log(process.env.AWS_POSTGRES_DATABASE)
    webRes.send({
        status: 'success',
        message: 'Server running successfully.'
    })
})
router.get('/sampleroute', (webReq, webRes)=> {
    webRes.send({
        status: 'success',
        message:'routes are working.'
    })
})
router.use(MyspaceRoutes);
router.use(SampleDataRoutes);
router.use(UserAccountRoutes);

app.use('/api/', router);

export const handler = ServerlessHttp(app);

// app.listen(
//     PORT,
//     () => {
//         console.clear();
//         console.log();
//         console.log('------------------------------ new run -------------------------------')
//         console.log(`server running on ${PORT}`)
//     }
// );
