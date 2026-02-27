const express = require("express")
const path = require("path")
const userModel = require('./models/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/read", async (req, res) => {
    let allUsers = await userModel.find()
    res.render("read", { allUsers })
})

app.post("/create", async (req, res) => {
    // DeStacring the data from the request body
    let { name, email, image } = req.body
    let CreatedUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read")
})

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})