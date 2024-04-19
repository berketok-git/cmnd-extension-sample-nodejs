const tools = require("./tools");

const postRunTool = async (req, res) => {
  const args = req.body;
  const toolToRun = tools.find((t) => t.name === args.toolName);
  const results = await toolToRun.runCmd(args.props);
  res.send(`tool result: ${results}`);
};

module.exports = postRunTool;
