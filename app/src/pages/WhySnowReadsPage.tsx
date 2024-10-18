import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import InformationPopup from "../components/landingComponents/InformationPopup";

const WhySnowReadsPage: React.FC = () => {
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
            Why SnowReads?
          </h1>
          <p className="text-gray-600 mb-6 text-left">
            <br /> SnowReads is a series of curated collections of scientific
            papers, made accessible in a fully decentralized manner. It’s built
            on Walrus Sites, a platform that allows people to publish web apps
            directly on Walrus, a decentralized data storage network.
            <br />
            Everything on this web app—from the HTML to the images and the PDF
            files themselves—is stored on Walrus. SnowReads demonstrate how
            Walrus Sites can be a foundational tool for decentralized
            applications, delivering seamless end-to-end user experiences.
            Digital archives can preserve content for the long-term and remain
            globally accessible, secure, and resistant to data loss or
            censorship.
            <br />
            <br />
            <br />
            <span className="font-bold">What is Walrus?</span>
            <br />
            Walrus is a decentralized data storage network. Unlike traditional
            cloud storage systems that rely on centralized providers, Walrus
            splits data into smaller pieces and distributes it across multiple
            nodes globally. Decentralization ensures the data is highly
            available and resilient to failures. Even if parts of the network go
            offline, the system can still retrieve the complete data.
            <br />
            <br />
            <br />
            <span className="font-bold">What are Walrus Sites?</span>
            <br />
            Walrus Sites take decentralized storage to the next level by
            allowing people to host web apps entirely on Walrus. Once deployed,
            a Walrus Site lives on the decentralized network, accessible from
            anywhere in the world through portals like{" "}
            <a
              className="font-bold"
              href="https://docs.walrus.site/walrus-sites/intro.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              walrus.site
            </a>
            . These sites can also be linked to objects on{" "}
            <a
              className="font-bold"
              href="https://docs.sui.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sui
            </a>
            <a /> and additionaly leverage Sui’s naming service, SuiNS, allowing
            each site to have a human-readable name instead of a long, complex
            URL.
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
        <InformationPopup />
      </section>
      <Footer />
    </div>
  );
};

export default WhySnowReadsPage;
