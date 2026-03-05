import "dotenv/config";
import prisma from "../lib/prisma";

async function testDatabase() {
  console.log("🔍 Testing Prisma Postgres connection...\n");

  try {
    console.log("✅ Connected to database!");

    console.log("\n📝 Creating a test inquiry...");
    const newInquiry = await prisma.inquiry.create({
      data: {
        name: "Demo User",
        email: "demo@example.com",
        message: "Testing Prisma connection.",
      },
    });
    console.log("✅ Created inquiry:", newInquiry);

    console.log("\n📋 Fetching all inquiries...");
    const allInquiries = await prisma.inquiry.findMany();
    console.log(`✅ Found ${allInquiries.length} inquiry(s):`);
    allInquiries.forEach((inquiry) => {
      console.log(`   - ${inquiry.name} (${inquiry.email})`);
    });

    console.log("\n🎉 All tests passed! Your database is working perfectly.\n");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testDatabase();
