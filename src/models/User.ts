import { Schema, model, Document } from "mongoose";

export type CourseRole = "student" | "teacher" | "teaching_assistant";

export interface IEnrollment {
  course: Schema.Types.ObjectId;
  role: CourseRole;
  enrolledAt: Date;
  lastAccessed?: Date;
  isActive: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  enrollments: IEnrollment[];
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
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
    enrollments: [enrollmentSchema],
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
userSchema.index({ "enrollments.course": 1, "enrollments.role": 1 });

// Helper methods for enrollment management
userSchema.methods.addEnrollment = async function (
  courseId: Schema.Types.ObjectId,
  role: CourseRole
) {
  if (
    !this.enrollments.find(
      (e: IEnrollment) => e.course.toString() === courseId.toString()
    )
  ) {
    this.enrollments.push({
      course: courseId,
      role,
      enrolledAt: new Date(),
      isActive: true,
    });
    await this.save();
  }
};

userSchema.methods.updateEnrollment = async function (
  courseId: Schema.Types.ObjectId,
  updates: Partial<IEnrollment>
) {
  const enrollment = this.enrollments.find(
    (e: IEnrollment) => e.course.toString() === courseId.toString()
  );
  if (enrollment) {
    Object.assign(enrollment, updates);
    await this.save();
  }
};

userSchema.methods.removeEnrollment = async function (
  courseId: Schema.Types.ObjectId
) {
  const enrollmentIndex = this.enrollments.findIndex(
    (e: IEnrollment) => e.course.toString() === courseId.toString()
  );
  if (enrollmentIndex > -1) {
    this.enrollments[enrollmentIndex].isActive = false;
    await this.save();
  }
};

const User = model<IUser>("User", userSchema);

export default User;
