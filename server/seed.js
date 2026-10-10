import bcrypt from "bcryptjs";
import { Admin, Tool } from "./models/index.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "./config.js";
import { connectDB } from "./db.js";

const TOOLS = [
  // Live, fully built tools
  { slug: "whatsapp", name: "WhatsApp Direct", icon: "💬", tagline: "Chat without saving the number", href: "/whatsapp", comingSoon: false, order: 1 },
  { slug: "qr", name: "QR Code Generator", icon: "🔳", tagline: "Make a QR for anything", href: "/qr", comingSoon: false, order: 2 },
  { slug: "card", name: "Visiting Card Maker", icon: "🪪", tagline: "Digital business card + QR", href: "/card", comingSoon: false, order: 3 },
  { slug: "follow-hub", name: "Social Follow Hub", icon: "🔗", tagline: "All your socials, one tap", href: "/follow-hub", comingSoon: false, order: 4 },
  // Roadmap tools — listed with their own page (coming soon)
  { slug: "invoice", name: "Invoice & Quotation", icon: "🧾", tagline: "GST invoice & quote maker with PDF", href: "/t/invoice", comingSoon: true, order: 5 },
  { slug: "link-in-bio", name: "Link-in-Bio", icon: "📇", tagline: "One mini page for all your links", href: "/t/link-in-bio", comingSoon: true, order: 6 },
  { slug: "signature", name: "Email Signature", icon: "✍️", tagline: "Branded HTML signature generator", href: "/t/signature", comingSoon: true, order: 7 },
  { slug: "review", name: "Review Collector", icon: "⭐", tagline: "Collect Google reviews via a QR page", href: "/t/review", comingSoon: true, order: 8 },
  { slug: "utm", name: "UTM Builder", icon: "🎯", tagline: "Campaign link builder for ads", href: "/t/utm", comingSoon: true, order: 9 },
  { slug: "booking", name: "Booking Link", icon: "📅", tagline: "Simple appointment booking page", href: "/t/booking", comingSoon: true, order: 10 },
];

export async function ensureSeed() {
  // Admin
  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (!existing) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await Admin.create({ name: "Gopal", email: ADMIN_EMAIL.toLowerCase(), passwordHash, role: "super" });
    console.log("[seed] admin created:", ADMIN_EMAIL);
  }
  // Tools — keep display fields fresh ($set), but let admin's live/draft choice persist ($setOnInsert)
  for (const t of TOOLS) {
    await Tool.updateOne(
      { slug: t.slug },
      {
        $set: { name: t.name, icon: t.icon, tagline: t.tagline, href: t.href, comingSoon: t.comingSoon, order: t.order },
        $setOnInsert: { status: "live" },
      },
      { upsert: true }
    );
  }
  console.log("[seed] tools ensured:", TOOLS.length);
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
