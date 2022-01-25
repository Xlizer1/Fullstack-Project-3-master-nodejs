// // في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module

// // 1. قم باستيراد مكتبة moongoose | import the mongoose library
// import pkg from 'mongoose';
// const { Schema, model } = pkg;
// // 2. قم بتحديد مخطط الطالب | start defining your user schema

// const studentSchema = new Schema({
//     name: String,
//     email: {type: String, unique: true},
//     password: String,
//     birthdate: String,
//     city: String
// })

// // 3. إنشاء نموذج الطالب | create  the user model

// const studentModel = new model('oser', studentSchema)

// // 4. تصدير الوحدة | export the module
// export default studentModel;