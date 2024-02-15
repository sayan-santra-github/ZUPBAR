const mongoose =  require("mongoose")

const order_details_schema = new mongoose.schema({
    trip_id : {
        type: String,
    },
    amount: {
        type: Number,
    },
    order_id : {
        type: String,
    },
    razorpay_payment_id: {
        type: String,
        default: null,
    },
    razorpay_order_id: {
        type: String,
        default: null,
    },
    razorpay_signature: {
        type: String,
        default: null,
    }
},
{
    timestamps: true,
})

const order_details_model = mongoose.model('order_details_model', order_details_schema)

exports.exports = {
    order_details_model
}