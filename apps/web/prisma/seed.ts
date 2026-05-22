import { PrismaClient, Role, ProductStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.upsert({ where: { email: "admin@avensio.local" }, update: {}, create: { email: "admin@avensio.local", passwordHash, role: Role.ADMIN, name: "Admin" } });
  const category = await prisma.category.upsert({ where: { slug: "electronics" }, update: {}, create: { name: "Electronics", slug: "electronics" } });
  await prisma.product.create({ data: { sellerId: admin.id, categoryId: category.id, title: "MVP Smartphone", slug: "mvp-smartphone", description: "Demo product", price: 49990, oldPrice: 59990, stock: 20, sku: "MVP-SMART-001", status: ProductStatus.APPROVED, specs: { brand: "Avensio", memory: "8/128" } } });
}

main().finally(() => prisma.$disconnect());
