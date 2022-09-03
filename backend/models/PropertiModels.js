const mongoose = require("mongoose");

const propertiSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a name of a properti"],
        trim: true,
        maxLength:[50, "Properti name not exceed than 50 characters"]
    },
    description:{
        type:String,
        required:[true, "Please add a description of your properti"],
        maxlength:[10000,"Description is can not exceed than 10000 characters"]
    },
    price:{
        type:Number,
        required: [true, "Please add a price for your properti"],
        maxLength:[20, "Price can not exceed than 20 characters"],
    },
    surfaceArea:{
        type:Number,
    },
    buildingArea:{
        type:Number,
    },
    bedroom:{
        type:Number,
    },
    bathroom:{
        type:Number,
    },
    nego:{
        type:Boolean,
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

module.exports = mongoose.model("Properti", propertiSchema);