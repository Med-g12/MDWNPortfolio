import './App.css'
import PortfolioLayout from './layout/PortfolioLayout';
import Home from './components/Home'
import About from './components/About';
import Skills from './components/Skills'
import Projects from './components/Projects';

function App() {

    return (
        <>
            <PortfolioLayout>
                <Home />
                <About />
                <Skills />
                <Projects />
            </PortfolioLayout>
        </>
    )
}

export default App
