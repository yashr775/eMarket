/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import CartItemCard from "../components/card-item";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "1",
    name: "Wireless Mouse",
    price: 899,
    quantity: 2,
    stock: 10,
    photo: "/assets/images/wireless-mouse.jpg",
    description: "A sleek and ergonomic wireless mouse for everyday use.",
  },
  {
    productId: "2",
    name: "Mechanical Keyboard",
    price: 4999,
    quantity: 1,
    stock: 10,
    photo: "/assets/images/mechanical-keyboard.jpg",
    description: "A high-quality mechanical keyboard with customizable keys.",
  },
  {
    productId: "3",
    name: "Gaming Headset",
    price: 2999,
    quantity: 1,
    stock: 10,
    photo: "/assets/images/gaming-headset.jpg",
    description: "Immersive sound and comfort for long gaming sessions.",
  },
  {
    productId: "4",
    name: "Smartwatch",
    price: 6999,
    quantity: 1,
    stock: 10,
    photo: "/assets/images/smartwatch.jpg",
    description: "A modern smartwatch with fitness tracking and notifications.",
  },
];

const cart = () => {
  const incrementHandler = () => {};
  const decrementHandler = () => {};
  const removeHandler = () => {};

  const [couponCode, setCouponCode] = useState("");
  const isValidCouponCode = true;

  // Replace after backend
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = 50; // Fixed shipping charges
  const tax = Math.round(subtotal * 0.18); // 18% tax
  const discount = isValidCouponCode ? 100 : 0; // Flat ₹100 discount if coupon is valid
  const total = subtotal + shippingCharges + tax - discount;

  return (
    <div>
      {" "}
      <div className="cart">
        <main>
          {cartItems.length > 0 ? (
            cartItems.map((i, idx) => (
              <CartItemCard
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                key={idx}
                cartItem={i}
              />
            ))
          ) : (
            <h1>No Items Added</h1>
          )}
        </main>
        <aside>
          <p>Subtotal: ₹{subtotal}</p>
          <p>Shipping Charges: ₹{shippingCharges}</p>
          <p>Tax: ₹{tax}</p>
          <p>
            Discount: <em className="red"> - ₹{discount}</em>
          </p>
          <p>
            <b>Total: ₹{total}</b>
          </p>

          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />

          {couponCode &&
            (isValidCouponCode ? (
              <span className="green">
                ₹{discount} off using the <code>{couponCode}</code>
              </span>
            ) : (
              <span className="red">
                Invalid Coupon <VscError />
              </span>
            ))}

          {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
        </aside>
      </div>
    </div>
  );
};

export default cart;
