import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-col items-center justify-center flex-grow bg-primary px-8 sm:px-12 lg:px-16">
        <div className="lg:max-w-[1100px] w-full mx-auto py-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-6 text-left">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-6 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
            nec congue eget, auctor vitae massa. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
            interdum, nisi lorem egestas odio, vitae scelerisque enim ligula
            venenatis dolor.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
            nec congue eget, auctor vitae massa. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
            interdum, nisi lorem egestas odio, vitae scelerisque enim ligula
            venenatis dolor.
          </p>

          <div className="flex justify-start mt-6">
            <button
              onClick={handleGoBack}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
