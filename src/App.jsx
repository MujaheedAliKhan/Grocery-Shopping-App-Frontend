import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import EditProduct from "./pages/EditProduct";
import toast from "react-hot-toast";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import FAQs from "./pages/Faqs";
import Back from "./components/Back";
import { getProductsApi} from "./api/productApi";
import { deleteProductApi } from "./api/productApi";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Orders from "./components/Orders";
import AdminDashboard from "./components/AdminDashboard";
import Chatbot from "./components/Chatbot";
import NotFoundPage from "./components/NotFoundPage";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  // const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [Loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Fetching Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsApi();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Functionality for deleting product
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteProductApi(id, token);
      fetchProducts(); //refresh list
      toast.success("Product deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  //Add to Cart Functinality
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    console.log("CART:", cart);
  }, [cart]);

  return (
    <>
      <div>
        <div className="max-w-auto mx-auto">
          <Toaster />
          <Navbar search={search} setSearch={setSearch} cart={cart} />
          <Chatbot/>
          <Routes>
            {/* HomePage */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                  <ProductList
                    Loading={Loading}
                    search={search}
                    products={products}
                    deleteProduct={deleteProduct}
                    addToCart={addToCart}
                    setCart={setCart}
                    // setEditProduct={setEditProduct}
                  />
                  <Footer />
                </ProtectedRoute>
              }
            />
            {/* Add Page */}
            <Route
              path="/add"
              element={
                <AdminRoute>
                  <AddProduct
                  Loading={Loading}
                  fetchProducts={fetchProducts}
                  // editProduct={editProduct}
                  // setEditProduct={setEditProduct}
                />
                </AdminRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList
                  Loading={Loading}
                  search={search}
                  products={products}
                  deleteProduct={deleteProduct}
                  addToCart={addToCart}
                  // setEditProduct={setEditProduct}
                />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={<AdminRoute><EditProduct /></AdminRoute>}
              Loading={Loading}
            />
            <Route path="/login" element={<Login />} Loading={Loading} />
            <Route path="/register" element={<Register />} Loading={Loading} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart cart={cart} setCart={setCart} Loading={Loading} />
                </ProtectedRoute>
              }
            />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
              } Loading={Loading} />
            <Route path="/terms" element={
              <ProtectedRoute>
                <Terms />
              </ProtectedRoute>
              } Loading={Loading} />
            <Route path="/faqs" element={
              <ProtectedRoute>
                <FAQs />
              </ProtectedRoute>
              } Loading={Loading} />
              <Route path="/orders" element={
              <ProtectedRoute>
                <Orders Loading={Loading} />
              </ProtectedRoute>
              } Loading={Loading} />

              <Route path="/admindashboard" element={
                <ProtectedRoute>
                  <AdminDashboard/>
                </ProtectedRoute>
              }/>

              {/* NotFoundPage */}
              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
