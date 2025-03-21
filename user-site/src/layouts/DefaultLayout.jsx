import React from 'react'
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <main className="flex-1">
            <Outlet />
        </main>
    )
}

export default DefaultLayout