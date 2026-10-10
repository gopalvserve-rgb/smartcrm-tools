import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
  },
  { timestamps: true }
);

const AdminSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["super", "staff"], default: "super" },
  },
  { timestamps: true }
);

const ToolSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: String,
    icon: String,
    tagline: String,
    href: String, // route to open this tool
    comingSoon: { type: Boolean, default: false },
    status: { type: String, enum: ["live", "draft"], default: "live" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// A saved creation from any tool (QR, card, wa-link, follow-hub...)
const GenerationSchema = new Schema(
  {
    shortId: { type: String, required: true, unique: true, index: true },
    tool: { type: String, required: true }, // slug
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    data: { type: Schema.Types.Mixed, default: {} }, // tool-specific payload
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const LeadSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    sourceTool: String,
    note: String,
    pushedToCrm: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model("User", UserSchema);
export const Admin = mongoose.models.Admin || model("Admin", AdminSchema);
export const Tool = mongoose.models.Tool || model("Tool", ToolSchema);
export const Generation = mongoose.models.Generation || model("Generation", GenerationSchema);
export const Lead = mongoose.models.Lead || model("Lead", LeadSchema);
