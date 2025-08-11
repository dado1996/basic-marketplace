import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  try {
    const diego = await prisma.users.upsert({
      where: {
        email: "diego@email.com",
      },
      create: {
        name: "Diego Delgado",
        email: "diego@email.com",
        password:
          "$2b$10$edetu3KnzRAgbI2ElMB9neb9Ce9BNQymKqtDs8GOsagVZXyMWuyt.",
        role: "BUSINESS",
      },
      update: {
        name: "Diego Delgado",
        password:
          "$2b$10$edetu3KnzRAgbI2ElMB9neb9Ce9BNQymKqtDs8GOsagVZXyMWuyt.",
      },
    });

    const lorena = await prisma.users.upsert({
      where: {
        email: "lorena@email.com",
      },
      create: {
        name: "Lorena Cañizales",
        email: "lorena@email.com",
        password:
          "55abeeb663404681396f263ccff33ba1:5a0f05e4c606e8973508980ce1fbb054c7197997a488159938f03549f37639194fe4f88d0e75f0977673856a26594c28f3e1f2e3e53f0d34a96f48b2289bbc08",
        role: "CLIENTE",
      },
      update: {
        name: "Lorena Cañizales",
        password:
          "55abeeb663404681396f263ccff33ba1:5a0f05e4c606e8973508980ce1fbb054c7197997a488159938f03549f37639194fe4f88d0e75f0977673856a26594c28f3e1f2e3e53f0d34a96f48b2289bbc08",
      },
    });

    const snacks = await prisma.stores.upsert({
      where: {
        id: 1,
      },
      create: {
        name: "Snacks SA",
        userId: diego.id,
      },
      update: {
        name: "Snacks SA",
        userId: diego.id,
      },
    });

    const beverages = await prisma.stores.upsert({
      where: {
        id: 2,
      },
      create: {
        name: "Beverages SA",
        userId: diego.id,
      },
      update: {
        name: "Beverages SA",
        userId: diego.id,
      },
    });

    const gol = await prisma.products.upsert({
      where: {
        id: 1,
      },
      create: {
        name: "Gol",
        description: "Gol candy bar",
        price: 3000,
        storeId: snacks.id,
      },
      update: {
        name: "Gol",
        description: "Gol candy bar",
        price: 3000,
        storeId: snacks.id,
      },
    });

    const doritos = await prisma.products.upsert({
      where: {
        id: 2,
      },
      create: {
        name: "Doritos",
        description: "Corn chips",
        price: 5500,
        storeId: snacks.id,
      },
      update: {
        name: "Doritos",
        description: "Corn chips",
        price: 5500,
        storeId: snacks.id,
      },
    });

    const cocacola = await prisma.products.upsert({
      where: {
        id: 3,
      },
      create: {
        name: "Coca Cola",
        description: "Sugary beverage",
        price: 4500,
        storeId: beverages.id,
      },
      update: {
        name: "Coca Cola",
        description: "Sugary beverage",
        price: 4500,
        storeId: beverages.id,
      },
    });

    const sprite = await prisma.products.upsert({
      where: {
        id: 4,
      },
      create: {
        name: "Sprite",
        description: "Sugary beverage with lemon",
        price: 3500,
        storeId: beverages.id,
      },
      update: {
        name: "Sprite",
        description: "Sugary beverage with lemon",
        price: 3500,
        storeId: beverages.id,
      },
    });

    console.log("users: ", diego, lorena);
    console.log("stores: ", snacks, beverages);
    console.log("products: ", gol, doritos, cocacola, sprite);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
}

main();
