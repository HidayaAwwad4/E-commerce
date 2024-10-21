import connectDb  from '../DB/connection.js';
import authRouter from './Modules/auth/auth.router.js';
import categoryRouter from './Modules/category/category.router.js';

const initApp = (app,express)=>{
    connectDb();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/category',categoryRouter);
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not fount"});
    });
}
export default initApp;