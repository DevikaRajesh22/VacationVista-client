import "./Home.css";
import Navbar from "../../../Components/Common/Navbar";
import Carousel from "../../../Components/Buyer/Carousel";
import Choose from "../../../Components/Buyer/Choose";
import Trend from "../../../Components/Buyer/Trend";
import Footer from "../../../Components/Common/Footer";

const Home = () => {
  return (
    <main className="mt-8">
      <Navbar />
      <Carousel />
      <div className="my-4"> {/* Reduced spacing for small devices */}
        <Choose />
      </div>
      <div className="my-8">
        <Trend />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
