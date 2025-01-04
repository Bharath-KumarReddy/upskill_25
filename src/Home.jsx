import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import useItems from "./Items";
import {
  addToCart,
  updateQuantity,
} from "./slices/cart_slice";

import Navbar from "./Navbar";

const Home = () => {
    const navigate = useNavigate();
  const items = useItems();


  const { cart, totalPrice} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleUpdateQuantity = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };



  return (
    <div>

      <div className="flex">
        <div className="w-[50%] h-screen bg-white overflow-y-auto">
        
            <div className="flex flex-wrap gap-10">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-[300px] min-h-[450px] bg-white shadow-lg rounded-lg flex flex-col items-start justify-start mt-20 ml-[15%] hover:shadow-xl hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:shadow-lg transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          
        </div>

        <div className="w-[50%] h-screen p-6 mx-auto rounded-lg shadow-lg flex flex-col">
          <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
            Cart
          </h2>
          {cart.length === 0 ? (
            <h3 className="text-2xl text-center font-bold mb-4 text-orange-500">
              Your cart is empty.
            </h3>
          ) : (
            <>
              <div className="mt-2 border-t">
                <p className="text-2xl font-bold text-center text-orange-600">
                  Total: ${totalPrice}
                </p>
              </div>

              <div className="overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                    <div className="flex flex-col items-start flex-1 ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 ml-4">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to = '/payment'
                className='w-[400px] px-2 py-4 font-bold rounded-lg mx-auto transition duration-300 bg-yellow-400 text-gray-900 hover:bg-yellow-500 flex items-center justify-center'
              >
               Proceed to Payment
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home
