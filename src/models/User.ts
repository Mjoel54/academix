import { Schema, model, Document } from "mongoose";
import Enrolment, { CourseRole, IEnrolment } from "./Enrolments";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  enrolments: IEnrolment[];
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;

  // Method declarations
  addEnrolment(
    courseId: Schema.Types.ObjectId,
    role: CourseRole
  ): Promise<void>;
  updateEnrolment(
    courseId: Schema.Types.ObjectId,
    updates: Partial<IEnrolment>
  ): Promise<void>;
  removeEnrolment(courseId: Schema.Types.ObjectId): Promise<void>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    enrolments: [Enrolment.schema],
    avatar: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ isAdmin: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ "enrolments.course": 1, "enrolments.role": 1 });

// Helper methods for enrolment management
userSchema.methods.addEnrolment = async function (
  courseId: Schema.Types.ObjectId,
  role: CourseRole
) {
  if (
    !this.enrolments.find(
      (e: IEnrolment) => e.course.toString() === courseId.toString()
    )
  ) {
    this.enrolments.push({
      course: courseId,
      role,
      enrolledAt: new Date(),
      isActive: true,
    });
    await this.save();
  }
};

userSchema.methods.updateEnrolment = async function (
  courseId: Schema.Types.ObjectId,
  updates: Partial<IEnrolment>
) {
  const enrolment = this.enrolments.find(
    (e: IEnrolment) => e.course.toString() === courseId.toString()
  );
  if (enrolment) {
    Object.assign(enrolment, updates);
    await this.save();
  }
};

userSchema.methods.removeEnrolment = async function (
  courseId: Schema.Types.ObjectId
) {
  const enrolmentIndex = this.enrolments.findIndex(
    (e: IEnrolment) => e.course.toString() === courseId.toString()
  );
  if (enrolmentIndex > -1) {
    this.enrolments[enrolmentIndex].isActive = false;
    await this.save();
  }
};

const User = model<IUser>("User", userSchema);

export default User;
