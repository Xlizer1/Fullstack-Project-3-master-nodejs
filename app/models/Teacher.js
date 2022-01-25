// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library
import { hashPassword } from '../helper.js'
import shortId from 'shortid'
import pkg from 'mongoose';
const { Schema, model } = pkg;

// 2. قم بتحديد مخطط المدرس | start defining your user schema

const teacherSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    birthdate: String,
    city: String,
    salt: String
})

teacherSchema.pre('save', function(next) {
    if(!this.salt) {
        this.salt = shortId.generate();
    }

    if(this.password){
        this.password = hashPassword(this.password)
    }

  next();
});

// 3. إنشاء نموذج المدرس | create  the user model

const teacherModel = new model('oser', teacherSchema);

// تخزين كلمة السر بعد عمل الهاش

// 4. تصدير الوحدة | export the module
 export default teacherModel;