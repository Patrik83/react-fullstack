import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const apiUrl = `${baseURL}`;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${apiUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (categoryName) => {
  try {
    const response = await axios.get(`${apiUrl}/categories/${categoryName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};