import QC1Logo from "../assets/QC1.png";
import QCLogo from "../assets/QC.png";
import QC3Logo from "../assets/QC3.png";

function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-gradient-to-br from-accent via-primary to-secondary rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 2px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-5xl backdrop-blur-sm bg-black/30 p-12 rounded-3xl border border-white/30 shadow-2xl">
            <h1 className="mb-8 text-6xl font-black tracking-tight drop-shadow-2xl animate-fade-in text-white">
              Welcome to QuIRI
            </h1>
            <p className="mb-2 text-3xl font-bold text-base-100/95 drop-shadow-lg">
              Quantum Innovation and Research Institute
            </p>
            <p className="mb-8 text-xl font-medium leading-relaxed max-w-3xl mx-auto text-base-100/90">
              Pioneering quantum research, translational innovation, and global
              collaboration to transform industries and advance quantum
              technologies.
            </p>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto text-base-100/85">
              QuIRI leads cutting-edge research in quantum networks, secure
              communication, sensing enhancement, and quantum FinTech while
              fostering entrepreneurial innovation and strategic partnerships
              worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* About QuIRI Section */}
      <div className="space-y-12">
        <h2 className="text-5xl font-black text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About QuIRI
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body p-8">
              <h3 className="card-title text-3xl mb-6 text-primary flex items-center gap-3">
                <img src={QC1Logo} alt="QC" className="w-12 h-12" />
                Translational Research
              </h3>
              <p className="text-lg mb-6 leading-relaxed">
                QuIRI conducts world-class research in quantum technologies with
                direct applications to real-world challenges. Our
                interdisciplinary approach combines theoretical quantum physics
                with practical engineering solutions.
              </p>
              <ul className="space-y-3 text-base-content/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  Quantum algorithm development and optimization
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  Quantum hardware design and fabrication
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  Quantum software and simulation platforms
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body p-8">
              <h3 className="card-title text-3xl mb-6 text-primary">
                <img src={QCLogo} alt="QC" className="w-12 h-12" />
                Entrepreneurial Innovation
              </h3>
              <p className="text-lg mb-6 leading-relaxed">
                We focus on accelerating the discovery of utility-scale quantum
                use-cases for real-world problems with extremely impactful
                economic implications through innovation and entrepreneurship.
              </p>
              <ul className="space-y-3 text-base-content/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  Industry-focused quantum applications
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  Startup incubation and acceleration
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  Technology transfer and commercialization
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body p-8">
              <h3 className="card-title text-2xl mb-4">
                <img src={QC3Logo} alt="QC" className="w-12 h-12" />
                Industry-Class Collaborations
              </h3>
              <p className="text-lg mb-4">
                Our research initiatives span continents, bringing together
                leading institutions, industry partners, and government agencies
                to accelerate quantum technology development and deployment.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>International university partnerships</li>
                <li>Industry-academia collaboration programs</li>
                <li>Government research initiatives</li>
                <li>Cross-disciplinary research networks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mb-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-xl mb-4">
                🌐 Integrated Quantum Networks
              </h3>
              <p>
                Building comprehensive quantum network infrastructures that
                integrate quantum computing, communication, and sensing
                capabilities for next-generation applications.
              </p>
            </div>
          </div>

          <div className="card bg-secondary text-secondary-content shadow-xl">
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-xl mb-4">
                � Quantum Supply Chain Management and Logistics
              </h3>
              <p>
                Revolutionizing global supply chains with quantum-enhanced
                optimization, real-time tracking, and predictive analytics for
                maximum efficiency and transparency.
              </p>
            </div>
          </div>

          <div className="card bg-accent text-accent-content shadow-xl">
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-xl mb-4">
                � Quantum Portfolio Optimization
              </h3>
              <p>
                Developing advanced quantum algorithms for financial portfolio
                optimization, risk management, and asset allocation to unlock
                new investment strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QuIRI Networking Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-8">QuIRI</h2>
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <p className="text-lg mb-6">
              QuIRI (Quantum Innovation Network) represents our comprehensive
              approach to interdisciplinary collaboration and knowledge exchange
              in the quantum realm.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-bold text-xl mb-3">🎓 Academic Networks</h4>
                <p>
                  Connecting universities, research institutions, and
                  educational programs to share curriculum, research
                  opportunities, and collaborative projects.
                </p>
              </div>

              <div className="text-center">
                <h4 className="font-bold text-xl mb-3">
                  🏭 Industry Partnerships
                </h4>
                <p>
                  Bridging academia and industry through internships, joint
                  research projects, technology transfer, and startup incubation
                  programs.
                </p>
              </div>

              <div className="text-center">
                <h4 className="font-bold text-xl mb-3">🌟 Innovation Hubs</h4>
                <p>
                  Creating regional and global innovation centers that foster
                  entrepreneurship, patent development, and quantum startup
                  ecosystems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logistics and Supply Chain */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          Logistics & Supply Chain Innovation
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4">
                📦 Quantum Supply Chain
              </h3>
              <p className="text-lg mb-4">
                Revolutionizing global supply chains with quantum-enhanced
                optimization, predictive analytics, and secure communication
                protocols.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Quantum optimization for route planning</li>
                <li>Supply chain visibility and traceability</li>
                <li>Predictive maintenance and demand forecasting</li>
                <li>Secure supply chain communications</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4">🚚 Smart Logistics</h3>
              <p className="text-lg mb-4">
                Implementing quantum algorithms and machine learning to optimize
                logistics operations, reduce costs, and improve delivery
                efficiency.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Real-time inventory management</li>
                <li>Dynamic routing and scheduling</li>
                <li>Automated warehouse operations</li>
                <li>Carbon footprint optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Qbraid Integration */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          Qbraid Integration & Cloud Computing
        </h2>
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-3xl mb-6 justify-center">
              ☁️ Quantum Cloud Ecosystem
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-xl mb-4">
                  Qbraid Platform Integration
                </h4>
                <p className="text-lg mb-4">
                  QuIRI leverages Qbraid's cloud-based quantum computing
                  platform to provide seamless access to quantum hardware and
                  simulation tools.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Multi-vendor quantum hardware access</li>
                  <li>Unified development environment</li>
                  <li>Collaborative quantum programming</li>
                  <li>Educational quantum computing resources</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-xl mb-4">
                  Supply Chain Integration
                </h4>
                <p className="text-lg mb-4">
                  Combining Qbraid's quantum capabilities with our supply chain
                  expertise to create next-generation logistics solutions.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Quantum-enhanced supply chain modeling</li>
                  <li>Real-time optimization algorithms</li>
                  <li>Secure multi-party computation</li>
                  <li>Hybrid classical-quantum workflows</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Join the Quantum Revolution</h2>
        <p className="text-xl mb-8">
          Be part of QuIRI's mission to transform industries through quantum
          innovation. Connect with researchers, explore collaboration
          opportunities, and contribute to the future of quantum technology.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary btn-lg">
            Start Collaborating
          </button>
          <button className="btn btn-outline btn-lg">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
