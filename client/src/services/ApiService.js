import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const apiUrl = `${baseURL}/products`;

export const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${apiUrl}/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${apiUrl}/category/${categoryName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};