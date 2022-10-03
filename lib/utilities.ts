import { faker } from "@faker-js/faker";

type product = {
  id: string;
  title: string;
  category: string;
  cpu: string;
  gpu: string;
  memory: string;
  storage: string;
  storageType: string;
  os: string;
  price: string;
  description: string;
};

export function capitalize(msg: string) {
  return msg
    .split(" ")
    .map((w, i) =>
      i === 0
        ? w
            .split("")
            .map((c, i) => (i === 0 ? c.toUpperCase() : c))
            .join("")
        : w
    )
    .join(" ");
}

export function generateRandomProducts(): product[] {
  const gpuNames = [
    "Nvidea Geforce GTX 1670Ti 4GB",
    "Nvidea Geforce RTX 3080 12GB",
    "AMD Readeon 6000 12GB",
    "Nvidea Geforce RTX 2080 6GB",
    "Intel HD Graphics 6200 4GB",
  ];
  const cpus = [
    "Intel core i5 11th gen 3.5Ghz",
    "Intel core i7 11th gen 3.6Ghz",
    "Intel core i9 12th gen 3.8Ghz",
    "AMD Rizon 3000 3.2ghz",
  ];

  const products = Array.from(Array(100).keys()).map((i) => ({
    id: faker.random.numeric(4),
    title: faker.commerce.product(),
    category: i % 2 === 0 ? "Laptop" : "Desktop",
    cpu: cpus[parseInt((Math.random() * 100).toFixed(0)) % cpus.length],
    gpu: gpuNames[parseInt((Math.random() * 100).toFixed(0)) % gpuNames.length],
    memory: "16GB",
    storage: "256GB",
    storageType: i % 2 === 0 ? "SSD" : "HDD",
    os: "Windows 10 Pro",
    price: faker.commerce.price(800, 2500),
    description: faker.commerce.productDescription(),
  }));

  return products;
}
