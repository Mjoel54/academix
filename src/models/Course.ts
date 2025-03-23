import { Schema, model, Document, Types } from "mongoose";
import { IAssignment, assignmentSchema } from "./Assignment";

export interface ICourse extends Document {
  title: string;
  courseCode: string;
  sisId: string;
  description: string;
  term: string;
  accessFrom: Date;
  accessUntil: Date;
  assignments: Types.DocumentArray<IAssignment & Document>;
  modules: string[];
  students: string[];
  teachers: string[];
  teachingAssistants: string[];
  isPublished: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    sisId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    term: {
      type: String,
      required: true,
      enum: ["Fall", "Spring", "Summer", "Winter"],
    },
    accessFrom: {
      type: Date,
      required: true,
    },
    accessUntil: {
      type: Date,
      required: true,
    },
    assignments: [assignmentSchema],
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    teachingAssistants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
courseSchema.index({ courseCode: 1 }, { unique: true });
courseSchema.index({ sisId: 1 }, { unique: true });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ isArchived: 1 });

const Course = model<ICourse>("Course", courseSchema);

export default Course;
