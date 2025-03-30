import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import ShoppingCartContext from "./ShoppingCartContext";

export default function Header() {
    const [visible, setVisible] = useState(false);
    const { cart } = useContext(ShoppingCartContext);
    const itemCount = cart.reduce((sum, product) => sum + product.quantity, 0);

    const handleShoppingCartClick = () => {
        setVisible((prev) => !prev);
    };

    const total = cart
        .reduce((sum, product) => sum + product.price * product.quantity, 0)
        .toFixed(2);

    return (
        <div className="header-container">
            <Link to="/" className="default-link-element">
                <h1 className="logo">
                    Shop <b className="logo-single-letter">U</b>
                </h1>
            </Link>

            <nav className="header-nav">
                <ul className="header-nav-list">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `default-link-element ${
                                    isActive ? "currentPage buttonHover" : ""
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/shop"
                            className={({ isActive }) =>
                                `default-link-element ${
                                    isActive ? "currentPage buttonHover" : ""
                                }`
                            }
                        >
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <button>About</button>
                    </li>
                </ul>
            </nav>
            <button
                onClick={handleShoppingCartClick}
                style={{ position: "relative" }}
            >
                <FontAwesomeIcon icon={faShoppingCart} />
                {itemCount > 0 && (
                    <span className="cart-badge">{itemCount}</span>
                )}
            </button>
            {visible && (
                <div
                    className="cart-overlay visible"
                    onClick={() => setVisible(false)}
                ></div>
            )}
            <div className={`cart-panel ${visible ? "visible" : ""}`}>
                <button
                    className="cart-close"
                    onClick={() => setVisible(false)}
                >
                    <FontAwesomeIcon icon={faXmark} size="1xl" />
                </button>
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map((product) => (
                            <div key={product.id} className="cart-item">
                                <img src={product.image} alt={product.title} />
                                <div className="cart-item-details">
                                    <p>{product.title}</p>
                                    <p>Quantity: {product.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <p className="cart-total">Total: {total} NOK</p>
                    </div>
                )}
            </div>
        </div>
    );
}
