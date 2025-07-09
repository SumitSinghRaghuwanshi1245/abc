// -------------------- OTHER IMPORT FILES -------------------- //
import axios from '../axios_API/axios.js';

const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

// Note : use axios createed at that axios_API file

// ------ 1. Fetching categories from the API ------
export const fetchCategories = async () => {
  try {
    const response = await axios.get('/product/get-all-categories');
    const result = response.data.data;

    const categoryMap = new Map();

    result.forEach((item) => {
      const newcategory = item.category;
      if (!categoryMap.has(newcategory)) {
        categoryMap.set(newcategory, {
          title: newcategory,
          imageSrc: 'https://t4.ftcdn.net/jpg/08/29/67/07/360_F_829670705_84pA7wfFApIxR337znVLhzEj4TjCXT7X.jpg', // Common image for all categories
          href: `/categories/${newcategory?.toLowerCase()}`,
        });
      }
    });
    return Array.from(categoryMap.values());
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// ------ 2. Fetching products by categories ------
export const fetchProductsByCategories = async (category) => {
  try {
    const response = await axios.get('/product/get-all');
    const products = response.data?.data || [];

    const filteredProducts = products.filter(
      (product) => product.category && product.category.toLowerCase() === category.toLowerCase()
    );

    return shuffleArray(filteredProducts);
  } catch (error) {
    console.error(`Error fetching products for category: ${category}`, error);
    throw error;
  }
};

// ------ 3. Fetching a single product by ID ------
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`/product/get-single/?id=${productId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};


// ------ 5. Fetching all products ------
export const fetchProducts = async () => {
  try {
    const response = await axios.get('/product/get-all');
    if (response.status !== 200) {
      throw new Error('Failed to fetch products');
    }
    const products = response.data.data;
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
// ------ 6. Fetching products by category ------
export const fetchProductsByCategoryWise = async (categoryTag, PRODUCTS_PER_PAGE, page) => {
  try {
    const response = await axios.post('/product/productsByCategory', {
      category: { category: categoryTag },
      limit: PRODUCTS_PER_PAGE,
      pageno: page,
    });
    if (response.status === 200) {
      return response.data.data; // assuming 'data' contains the products array
    } else {
      throw new Error('Failed to fetch products for the category');
    }
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchProductsByMultipleCategories = async (categories, limit = 10, pageno = 1) => {
  try {
    const response = await axios.post(
      "/product/multipleCategories",
      { categories, limit, pageno }
    );

    return response?.data;
  } catch (error) {
    console.error("Failed to fetch products by multiple categories:", error.response?.data || error.message);
    return null;
  }
};

// ------ 8. Fetching products by query ------  
export const fetchProductsByQuery = async (query) => {
  try {
    const response = await axios.get(`/product/searchProducts`, {
      params: query,
    });
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products by query:", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get("/user/get-account");
    return response.data.data;
  }
  catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchMyOrder = async () => {
  try {
    const response = await axios.get(
      "/user-order/get-user-order"
    );
    return response.data.data.reverse();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


// -------------fetch product recommendation based on user ------------- //
export const fetchRecommendedProducts = async (userId) => { 
  try {
    const response = await axios.get(`/product/suggestions/${userId}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    throw error;
  }
}