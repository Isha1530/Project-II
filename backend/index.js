const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        console.log("Connected to MongoDB");
        // Create default admin if not exists
        const Admin = require("./models/adminSchema.js");
        const bcrypt = require("bcrypt");
        const defaultAdmin = {
            name: "Default Admin",
            email: "admin@example.com",
            password: "admin123",
            schoolName: "Default School"
        };
        const existing = await Admin.findOne({ email: defaultAdmin.email });
        if (!existing) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(defaultAdmin.password, salt);
            await Admin.create({
                ...defaultAdmin,
                password: hashedPass
            });
            console.log("Default admin created: email=admin@example.com, password=admin123");
        } else {
            console.log("Default admin already exists");
        }
    })
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})