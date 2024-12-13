import mongoose from 'mongoose'

export const connectDB = async() => {

try {
    await mongoose.connect("mongodb+srv://yaliblancorobert:eIanydnV69o6o9yT@cluster0.saezf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        
    console.log('>>>>> Database MongoDB is connected <<<<<')
} catch (error) {
    console.log(error)
}

}