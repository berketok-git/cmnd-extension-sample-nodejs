require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const xml2js = require('xml2js');
const yupToJsonSchema = require("./yupToJsonSchema");

const getProductSchema = yup.object({
  product: yup.string().label("product").required("should be a string"),
});
const getProductsJSONSchema = yupToJsonSchema(getProductSchema);

const PRODUCT_FINDER = {
  name: "product_finder",
  description:
    "finds and returns property details from XML data based on the product name passed to it",
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
      const response = await axios.get('https://dovecconstruction.com/emlak.xml');
      const parser = new xml2js.Parser();
      let propertyDetails;
      parser.parseString(response.data, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const properties = result.emlak.property;
          propertyDetails = properties.find(property => property.title[0] === product);
        }
      });
      return JSON.stringify(propertyDetails);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const tools = [PRODUCT_FINDER];
module.exports = tools;