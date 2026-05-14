const API_URL = import.meta.env.VITE_API_URL;

//Fetching product - API
export const getProductsApi = async () => {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log("Error in fetching products", error);
        throw error;
    }
};

//Deleting product by ID - API
export const deleteProductApi = async (id, token) => {
    try {

      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
};

//Add Product API
export const addProductApi = async (formData, token) => {
    try {
        const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = response.json();

      return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//Edit Product API
export const editProductApi = async (id, formData, token) => {
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = response.json();

      return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//Fetching product to Edit - API
export const getProductsByIdApi = async (id) => {
     try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();
        return data;
     } catch (error) {
        console.log(error);
        throw error;
     }
}