import AuthRouter from './src/Modules/Auth/Auth.Router.js'
import ProblemRouter from './src/Modules/Problem/Problem.Router.js'
import PostRouter from './src/Modules/Post/Post.Router.js'
import JobRouter from './src/Modules/Job/Job.Router.js'

import connectDb from './DB/Connection.js'

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

    app.get("*", (req, res) =>{
        return res.status(500).json({message:"page not found"})
    })
    

}
export default initApp 