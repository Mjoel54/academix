import { Schema } from "mongoose";

export interface IAssignment {
  title: string;
  description: string;
  dueDate: Date;
  totalPoints: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const assignmentSchema = new Schema<IAssignment>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
assignmentSchema.index({ dueDate: 1 });
