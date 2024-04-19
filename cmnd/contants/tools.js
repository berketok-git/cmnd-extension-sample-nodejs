const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const yupToJsonSchema = require("../../yupToJsonSchema");
const { json } = require("express");

const noParamsSchema = yup.object({});

const weatherCitySchema = yup.object({
  city: yup.string().label("city").required("should be a string"),
});

const getProductSchema = yup.object({
  product: yup.string().label("product").required("should be a string"),
});
const getFilePathSchema = yup.object({
  filePath: yup.string().label("filePath").required("should be a string"),
});

const noParamsJSONSchema = yupToJsonSchema(noParamsSchema);
const getFilePathJSONSchema = yupToJsonSchema(getFilePathSchema);
const getProductsJSONSchema = yupToJsonSchema(getProductSchema);
const weatherCityJSONSchema = yupToJsonSchema(weatherCitySchema);

const PRODUCT_FINDER = {
  name: "product_finder",
  description:
    "finds and returns dummy products details from json dummy datas based on the product name passed to it",
  category: "communication",
  subcategory: "hackathon",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getProductsJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ product }) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(product)}`
      );
      return JSON.stringify(data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};
const WEATHER_FROM_LOCATION = {
  name: "city_weather_data",
  description: "gets the weather details from a given city name",
  category: "communication",
  subcategory: "hackathon",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: weatherCityJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ city }) => {
    const newApiKey = "47dc35b3d4b2404b5638555fdec29645";
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${newApiKey}`
      );
      return JSON.stringify(data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};
const JSON_FILE_READER = {
  name: "json_file_reader",
  description:
    "gets the contents of the file given a filepath in the repository",
  category: "communication",
  subcategory: "hackathon",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getFilePathJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ filePath }) => {
    try {
      const buffer = fs.readFileSync(filePath);
      const dataString = buffer.toString("utf8");
      const jsonData = JSON.parse(dataString);
      const jsonString = JSON.stringify(jsonData);
      return jsonString;
    } catch (error) {
      return "An error ocured while looking for the file content";
    }
  },
};

const tools = [JSON_FILE_READER, PRODUCT_FINDER, WEATHER_FROM_LOCATION];
module.exports = tools;
