require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const yupToJsonSchema = require("./yupToJsonSchema");

const getProductSchema = yup.object({
  product: yup.string().label("product").required("should be a string"),
});
const getProductsJSONSchema = yupToJsonSchema(getProductSchema);
const PRODUCT_FINDER = {
  name: "FASH",
  description:
    "find a suitable home",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getProductsJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ product }) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://www.nyckel.com/v0.9/functions/s3t9ht858vbw6406/search?includeData=true',
        headers: {
          'Authorization': 'Bearer ' + process.env.NYCKEL_API_KEY,
          'Content-Type': 'application/json',
        },
        data: {
          "data": product
        }
      });
      console.log(response.data);
      return JSON.stringify(response.data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const tools = [PRODUCT_FINDER];
module.exports = tools;
