const express = require('express');
const users = require("./MOCK_DATA.json")
const app = express();
const fs = require('fs');

const PORT =8000;

//middleware
app.use(express.urlencoded({extended:false}));
//routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
});
app.get('/users',(req,res) => {
    const html =`
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send()

});

app.get("/api/users/:id", (req,res) => {
    const id= Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users",(req,res) => {
    const body = req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {

    return res.json({status:"pending"});
    });
});

app.patch("/api/users/:id", (req,res) => {
    return res.json({status:"pending"});
}); 
app.listen(PORT ,() => console.log(`server is running on port: ${PORT}` ));