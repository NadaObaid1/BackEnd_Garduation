import AuthRouter from './src/Modules/Auth/Auth.Router.js'
import ProblemRouter from './src/Modules/Problem/Problem.Router.js'
import PostRouter from './src/Modules/Post/Post.Router.js'
import JobRouter from './src/Modules/Job/Job.Router.js'
import UploadjobRouter from './src/Modules/Uploadjob/Uploadjob.Router.js'

import ServicesRouter from './src/Modules/Services/Services.Router.js'
import connectDb from './DB/Connection.js'
import EmployeeRouter from './src/Modules/Employees/Employee.Router.js';
import SalonRouter from './src/Modules/Salons/Salon.Router.js';
import AppointmentRouter from './src/Modules/Appointments/Appointment.Router.js';
import ProductRouter from './src/Modules/Products/Products.Router.js'
import ProfileRouter from './src/Modules/Profile/Profile.Router.js'


const initApp =(app, express)=>{
    connectDb()
    app.use(express.json())
    app.get("/", (req, res) =>{
        return res.status(200).json({message:"welcome"})
    })

    app.use("/auth", AuthRouter)
    app.use("/problems", ProblemRouter)
    app.use("/posts", PostRouter)
    app.use("/jobs", JobRouter)
    app.use("/employees", EmployeeRouter)
    app.use("/services", ServicesRouter)
    app.use("/products", ProductRouter)
    app.use("/salons", SalonRouter)
    app.use("/appointments", AppointmentRouter)
    app.use("/profiles", ProfileRouter)
    app.use("/uploadjobs", UploadjobRouter)

    app.get("*", (req, res) =>{
        return res.status(500).json({message:"page not found"})
    })
    

}
export default initApp 

