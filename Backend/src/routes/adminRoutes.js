const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");

router.post("/register", adminController.register);
router.post("/login", adminController.login);

router.get("/", adminController.getAll);
router.get("/:id", adminController.getById);
router.put("/:id", adminController.update);
router.delete("/:id", adminController.remove);
router.put("/:id/photo", upload.single("photo"), adminController.updatePhoto);

module.exports = router;
