import React from "react";
import { Link } from "react-router-dom";
export default function ErrorPage() {
    return (
        <div className="error-container">
            <h1>Dang! Something bad happened! This page does not exist!</h1>
            <Link to="/">Click here to return home!</Link>
        </div>
    );
}
