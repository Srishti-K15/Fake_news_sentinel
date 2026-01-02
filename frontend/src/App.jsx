import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [newsText, setNewsText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!newsText.trim()) {
      setError("Please paste some news text first!");
      return;
    }
    
    setError("");
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        text: newsText
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error connecting to the backend:", error);
      setError("Could not connect to server. Make sure Flask is running on localhost:5000");
      setPrediction(null);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setNewsText("");
    setPrediction(null);
    setError("");
  };

  const scrollToChecker = () => {
    const element = document.getElementById('checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📰</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fake News Sentinel
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition">How It Works</a>
              <a href="#checker" className="text-gray-600 hover:text-purple-600 transition">Checker</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-float inline-block text-7xl">📰</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Combat Misinformation with <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Instantly detect fake news and verify article authenticity using advanced machine learning. Make informed decisions in the age of information overload.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={scrollToChecker}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all">
              Get Started Free
            </button>
            <button 
              onClick={scrollToHowItWorks}
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Get results in seconds with our optimized AI model' },
              { icon: '🎯', title: 'Highly Accurate', desc: 'Advanced NLP & ML algorithms ensure precision detection' },
              { icon: '🔒', title: 'Privacy First', desc: 'Your data is never stored or shared with third parties' },
              { icon: '📊', title: 'Detailed Analysis', desc: 'Understand why an article is flagged as fake or genuine' },
              { icon: '🌍', title: 'Multi-Language', desc: 'Detect misinformation across different languages' },
              { icon: '🔄', title: 'Always Learning', desc: 'Models continuously updated with latest misinformation patterns' }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Paste Article', desc: 'Copy and paste your article text' },
              { num: '02', title: 'Analyze', desc: 'AI processes linguistic patterns' },
              { num: '03', title: 'Detect', desc: 'Identifies fake or genuine content' },
              { num: '04', title: 'Verify', desc: 'Get detailed analysis report' }
            ].map((step, i) => (
              <div 
                key={i} 
                className="text-center group"
                style={{
                  animation: `slideUpStagger 0.6s ease-out ${i * 0.15}s both`
                }}
              >
                <div className="mb-6 relative">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-10 -z-10 blur-lg group-hover:blur-xl transition-all duration-300" style={{ transform: 'scale(1.5)' }}></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="text-3xl text-purple-300 group-hover:text-purple-500 transition-colors">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Checker Section */}
      <section id="checker" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 shadow-xl border border-purple-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Test It Now
              </h2>
              <p className="text-lg text-gray-600">
                Paste any article and instantly verify its authenticity
              </p>
            </div>

            {/* Input Section */}
            <div className="mb-8">
              <label className="block text-gray-800 font-semibold mb-4 text-lg">
                Paste News Article:
              </label>
              <textarea
                className="w-full h-64 p-6 border-2 border-gray-300 rounded-xl text-base font-normal resize-vertical transition-all duration-300 focus:outline-none focus:border-purple-500 focus:shadow-xl focus:shadow-purple-200 bg-white"
                placeholder="Paste your article text here to check for misinformation..."
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">{newsText.length}</span> characters
                </div>
                <div className="text-sm text-gray-500">
                  Minimum 100 characters recommended
                </div>
              </div>
            </div>

            {/* Button Group */}
            <div className="flex gap-4 mb-8 flex-col sm:flex-row">
              <button
                onClick={handlePredict}
                disabled={loading || !newsText.trim()}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || !newsText.trim()
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white opacity-60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:-translate-y-1 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing Article...
                  </>
                ) : (
                  <>
                    🔍 Verify Authenticity
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={loading}
                className="flex-1 py-4 px-6 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg animate-slideDown">
                <div className="font-semibold mb-1">⚠️ Error</div>
                <p>{error}</p>
              </div>
            )}

            {/* Result Box */}
            {prediction && (
              <div
                className={`p-8 rounded-xl text-center animate-slideUp border-2 ${
                  prediction === 'Genuine'
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
                    : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400'
                }`}
              >
                <div
                  className={`text-6xl mb-4 ${
                    prediction === 'Genuine' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {prediction === 'Genuine' ? '✓' : '✗'}
                </div>
                <h3
                  className={`text-3xl font-bold mb-3 ${
                    prediction === 'Genuine'
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}
                >
                  {prediction === 'Genuine' ? 'Genuine Article' : 'Likely Fake News'}
                </h3>
                <p
                  className={`text-base leading-relaxed max-w-2xl mx-auto ${
                    prediction === 'Genuine'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {prediction === 'Genuine'
                    ? 'This article displays authentic linguistic patterns and passes our authenticity checks. However, always cross-reference with trusted news sources.'
                    : 'This article exhibits patterns commonly found in misinformation. We recommend verifying the claims with multiple trusted sources before sharing.'}
                </p>
                <div className="mt-6 pt-6 border-t border-current border-opacity-20">
                  <p className="text-sm opacity-75">
                    Confidence Score: High | Based on linguistic analysis using Logistic Regression & NLP
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '10K+', label: 'Articles Analyzed' },
              { stat: '95%', label: 'Accuracy Rate' },
              { stat: '<1s', label: 'Detection Time' }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2">{item.stat}</div>
                <div className="text-purple-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📰</span>
                <span className="font-bold text-white">Fake News Sentinel</span>
              </div>
              <p className="text-sm">Fighting misinformation with AI</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Fake News Sentinel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpStagger {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;