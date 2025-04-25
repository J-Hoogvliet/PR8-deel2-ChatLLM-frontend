import {BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider} from 'react-router';
import React from "react";
import Question from "./screens/Question.jsx";

function App() {
    const router = createBrowserRouter([{
            children: [
                {
                    path: '/',
                    element: <Question/>
                },
            ]
        }
        ]
    )
    return (
        <RouterProvider router={router}/>
    );
}

export default App