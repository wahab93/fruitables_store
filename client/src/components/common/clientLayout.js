import React from 'react'
import { Navbar } from '../user/common/Navbar'
import { Footer } from '../user/common/Footer'
import { CopyRight } from '../user/MainPage/copyRight'
import { Outlet } from 'react-router-dom'

export const ClientLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <CopyRight />
        </>
    )
}
