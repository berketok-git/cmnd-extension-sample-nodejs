const tools = require("./tools");

const getTools = (req, res) => {
  const toolsMapped = tools.map((t) => {
    return {
      name: t.name,
      description: t.description,
      jsonSchema: t.parameters,
      isDangerous: t.dangerous,
      functionType: t.functionType,
      isLongRunningTool: t.isLongRunningTool,
      rerun: t.rerun,
      rerunWithDifferentParameters: t.rerunWithDifferentParameters,
    };
  });
  res.send({ tools: toolsMapped });
};

module.exports = getTools;
