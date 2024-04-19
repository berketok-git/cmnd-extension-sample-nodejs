const PORT = process.env.PORT || 8000;
const express = require("express");
const bodyParser = require("body-parser");
const getTools = require("./cmnd/contants/getTools");
const app = express();
const postRunTool = require("./cmnd/contants/runTool");
app.use(bodyParser.json());

app.get("/cmnd-tools", (req, res) => {
  const tools = getTools(req, res);
  res.json(tools);
});

app.post("/run-cmnd-tool", postRunTool);

app.listen(PORT, () =>
  console.log(`server running on PORT http://localhost:${PORT}`)
);
