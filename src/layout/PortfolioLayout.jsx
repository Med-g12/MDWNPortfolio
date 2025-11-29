import React from 'react'
import NavBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const PortfolioLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex-1 lg:mx-30 sm:mx-2 xs:mx-2">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default PortfolioLayout
