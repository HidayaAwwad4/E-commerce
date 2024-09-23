import connectDb  from '../DB/connection.js';

const initApp = (app,express)=>{
    connectDb();
    app.use(express.json());
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not fount"});
    });
}
export default initApp;