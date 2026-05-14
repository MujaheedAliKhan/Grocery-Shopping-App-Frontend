const API_URL = import.meta.env.VITE_API_URL;

//Login API
export const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Login error: ",error);
    throw error;
  }
};

//Register API
export const registerApi = async (name, email, password, role) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });


    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message);
    }
    
    return data;
  } catch (error) {
    console.log("Registration error: ",error);
    throw error;
  }
};

//Fetching Current User
export const getCurrentUserApi = async (token) => {

   try {

      const response = await fetch(`${API_URL}/api/auth/me`, 
        {
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      const data = await response.json();

      return data;

   } catch (error) {

      console.log("Error fetching current user:", error);

      throw error;
   }
};
