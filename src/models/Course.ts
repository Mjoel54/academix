import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  assignments?: string[];
  students?: string[];
  teachers?: string[];
}

const roomSchema = new Schema<ICourse>({
  title: { type: String, required: true, trim: true, maxlength: 50 },
  assignments: { type: [String], required: false },
  students: { type: [String], required: false },
  teachers: { type: [String], required: false },
});

// To use the schema definition, we need to convert roomSchema into a Model we can work with.
const Course = model<ICourse>("Course", roomSchema);

export default Course;
