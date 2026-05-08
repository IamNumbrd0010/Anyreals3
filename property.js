const properties = [];

for (let i = 1; i <= 20; i++) {
  properties.push({
    id: i,
    title: `Property ${i} in Lekki`,
    location: i % 2 === 0 ? "Lekki" : "Abuja",
    price: (i * 2000000),
    type: i % 3 === 0 ? "House" : "Apartment",
    status: "Sale",
    verified: i % 2 === 0,
    image: "https://via.placeholder.com/400x250",
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x401"
    ],
    description: "A well-built property with modern features."
  });
}