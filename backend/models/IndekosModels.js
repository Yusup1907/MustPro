const mongoose = require("mongoose");

const indekosSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a name of a indekos"],
        trim: true,
        maxLength:[50, "Indekos name not exceed than 50 characters"]
    },
    description:{
        type:String,
        required:[true, "Please add a description of your Indekos"],
        maxlength:[10000,"Description is can not exceed than 10000 characters"]
    },
    price:{
        type:Number,
        required: [true, "Please add a price for your Indekos"],
        maxLength:[20, "Price can not exceed than 20 characters"],
    },
    large:{
        type:Number,
    },
    bedroom:{
        type:Number,
    },
    bathroom:{
        type:Number,
    },
    location:{
        type: String,
    },
    facility:{
        type: String,
    },
    status:{
        type: String,
        required:[true,"Please add some status for your properti"],
    },
    ratings:{
        type: Number,
        default: 0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        }
    ],
    category:{
        type: String,
        required:[true,"Please add a category of your properti"],
    },
    Stock:{
        type: Number,
        required:[true,"Please add some stoke for your properti"],
        maxLength: [200, "Stock can not exceed than 200 characters"],
    },
  numOfReviews:{
      type: Number,
      default: 0
  },
  reviews:[
      {
          user: {
              type:mongoose.Schema.ObjectId,
              ref:"User",
              required: true,
          },
          name:{
              type: String,
              required: true,
          },
          comment:{
              type:String,
          },
          time:{
              type: Date,
              default: Date.now()
          },
      },
  ],
  user:{
      type: mongoose.Schema.ObjectId,
      ref:"User",
    //   required: true
  },
  createAt:{
      type:Date,
      default: Date.now()
  }
})

module.exports = mongoose.model("Indekos", indekosSchema);