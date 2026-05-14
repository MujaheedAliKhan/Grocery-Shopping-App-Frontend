import React, { useEffect, useState } from "react";
import { getMyOrdersApi, cancelOrderApi } from "../api/orderApi";
import toast from "react-hot-toast";
import Back from "./Back";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleCancelOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await cancelOrderApi(id, token);

    setOrders((prev) =>
      prev.filter((order) => order._id !== id)
    );

    toast.success("Order Cancelled");
    
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await getMyOrdersApi(token);

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-screen md:pt-36 pt-38 p-10">
        <div className="bg-white shadow-lg p-10 rounded-lg border border-gray-300">
          <Back/>
          <h1 className="text-3xl text-center text-gray-600 font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-md text-gray-400">No orders found</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-4 mb-6 shadow-lg"
          >
            <p className="text-gray-500">
              <strong>Order Status:</strong>{" "}
              {order.orderStatus}
            </p>

            <p className="text-gray-500">
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p className="text-gray-500">
              <strong>Total:</strong> ₹
              {order.totalAmount}
            </p>

            <p className="mb-3 text-gray-500">
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <div className="text-gray-500">
              <strong>Products:</strong>

              {order.products.map(
                (item, index) => (
                  <div
                    key={index}
                    className="ml-4 mt-2"
                  >
                    {item.name} ×{" "}
                    {item.quantity} — ₹
                    {item.price}
                  </div>
                )
              )}

              <button 
              className="mt-4 bg-amber-600 text-sm font-semibold text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition w-full"
              onClick={() => handleCancelOrder(order._id)} >Cancel Order</button>
            </div>
          </div>
        ))
      )}
        </div>
    </div>
  );
};

export default Orders;