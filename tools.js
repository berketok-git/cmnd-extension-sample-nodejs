require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const yupToJsonSchema = require("./yupToJsonSchema");

const getProductSchema = yup.object({
  product: yup.string().label("product").required("should be a string"),
});
const getProductsJSONSchema = yupToJsonSchema(getProductSchema);

const PRODUCT_FINDER = {
  name: "product_finder",
  description:
    "finds and returns product details from Nyckel API based on the product name passed to it",
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
          'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE3MTQyMTU4MjYsImV4cCI6MTcxNDIxOTQyNiwiaXNzIjoiaHR0cHM6Ly93d3cubnlja2VsLmNvbSIsImNsaWVudF9pZCI6InFxY284Ynk1dXN5M3M1YXIxb3o2YzJqY3dobGxsMGFwIiwianRpIjoiOTJGRjZEMjI4QTQ5MjAzMTIwRkFFQjJDNzdBMTM1NEEiLCJpYXQiOjE3MTQyMTU4MjYsInNjb3BlIjpbImFwaSJdfQ.LwtL3oLy8Q1Mf03WCoCSoDuyORZjogGg45at76-JSSo8-1p-Gl4jy3_5YGc8dDzQdZwYpqUyfhtvKFM-ZSnEZBuc0VzCnvBLGk5aDq6-T8M5G02xXrjv3etj8w5TySIEaht7BUijxu-ku-psqGQgn8L6pGJAAJ2SzpROKzE58N8EU7rBb0bi0J-SJSHxAi-WA31f2U8YUtxKyDo7nBow0ZnXbI6t49ja-FjP3h_Mr8Ue4xRF_IY4kjDJ83P7CY4Q3C0ihDeAIwURU5pEEprruq2ZRCTxCG1ixjXK5kYJYR5o-RoOBjs1i9eIiPVxXZh6MpwAzBWBL1D4J_Ercq0UXw',
          'Content-Type': 'application/json',
        },
        data: {
          "data": product
        }
      });
      return JSON.stringify(response.data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const tools = [PRODUCT_FINDER];
module.exports = tools;