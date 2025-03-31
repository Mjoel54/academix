import { Router } from "express";
import {
  getAllTerms,
  getCurrentTerm,
  getTermById,
  createTerm,
  updateTerm,
  deleteTerm,
} from "../../controllers/termController";

const router = Router();

// GET /api/terms
router.get("/", getAllTerms);

// GET /api/terms/current
router.get("/current", getCurrentTerm);

// GET /api/terms/:id
router.get("/:id", getTermById);

// POST /api/terms
router.post("/", createTerm);

// PUT /api/terms/:id
router.put("/:id", updateTerm);

// DELETE /api/terms/:id
router.delete("/:id", deleteTerm);

export default router;
