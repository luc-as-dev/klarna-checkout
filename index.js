
import {config} from "dotenv";
import express from "express";
config();
import { createOrder } from "./klarna.js";

const PORT = process.env.PORT;

const products = [
    {id:"1",name:"Chair",price:199},
    {id:"2",name:"Table",price:499},
    {id:"3",name:"Lamp",price:299}
];
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send(products.map(p=>{
        return `<a href="/p/${p.id}">${p.name}</a><br>`
    }).join(""));
});

app.get("/p/:id",async(req,res)=>{
    const product = products.find(p=>p.id===req.params.id);
    const data = await createOrder(product);
    res.send(data.html_snippet);
});

app.listen(PORT,()=>{
    console.log(`Server started on port: ${PORT}`);
});