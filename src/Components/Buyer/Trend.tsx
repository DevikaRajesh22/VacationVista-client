import trend1 from "../../assets/trend1.png";
import trend2 from "../../assets/trend2.png";
import trend3 from "../../assets/trend3.png";
import trend4 from "../../assets/trend4.png";

interface CardProps {
  image: string;
  title: string;
  price: string;
}

const Cards: React.FC<CardProps> = ({ image, title, price }) => {
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-3 rounded-t-lg max-w-full h-auto"
          src={image}
          alt="product image"
        />
      </a>
      <div className="px-3 pb-3">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              className="w-2.5 h-2.5 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-2.5 h-2.5 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-2.5 h-2.5 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-2.5 h-2.5 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-2.5 h-2.5 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ₹{price}
          </span>
        </div>
      </div>
    </div>
  );
};

const Trend = () => {
  return (
    <div>
      <div className="text-center pb-8 pt-10">
        <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
          Trending
        </h3>
      </div>
      <div className="flex justify-center space-x-6 mb-8">
        <Cards image={trend1} title="Jambiani, Tanzania" price="19,843" />
        <Cards image={trend2} title="Kecamatan, Indonesia" price="26,335" />
        <Cards image={trend3} title="Vagator, India" price="1,11,400" />
        <Cards image={trend4} title="Goa, India" price="2,03,400" />
      </div>
      <div className="flex justify-center space-x-6">
        <Cards image={trend1} title="Jambiani, Tanzania" price="19,843" />
        <Cards image={trend2} title="Kecamatan, Indonesia" price="26,335" />
        <Cards image={trend3} title="Vagator, India" price="1,11,400" />
        <Cards image={trend4} title="Goa, India" price="2,03,400" />
      </div>
    </div>
  );
};

export default Trend;
