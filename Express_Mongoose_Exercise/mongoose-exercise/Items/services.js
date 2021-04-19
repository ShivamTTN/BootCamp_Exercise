const { itemModel } = require("./model");

module.exports.getAll = async () => {
  const items = await itemModel.find();
  return items;
};

module.exports.addItem = async ({
  name,
  quantity,
  unit,
  expiryDate,
  category,
  location,
}) => {
  const checkItem = await itemModel.findOne({ name: name });
  let item = null;
  if (checkItem) {
    item = await itemModel.updateOne(
      {
        _id: checkItem._id,
      },
      {
        name: name,
        quantity: quantity,
        unit: unit,
        expiryDate: expiryDate,
        category: category,
        location: location,
      }
    );
  } else {
    item = await itemModel.create({
      name: name,
      quantity: quantity,
      unit: unit,
      expiryDate: expiryDate,
      category: category,
      location: location,
    });
  }

  return item;
};

module.exports.updateItem = async (
  { id },
  { name, quantity, unit, expiryDate, category, location }
) => {
  const updatedItems = await itemModel.update(
    {
      _id: id,
    },
    {
      name: name,
      quantity: quantity,
      unit: unit,
      expiryDate: expiryDate,
      category: category,
      location: location,
    }
  );
  return updatedItems;
};

module.exports.deleteItem = async ({ id }) => {
  const response = await itemModel.deleteOne({
    _id: id,
  });
  return response;
};
