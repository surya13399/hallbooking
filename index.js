import express, { request, response } from "express"; // default export
import { MongoClient } from "mongodb";
import dotenv from "dotenv"; 

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 3000
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
   const client = new MongoClient(MONGO_URL);
   await client.connect();
   return client;
} 

app.get("/customerdata",  async( request,response) =>{
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("customerdata").find({}).toArray();
    response.send(Room);
});

app.post("/customerdat", async(request, response) =>{
    const roomData = request.body;
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("customerdata").insertMany(roomData);
    response.send({msg: "BookedRoom"});
    response.send(Room);
});

 //Doubt
app.get("/rooms",  async( request,response) =>{
    const res = request.body;
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("bookedData").find({}).toArray();
    response.send(Room);
  
});
    


app.post("/creating-room", async(request, response) =>{
    const roomData = request.body;
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("bookedData").find({}).toArray();
    // console.log(Room);
    let validateId = true;
    // console.log(roomData);
     Room.map(element => {
        //  console.log(element); && element.bookedStatus === true
        if(element.id == roomData.id ){
             validateId = false;
            //  console.log(element);
        } else{
            // console.log("elsecaasw");
        }
    })
    if(validateId) {
        response.send({msg: "BookedRoom Successfully"});
    } else {
        response.send({msg: "Room has been occupied, please select another slot"});
    }
    // response.send({msg: "BookedRoom"});
    // response.send(Room);
});

app.post("/Roomrm", async(request, response) =>{
    const roomData = request.body;
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("bookedData").insertMany(roomData);
    response.send({msg: "BookedRoom"});
    response.send(Room);
});

app.get("/bookRoom",  async( request,response) =>{
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("bookRoom").find({}).toArray();
    response.send(Room);
});

app.post("/BookRoom", async(request, response) =>{
    const bookRoom = request.body;
    const client = await createConnection();
    const Rmee = await client.db("HallBooking").collection("bookRoom").insertMany(bookRoom);
    response.send({msg: "BookingRoom"});
   
});

app.get("/Rooms", async( request,response) =>{
    const client = await createConnection();
    const Rmee = await client.db("HallBooking").collection("Rooms").find({}).toArray();
    response.send(Rmee);
});

app.post("/Room", async(request, response) =>{
    const roomData = request.body;
    const client = await createConnection();
    const Room = await client.db("HallBooking").collection("Rooms").insertMany(roomData);
    response.send({msg: "Creating a Room"});
    response.send(Room);
});



app.listen(PORT, () => console.log("Server is listening", PORT));