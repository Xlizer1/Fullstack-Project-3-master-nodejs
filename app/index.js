//  استيراد المكتبات المطلوبة | import the required libraries
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/route.js';
import bodyParser from 'body-parser';
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules

const start = async () => {

    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/teachers_students', {
       useNewUrlParser: true,
       useUnifiedTopology: true
    });

       console.log("connected to the DB");

       const app = express();
       app.use(bodyParser.urlencoded());

       console.log("app is created, lets setup routes");
       router(app);

       console.log("App routes added, lets listen on port 3000");
       app.listen(3000);

    }
    
    catch (error) {
       console.error(error);
    }
}
 start();






// لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests