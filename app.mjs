import express from 'express';
import log from '@ajar/marker';
import fs from 'fs/promises';


const { PORT, HOST } = process.env;


const app = express()
app.use(express.json());

//middleware function that add new line to an http.log text file
/********************** */

//Read All
app.get('/readAll',  (req, res) => {(async ()=>{
let data = await fs.readFile('database.json');
res.status(200).send(data)
})().catch(log.error)
})

//Read
app.get('/read/:item_id',  (req, res) => {(async ()=>{
    let data = await fs.readFile('database.json');
    const dataArray = JSON.parse(data);
    for(let i=0;i<dataArray.length;i++){
        if(dataArray[i].id == req.params.item_id){
            res.status(200).send(dataArray[i])
        }
    }
    res.status(200).send("Not found")
    })().catch(log.error)
    })

//Create
app.post('/create',  (req, res) => {(async ()=>{
    let data = await fs.readFile('database.json');
    const dataArray = JSON.parse(data);
    dataArray.push(req.body);
    await fs.writeFile('database.json', JSON.stringify(dataArray, null, 2));
    res.status(200).send("Created successfully");
    })().catch(log.error)
    })

//Update
app.put('/update/:item_id',  (req, res) => {(async ()=>{
    let data = await fs.readFile('database.json');
    const dataArray = JSON.parse(data);
    for(let i=0;i<dataArray.length;i++){
        if(dataArray[i].id == req.params.item_id){
            dataArray[i] = req.body;
        }
    }
    await fs.writeFile('database.json', JSON.stringify(dataArray, null, 2));
    res.status(200).send("Update successfully");
    })().catch(log.error)
    })

//Delete
/********************** */




app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------
/*
### Challenge instructions

1. Install the `morgan` 3rd party middleware  
use the middleware in your app:  
         `app.use( morgan('dev') );`

2.  Define more routing functions that use
    - `req.query` - access the querystring part of the request url
    - `req.params` - access dynamic parts of the url
    - `req.body` - access the request body of a **POST** request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

3. return api json response
4. return html markup response
5. return 404 status with a custom response to unsupported routes


*/
