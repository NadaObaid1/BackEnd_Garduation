import AuthRouter from './src/Modules/Auth/Auth.Router.js'
import connectDb from './DB/Connection.js'
import EmployeeRouter from './src/Modules/Employees/Employee.Router.js';

const initApp =(app, express)=>{
    connectDb()
    app.use(express.json())
    app.get("/", (req, res) =>{
        return res.status(200).json({message:"welcome"})
    })

    app.use("/auth", AuthRouter)
    
    app.use("/employees", EmployeeRouter)

    app.get("*", (req, res) =>{
        return res.status(500).json({message:"page not found"})
    })
    

}
export default initApp 

