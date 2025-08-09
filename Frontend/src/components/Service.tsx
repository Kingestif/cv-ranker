import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

const ServicesPage = () => {
  const services = [
    {
      title: "Full-Stack Development",
      icon: "💻",
      description: "From sleek UIs to robust backends with Node.js, GraphQL, FastAPI & React.",
    },
    {
      title: "Mobile Apps",
      icon: "📱",
      description: "Cross-platform apps with Flutter & Dart delivering smooth experiences.",
    },
    {
      title: "Web Development",
      icon: "🌐",
      description: "Responsive, fast, and SEO-friendly websites that shine on any device.",
    },
    {
      title: "AI & Machine Learning",
      icon: "🤖",
      description: "Smart AI features like NLP, vision, and chatbots to boost your app.",
    },
    {
      title: "DevOps & Cloud",
      icon: "☁️",
      description: "CI/CD, cloud deployment, and containerization for seamless scaling.",
    },
  ];

  return (
    <div>
        <NavBar/>
        <div className="max-w-5xl mx-auto px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
          <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
            What I Offer
          </h1>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">{service.title}</h2>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className=" mt-10 mx-40 font-semibold text-sm bg-blue-500 px-5 py-5 rounded-2xl text-white ">
            <Footer />
        </div>
    </div>
  );
};

export default ServicesPage;
