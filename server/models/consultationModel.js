import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true}, 
    guests: {type: Number, required: true}, 
    status: {type: String, default: "booking made"},
},{timestamps: true},)

const consultModel = mongoose.models.sconsult || mongoose.model('sconsult', ordersShema);

export default consultModel;