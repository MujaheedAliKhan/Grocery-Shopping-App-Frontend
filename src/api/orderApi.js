const API_URL = import.meta.env.VITE_API_URL;

export const placeOrderApi = async (orderData, token) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to place order");
  }

  return data;
};

export const getMyOrdersApi = async (token) => {
      const res = await fetch(`${API_URL}/api/orders/my-orders`, 
        {
        method:"GET",
        headers:{
          Authorization: `Bearer ${token}`,  
        },
      });

      const data = res.json();

      if (!res.ok) {
    throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
};

export const cancelOrderApi = async (orderId, token) => {
    const res = await fetch(
    `${API_URL}/api/orders/cancel/${orderId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to cancel order"
    );
  }

  return data;
};

//Getting all orders from the backend
export const getAllOrdersApi = async (token) => {
    const res = await fetch(`${API_URL}/api/orders/all`, {
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();

    if(!res.ok){
       throw new Error(
      data.message || "Failed to fetch all orders"
    );
    };

    return data;
};

export const updateOrderStatusApi = async (
  orderId,
  orderStatus,
  token
) => {
  const res = await fetch(
    `${API_URL}/api/orders/status/${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderStatus,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to update status"
    );
  }

  return data;
};
