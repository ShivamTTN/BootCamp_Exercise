const itemService = require("./services");

module.exports.create = async (req, res) => {
  const response = await itemService.addItem(req.body);
  // console.log(req);
  res.send(response);
};

module.exports.getAll = async (req, res) => {
  
  const response = await itemService.getAll();
  res.send(response);
};

module.exports.update = async (req, res) => {
  const response = await itemService.updateItem(req.params, req.body);
  res.send(response);
};

module.exports.deleteItem = async (req, res) => {
  // console.log(req.params);
  const response = await itemService.deleteItem(req.params);
  res.send(response);
};
