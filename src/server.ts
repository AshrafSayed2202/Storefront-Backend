import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT, function () {
    console.log(`starting app on: ${address}`)
})

export default app;