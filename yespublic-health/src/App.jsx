import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Diet from './pages/Diet'
import Fitness from './pages/Fitness'
import About from './pages/About'
import Privacy from './pages/Privacy'
import { Subscribe } from './pages/Subscribe'
import Unsubscribe from './Pages/UnSubscribe'
import Terms from './pages/Terms'
import './App.css'


export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/blogs" element={<Blogs />} />
					<Route path="/diet" element={<Diet />} />
					<Route path="/fitness" element={<Fitness />} />
					<Route path="/about" element={<About />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/subscribe" element={<Subscribe />} />
					<Route path="/unsubscribe" element={<Unsubscribe />} />
                    <Route path="/terms" element={<Terms />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	)
}
