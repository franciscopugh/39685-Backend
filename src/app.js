import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import __dirname from './path.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import cors from 'cors'

const whiteList = ['https://39685-frontend-production.up.railway.app/']

const corsOptions = (req, callback) => {
    const origin = req.header('Origin')
    if (whiteList.includes(origin)) {
        callback(null, true)
    } else {
        callback(new Error('No soportado por cors'))
    }
}
const app = express();

app.use(cors(corsOptions))
const PORT = process.env.PORT || 8080;
await mongoose.connect(process.env.MONGO_URL)

console.log("Hola")
console.log("Testing")
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Doc de mi aplicacion",
            decription: "Aqui iria la descripcion de mi proyecto"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
