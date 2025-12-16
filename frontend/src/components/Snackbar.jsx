import React from "react";
import { Link } from "react-router-dom";

export const Snackbar = ({ open, message, link, linkText = "View", onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4">
            <span>{message}</span>
            {link && (
                <Link
                    to={link}
                    className="underline hover:text-green-200"
                    rel="noopener noreferrer"
                >
                    {linkText}
                </Link>
            )}
            <button onClick={onClose} className="text-white hover:text-green-200">
                &times;
            </button>
        </div>
    );
};