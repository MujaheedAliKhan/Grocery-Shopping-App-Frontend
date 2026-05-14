import React, { useState } from "react";
import toast from "react-hot-toast";
import Back from "../components/Back";
import { placeOrderApi } from "../api/orderApi.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = ({ cart, setCart, Loading }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  //Increase And Decrease Functionality
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  //Remove Item Functionality
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  //Handle Place order functionality
  const handlePlaceOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      // Find only the clicked product
      const selectedProduct = cart.find((item) => item._id === id);

      const orderData = {
        products: [
          {
            product: selectedProduct._id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: selectedProduct.quantity,
            image: selectedProduct.image,
          },
        ],
        totalAmount: selectedProduct.price * selectedProduct.quantity,
        paymentMethod: paymentMethod,
      };

      await placeOrderApi(orderData, token);

      // Remove only that product
      const updatedCart = cart.filter((item) => item._id !== id);

      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      toast.success("Order placed!");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <>
      {Loading ? (
        <div className="min-h-screen  flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen max-w-6xl mx-auto flex flex-col justify-start items-start md:pt-36 md:p-30 pt-38 p-14 w-full">
          <div className="flex flex-col justify-start items-start p-8 md:p-10 border border-gray-300 bg-white rounded-lg w-full py-12 shadow-lg">
            <Back />
            <h1 className="text-2xl md:text-3xl mb-4 md:mb-4">Cart Items</h1>
            {cart.length === 0 ? (
              <div>
                <p className="text-md md:text-lg text-gray-400">
                  No items Added yet!
                </p>
              </div>
            ) : (
              <>
                {cart.map((item, id) => (
                  <div
                    key={item._id}
                    className="grid md:grid-cols-1 grid-cols-1 w-full border border-gray-300 md:p-8 p-4 shadow-lg rounded-md bg-gray-50 mb-4"
                  >
                    <div className="flex justify-around md:justify-between items-center flex-wrap-reverse">
                      <div className="flex flex-col justify-center items-start">
                        <h3 className="mt-2 font-semibold text-xl">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-lg">₹{item.price}/-</p>
                        <span className="text-gray-600 text-md flex gap-2 mb-2">
                          <button
                            className="px-2 bg-amber-600 text-white rounded-sm shadow-md"
                            onClick={() => decreaseQty(item._id)}
                          >
                            -
                          </button>
                          Quantity: {item.quantity}
                          <button
                            className="px-2 bg-amber-600 text-white rounded-sm shadow-md"
                            onClick={() => increaseQty(item._id)}
                          >
                            +
                          </button>
                        </span>

                        <button
                          onClick={() => {
                            removeItem(item._id);
                            toast.success("Removed From Cart");
                          }}
                          className="bg-red-600 py-2 px-4 text-sm rounded-md shadow-lg hover:bg-red-500 transition duration-150 text-white font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div>
                        <img
                          className="w-34 h-34 object-cover rounded-lg shadow-md"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-4">
                      <h2 className="font-bold mb-2 text-gray-600">Select Payment Method</h2>

                      <label className="block">
                        <input
                          type="radio"
                          value="Cash On Delivery"
                          checked={paymentMethod === "Cash On Delivery"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="ml-2 text-gray-400">Cash On Delivery</span>
                      </label>

                      <label className="block">
                        <input
                          type="radio"
                          value="UPI"
                          checked={paymentMethod === "UPI"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="ml-2 text-gray-400">UPI</span>
                      </label>

                      <label className="block">
                        <input
                          type="radio"
                          value="Card"
                          checked={paymentMethod === "Card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="ml-2 text-gray-400">Card Payment</span>
                      </label>
                    </div>

                    {/* Place Order Button */}
                    {cart.length > 0 && (
                      <button
                        onClick={() => handlePlaceOrder(item._id)}
                        className="mt-6 bg-amber-600 text-sm font-semibold text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition"
                      >
                        Place Order
                      </button>
                    )}
                  </div>
                ))}
                <div className="w-full p-2">
                  <h3 className="p-4 rounded-lg shadow-lg text-black text-center border border-gray-300 text-lg mt-4">
                    Total Cart Price: ₹ {totalPrice}/-
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
