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
  name: "product_finder",
  description:
    "finds and returns dummy products details from json dummy datas based on the product name passed to it",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getProductsJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async () => {
    try {
      const { data } = await axios.get(
        `https://api.npoint.io/2c308c84cfe292772cdf/items/item/`
      );
      return JSON.stringify(data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const tools = [PRODUCT_FINDER];
module.exports = tools;
