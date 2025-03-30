import React from "react";
import { Link } from "react-router-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <div className="footer-container">
            <Link to={"/"} className="default-link-element">
                {" "}
                <h1 className="logo">
                    Shop <b className="logo-single-letter">U</b>
                </h1>
            </Link>
            <div className="footer-points">
                <ul>
                    <p>Company</p>
                    <li>About Us</li>
                    <li>Our Services</li>
                    <li>Privacy Policy</li>
                    <li>Affiliate Program</li>
                </ul>
                <ul>
                    <p>Online Shop</p>
                    <li>Watches</li>
                    <li>Bags</li>
                    <li>Shoes</li>
                    <li>Clothes</li>
                </ul>
                <ul>
                    <p>Company</p>
                    <li>FAQ</li>
                    <li>Order Status</li>
                    <li>Returns</li>
                    <li>Payment Options</li>
                </ul>
                <ul>
                    <a
                        href="https://github.com/blazejzj"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faGithub}
                            size="1x"
                            className="githubIcon"
                        />
                        blazejzj
                    </a>
                </ul>
            </div>
        </div>
    );
}
