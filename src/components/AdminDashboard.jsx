import { useEffect, useState } from "react";
import { getAllOrdersApi } from "../api/orderApi";
import { updateOrderStatusApi } from "../api/orderApi";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAllOrdersApi(token);

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllOrders();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const handleMarkDelivered = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await updateOrderStatusApi(
      id,
      "Delivered",
      token
    );

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id
          ? {
              ...order,
              orderStatus: "Delivered",
            }
          : order
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="p-10 pt-36 md:pt-36 flex flex-col justify-center items-start max-w-full mx-auto">
      <div className="bg-white shadow-lg rounded-lg w-full p-10 md:p-10 border border-gray-300">
        <h1 className="text-3xl text-center text-gray-600 font-bold mb-6">
        Admin Dashboard
      </h1>

      <h1 className="text-lg text-gray-500"><strong>Total Orders: </strong>{orders.length}</h1>
      <h1 className="text-lg text-gray-500"><strong>Total Revenue:</strong> ₹{totalRevenue}</h1>

      <div className="mt-6 space-y-4 ">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-8 mb-6 shadow-lg"
          >
            <p>
              <strong className="text-md text-gray-500">User:</strong>{" "}
              {order.user?.name}
            </p>

            <p>
              <strong className="text-md text-gray-500">Email:</strong>{" "}
              {order.user?.email}
            </p>

            <p>
              <strong className="text-md text-gray-500">Total:</strong> ₹
              {order.totalAmount}
            </p>

            <p>
              <strong className="text-md text-gray-500">Status:</strong>{" "}
              {order.orderStatus}
            </p>

            <p>
              <strong className="text-md text-gray-500">Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            {order.orderStatus === "Processing" && (
          <button
            onClick={() =>
              handleMarkDelivered(order._id)
            }
            className="mt-4 bg-amber-600 text-sm font-semibold text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition w-full"
          >
            Mark as Delivered
          </button>
        )}
          </div>
        ))}

      
          
    
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
