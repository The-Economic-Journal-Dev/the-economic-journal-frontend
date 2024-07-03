import Header from "../components/Header/Header.tsx"
import Footer from "../components/Footer/Footer.tsx"
import Body from "../components/Body/Body.tsx"
import "./HomePage.css"

function HomePage() {
    return <div className="pageWrap">
        <Header />
        <Body />
        <Footer />
    </div>
}

export default HomePage;