import { Schema, model, Document } from "mongoose";

export type CourseRole = "student" | "teacher" | "teaching_assistant";

export interface IEnrolment {
  course: Schema.Types.ObjectId;
  role: CourseRole;
  enrolledAt: Date;
  lastAccessed?: Date;
  isActive: boolean;
}

const enrolmentSchema = new Schema<IEnrolment>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher", "teaching_assistant"],
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessed: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Enrolment = model<IEnrolment>("Enrolment", enrolmentSchema);

export default Enrolment;
