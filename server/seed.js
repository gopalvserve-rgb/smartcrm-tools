import bcrypt from "bcryptjs";
import { Admin, Tool } from "./models/index.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "./config.js";
import { connectDB } from "./db.js";

const TOOLS = [
  { slug: "whatsapp", name: "WhatsApp Direct", icon: "💬", tagline: "Chat without saving the number", order: 1 },
  { slug: "qr", name: "QR Code Generator", icon: "🔳", tagline: "Make a QR for anything", order: 2 },
  { slug: "card", name: "Visiting Card Maker", icon: "🪪", tagline: "Digital business card + QR", order: 3 },
  { slug: "follow-hub", name: "Social Follow Hub", icon: "🔗", tagline: "All your socials, one tap", order: 4 },
];

export async function ensureSeed() {
  // Admin
  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (!existing) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await Admin.create({ name: "Gopal", email: ADMIN_EMAIL.toLowerCase(), passwordHash, role: "super" });
    console.log("[seed] admin created:", ADMIN_EMAIL);
  }
  // Tools
  for (const t of TOOLS) {
    await Tool.updateOne({ slug: t.slug }, { $setOnInsert: { ...t, status: "live" } }, { upsert: true });
  }
  console.log("[seed] tools ensured");
}

// Allow `npm run seed`
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  connectDB()
    .then(ensureSeed)
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
