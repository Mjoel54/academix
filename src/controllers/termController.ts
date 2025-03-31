import { Request, Response } from "express";
import Term, { ITerm, ITermModel } from "../models/Term";
import mongoose from "mongoose";

// GET all terms
export const getAllTerms = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const terms = await Term.find().sort({ startDate: -1 });
    res.status(200).json({
      success: true,
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch terms",
    });
  }
};

// GET current active term
export const getCurrentTerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const currentTerm = await Term.getCurrentTerm();
    if (!currentTerm) {
      res.status(404).json({
        success: false,
        error: "No active term found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: currentTerm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch current term",
    });
  }
};

// GET term by ID
export const getTermById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const term = await Term.findById(req.params.id);
    if (!term) {
      res.status(404).json({
        success: false,
        error: "Term not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: term,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch term",
    });
  }
};

// POST create new term
export const createTerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, startDate, endDate } = req.body;

    // Validate required fields
    if (!name || !startDate || !endDate) {
      res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      });
      return;
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      res.status(400).json({
        success: false,
        error: "End date must be after start date",
      });
      return;
    }

    const term = await Term.create(req.body);
    res.status(201).json({
      success: true,
      data: term,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: "Failed to create term",
    });
  }
};

// PUT update term
export const updateTerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, startDate, endDate } = req.body;

    // Validate dates if both are provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end <= start) {
        res.status(400).json({
          success: false,
          error: "End date must be after start date",
        });
        return;
      }
    }

    const term = await Term.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!term) {
      res.status(404).json({
        success: false,
        error: "Term not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: term,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: "Failed to update term",
    });
  }
};

// DELETE term
export const deleteTerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const term = await Term.findByIdAndDelete(req.params.id);

    if (!term) {
      res.status(404).json({
        success: false,
        error: "Term not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete term",
    });
  }
};
