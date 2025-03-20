import { Music, Users, Play, MessageSquare } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-50"></div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
              Experience Media Together, Anywhere
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Noxus brings friends and communities together to enjoy
              synchronized music, videos, and events in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:opacity-90 transition duration-300 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Start Noxing
              </button>
              <button className="px-8 py-3 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-700 transition duration-300">
                Explore Communities
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Noxus?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Synchronized Media</h3>
              <p className="text-gray-400">
                Watch videos, listen to music, or attend live events in perfect
                sync with friends and communities.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Real-Time Engagement
              </h3>
              <p className="text-gray-400">
                Connect with friends through text, emojis, and voice chat while
                enjoying content together.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Building</h3>
              <p className="text-gray-400">
                Join or create communities based on your interests, from music
                genres to movie fandoms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className=" w-full overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 text-gray-900"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,141.89,111.31,221.93,104.9Z"
            className="fill-current"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
