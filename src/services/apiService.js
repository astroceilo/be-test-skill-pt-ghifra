import axios from "axios";

export const fetchProductsAPI = async () => {
  const url = "https://dummyjson.com/products";

  const { data } = await axios.get(url);

  const products = data.products.map((item) => {
    return {
      name: item.title,
      price: item.price,
      rating: Math.round(item.rating),
      source: "api",
      created_at: new Date()
    };
  });

  return products;
};