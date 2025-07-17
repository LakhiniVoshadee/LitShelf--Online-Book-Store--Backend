import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
    {
        "id": {
            required: true,
            type: Number,
            unique: true,
        },
        "user":{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
       "books":[
            {
               "book":{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true,
                },
               "quantity":{
                    type: Number,
                    required: true,
                },
            },
        ],
       "totalAmount":{
            required: true,
            type: Number,
        },
       "status":{
            required: true,
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered'],
            default: 'pending',
        },
       "createdAt":{
            type: Date,
            default: Date.now,
        },
       "updatedAt":{
            type: Date,
            default: Date.now,
        },
    }
);

const Order = mongoose.model('Order', orderModel);

export default Order;