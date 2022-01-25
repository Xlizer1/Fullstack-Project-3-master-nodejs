// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes

import Joi from "joi";
import jwt from 'jsonwebtoken'
import { hashPassword } from "../helper.js";

// 1. استيراد وحدةالمدرس | import the teacher module

import teacherModel from "../models/Teacher.js";

// 2. استيراد وحدة الطالب | import the student module

// import studentModel from "../models/Student.js";

// 3. تسجيل مدرس جديد و تخزين بياناته | new teacher sign up
const router = (app) => {
    app.post('/user/register', async (req,res) => {
        const {name, email, password, birthdate, city} = req.body;

        const bodySchema = Joi.object({

        name: Joi.string().required(),
        email: Joi.string().email().required(),       
        password: Joi.string().min(6).required(),
        birthdate: Joi.string().required(),
        city: Joi.string().required()

        })

        const validationResult = bodySchema.validate(req.body);

        if(validationResult.error){
            res.statusCode = 400;
            res.send(validationResult.error.details[0].message);
            return
        }

        try {
        const newUser = new teacherModel({
            name,
            email,
            password,
            birthdate,
            city
        })

        await newUser.save();

        res.send(newUser);
        } catch (error){
        res.send(error.message);
        }
    })

    // 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token

    app.post('/user/login', async (req, res) => {
        const {email, password} = req.body;
        
        const user = await teacherModel.findOne({email});

        if(!user){
            res.statusCode = 401;
            res.send('User Not Found!!!')
        } else {
            if(user.password === hashPassword(password)) {
                const token = jwt.sign({sub: user._id}, user.salt, {expiresIn: 30})
                res.send(token)
            } else {
                res.statusCode = 403;
                res.send('password is wrong')
            }
        }
    })

    // 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)

    app.get('/user/data', async (req, res) => {
        const conditions = {};

        try {
            const token = req.headers.authorization;

            if(!token){
               res.statusCode = 401;
               res.send('You do not have Permisson!!!')
            }

            const decodedToken = jwt.decode(token);

            const user = await teacherModel.findById(decodedToken.sub);

            if(!user){
               res.statusCode = 401;
               res.send('You do not have Permisson!!!')
               return
            }
           } catch (error) {
            res.statusCode = 401;
            console.log(error.message);
           }

           const data = await teacherModel.find(conditions)

           res.send(data);
    })
    app.put('/user/:id', async (req, res) => {
        const {id} = req.params;
        const user = await teacherModel.findById(id);

        if(!user){
        res.statusCode = 404;
        res.send('User Not Found!!!')
        } else {
        const {birthdate, city} = req.body;

        if(birthdate, city){
            user.birthdate = birthdate;
            user.city = city;
            user.save();
        }
        res.send(user);
        }
    })
    app.del('/user/:id', async (req,res) => {
        const {id} = req.params;
        const user = await teacherModel.findById(id);

        if(!user){
            res.statusCode = 404;
            res.send('User Not Found!!!')
            } else {
                return teacherModel.remove();
            }
    })
}
// 3. تصدير الوحدة | export the module
 export default router;