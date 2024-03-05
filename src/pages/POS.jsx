import React, { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";
import Button from "../components/Button";
import Container from "../components/Container";
import data from "../data/fakeData";

function POSPage() {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const componentRef = useRef();

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const result = await axios.get("http://localhost:5000/products");
  //     setProducts(result.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     toast.error("Error fetching products", toastOptions);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchProducts = () => setProducts(data);

  const addProductToCart = (product) => {
    const foundProductIndex = cart.findIndex((item) => item.id === product.id);
    if (foundProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[foundProductIndex].quantity++;
      updatedCart[foundProductIndex].totalAmount += product.price;
      setCart(updatedCart);
      toast(`Added ${product.name} to cart`, toastOptions);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...product, quantity: 1, totalAmount: product.price },
      ]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.totalAmount, 0);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 200px;
        margin: 3mm;
      }
    `,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [cart]);

  return (
    <div>
      <Container>
        <div className="flex justify-between">
          <div className="w-2/3">
            {isLoading ? (
              "Loading"
            ) : (
              <div className="flex w-full flex-wrap justify-between">
                {products.map((product) => (
                  <div key={product.id} className="mb-4">
                    <div
                      className="cursor-pointer border border-gray-400 px-3 text-center font-bold hover:bg-blue-400"
                      onClick={() => addProductToCart(product)}
                    >
                      <p>{product.name}</p>
                      <img
                        src={product.image}
                        className="max-h-[100px] w-full object-cover"
                        alt={product.name}
                      />
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-1/3">
            <div className="hidden">
              <ComponentToPrint
                cart={cart}
                totalAmount={totalAmount}
                ref={componentRef}
              />
            </div>
            <div className="rounded bg-gray-400 p-3">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalAmount}</td>
                        <td>
                          <Button
                            txt="Remove"
                            onclick={() => removeProduct(item.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No items in cart</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <h2 className="px-2 text-white">Total Amount: ${totalAmount}</h2>
            </div>
            <div className="mt-3">
              {totalAmount > 0 ? (
                <Button txt="Pay Now" onclick={handlePrint} />
              ) : (
                <div className="text-orange-500">
                  Please add a product to the cart
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default POSPage;
