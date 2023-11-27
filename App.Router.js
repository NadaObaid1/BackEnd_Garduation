import AuthRouter from './src/Modules/Auth/Auth.Router.js'
import connectDb from './DB/Connection.js'

const initApp =(app, express)=>{
    connectDb()
    app.use(express.json())
    app.get("/", (req, res) =>{
        return res.status(200).json({message:"welcome"})
    })

    app.use("/auth", AuthRouter)

    app.get("*", (req, res) =>{
        return res.status(500).json({message:"page not found"})
    })
    

}
export default initApp 