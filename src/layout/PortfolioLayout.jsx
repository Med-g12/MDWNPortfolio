import React from 'react'
import NavBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const PortfolioLayout = ({ children, isDarkMode, onToggleDarkMode }) => {
    return (
        <div className="flex flex-col min-h-screen text-gray-950 transition-colors duration-300 dark:text-white">
            <NavBar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />

            <main className="flex-1 lg:mx-30 sm:mx-2 xs:mx-2">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default PortfolioLayout
