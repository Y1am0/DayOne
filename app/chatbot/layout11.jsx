import { AI } from "@/app/actions";
import React from "react";
import "../globals.css";

export default function ChatbotLayout({ children }) {
    return (
        <html lang="en">
            <body >

                <AI>{children}</AI>

            </body>
        </html>
    );
}
