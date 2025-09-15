import express from "express";
import multer from "multer";
import path from "path";
import {
  getReplays,
  addReplay,
  updateReplay,
  deleteReplay,
} from "../Controllers/replays.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
// ------------------------------------

router.get("/", getReplays);
router.post("/", upload.single('replayFile'), addReplay);

router.put("/:id", updateReplay);
router.delete("/:id", deleteReplay);

export default router;