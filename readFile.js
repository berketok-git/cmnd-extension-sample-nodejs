const fs = require("fs");

const filePath = "data.json";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log("File contents:", JSON.stringify(jsonData));
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});
