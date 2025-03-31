import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITerm extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "completed";
  courses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isActive(): boolean;
}

export interface ITermModel extends Model<ITerm> {
  getCurrentTerm(): Promise<ITerm | null>;
}

const termSchema = new Schema<ITerm>(
  {
    name: {
      type: String,
      required: [true, "Term name is required"],
      trim: true,
      maxlength: [100, "Term name cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (this: ITerm, value: Date) {
          return value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    status: {
      type: String,
      enum: ["upcoming", "active", "completed"],
      default: "upcoming",
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        const { id, ...rest } = ret;
        return { id, ...rest };
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        const { id, ...rest } = ret;
        return { id, ...rest };
      },
    },
  }
);

// Indexes for better query performance
termSchema.index({ startDate: 1 });
termSchema.index({ status: 1 });
termSchema.index({ name: 1 });

// Virtual for term duration in days
termSchema.virtual("duration").get(function (this: ITerm) {
  return Math.ceil(
    (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
});

// Method to check if term is currently active
termSchema.methods.isActive = function (this: ITerm): boolean {
  const now = new Date();
  return now >= this.startDate && now <= this.endDate;
};

// Static method to get current active term
termSchema.statics.getCurrentTerm = async function (): Promise<ITerm | null> {
  const now = new Date();
  return this.findOne({
    startDate: { $lte: now },
    endDate: { $gte: now },
    status: "active",
  });
};

// Pre-save middleware to update status based on dates
termSchema.pre("save", function (this: ITerm, next) {
  const now = new Date();

  if (now < this.startDate) {
    this.status = "upcoming";
  } else if (now > this.endDate) {
    this.status = "completed";
  } else {
    this.status = "active";
  }

  next();
});

const Term = mongoose.model<ITerm, ITermModel>("Term", termSchema);

export default Term;
