import mongoose from 'mongoose';

export default async function connectDB(){
    try {
        mongoose.connect('mongodb+srv://umarzzaib2:9r0dzyOwB0NLW2E8@skypecluster.t5agemp.mongodb.net/?retryWrites=true&w=majority&appName=skypeCluster')
  .then(() => console.log('Connected! to MongoDB'));
    }catch (err){
        console.log(`Error connecting to MongoDB: ${err.message}`);
    }
}
