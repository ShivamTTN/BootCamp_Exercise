const router = require("express").Router();
const itemController = require("./controller");
// console.log("h")
router.get("/items", itemController.getAll);

router.post("/items", itemController.create);

router.patch("/item/:id", itemController.update);

router.delete("/item/:id", itemController.deleteItem);

router.get("/",(req,res)=>{
   res.send("Request To /items")
})

module.exports = router;
