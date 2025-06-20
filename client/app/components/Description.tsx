"use client";
import { ArrowRight, Sparkles, Lock, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Description = ({
  onLockFunds,
  onLookup,
}: {
  onLockFunds: () => void;
  onLookup: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="relative z-10 w-full min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto h-full min-h-screen flex flex-col items-center justify-center space-y-16 px-6 py-12">
        <div className="text-center space-y-6">
          <div className="relative group">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl text-white tracking-widest font-sans transition-all duration-500 group-hover:scale-105">
              <span className="font-extrabold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                lockr
              </span>
            </h1>
            <div className="absolute inset-0 text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-widest text-cyan-400/5 blur-xl -z-10 animate-pulse">
              lockr.
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-cyan-300/60 animate-fade-in">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">
              REVOLUTIONARY • SECURE • TRUSTLESS
            </span>
            <Sparkles className="w-4 h-4 animate-pulse delay-500" />
          </div>
        </div>

        <div className="text-center space-y-12 flex flex-col items-center justify-center max-w-5xl">
          <div className="space-y-8">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-neutral-100 font-light leading-relaxed">
              The future of{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  secure
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/50 to-purple-400/50 rounded-full"></div>
              </span>
              , time-locked digital fund storage.
            </p>

            <p className="text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Protect your digital assets with cryptographic time-locks. Send
              funds to the future or check what's waiting for you.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto space-y-10">
            <div className="flex items-center justify-center w-full">
              <div className="flex-grow border-t border-neutral-500/50" />
              <span className="px-6 text-neutral-400 tracking-widest text-lg font-medium">
                GET STARTED
              </span>
              <div className="flex-grow border-t border-neutral-500/50" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div
                className="relative group"
                onClick={() => router.push("/lock")}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <button
                  onClick={onLockFunds}
                  className="relative w-full bg-gradient-to-br from-teal-600 via-cyan-600 to-purple-500 hover:from-teal-500 hover:via-cyan-500 hover:to-purple-400 p-8 rounded-2xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-cyan-500/25 group"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Lock Funds</h3>
                      <p className="text-sm text-white/80">
                        Secure your assets with time-locked protection
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <span>Start Locking</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              </div>

              <div
                className="relative group"
                onClick={() => router.push("/lookup")}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <button
                  onClick={onLookup}
                  className="relative w-full bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-400 p-8 rounded-2xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-purple-500/25 group"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <Search className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Account Lookup</h3>
                      <p className="text-sm text-white/80">
                        Check your locked funds and incoming transfers
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <span>Search Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
