"use client";
import type React from "react";
import { useState } from "react";
import {
  Search,
  Wallet,
  Clock,
  Lock,
  Gift,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Copy,
  Loader2,
} from "lucide-react";

interface LockAccount {
  id: string;
  amount: number;
  recipient: string;
  unlockTime: Date;
  status: "active" | "unlocked" | "expired";
  createdAt: Date;
}

interface RecipientAccount {
  id: string;
  amount: number;
  sender: string;
  unlockTime: Date;
  status: "pending" | "claimable" | "claimed";
  createdAt: Date;
}

const AccountLookup = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(false);

  // Mock data - in real app, this would come from API
  const [lockAccounts, setLockAccounts] = useState<LockAccount[]>([]);
  const [recipientAccounts, setRecipientAccounts] = useState<
    RecipientAccount[]
  >([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress || walletAddress.length < 32) {
      setError("Please enter a valid wallet address");
      return;
    }

    setError("");
    setIsSearching(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data response
    setLockAccounts([
      {
        id: "lock_1",
        amount: 2.5,
        recipient: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        unlockTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "active",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        id: "lock_2",
        amount: 1.0,
        recipient: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        unlockTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (expired)
        status: "expired",
        createdAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000), // 32 days ago
      },
    ]);

    setRecipientAccounts([
      {
        id: "recipient_1",
        amount: 5.0,
        sender: "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
        unlockTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        status: "pending",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      },
      {
        id: "recipient_2",
        amount: 0.8,
        sender: "8qbHbw2BbbTHBW1sbeqakYXVKRQM8Ne7pLK7m6CVfeR",
        unlockTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (claimable)
        status: "claimable",
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
      },
    ]);

    setIsSearching(false);
    setHasSearched(true);
  };

  const formatTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    if (diff <= 0) {
      return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    }
    return `${hours}h remaining`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "pending":
        return "text-blue-400 bg-blue-500/20";
      case "claimable":
        return "text-green-400 bg-green-500/20";
      case "unlocked":
      case "claimed":
        return "text-gray-400 bg-gray-500/20";
      case "expired":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="relative z-10 w-full min-h-screen py-8 flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-6">
          <div className="relative group">
            <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Account Lookup
            </h1>
            <div className="absolute inset-0 text-5xl lg:text-6xl font-extrabold text-cyan-400/5 blur-xl -z-10">
              Account Lookup
            </div>
          </div>

          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            View your locked accounts and incoming transfers by entering your
            wallet address
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="wallet"
                className="flex items-center space-x-2 text-lg font-semibold text-white"
              >
                <Wallet className="w-5 h-5 text-purple-400" />
                <span>Wallet Address</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="wallet"
                  name="wallet"
                  placeholder="Enter your Solana wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  onFocus={() => setFocusedField(true)}
                  onBlur={() => setFocusedField(false)}
                  className={`w-full bg-gradient-to-br from-purple-900/50 to-cyan-500/20 text-white p-4 rounded-xl outline-none text-base placeholder-white/50 border-2 transition-all duration-300 ${
                    error
                      ? "border-red-400/50 focus:border-red-400"
                      : focusedField
                      ? "border-purple-400/50 focus:border-purple-400 shadow-lg shadow-purple-400/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                />

                {focusedField && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

              <button
                type="submit"
                disabled={isSearching}
                className="relative w-full bg-gradient-to-br from-purple-600 via-cyan-600 to-teal-500 hover:from-purple-500 hover:via-cyan-500 hover:to-teal-400 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center space-x-3">
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Search Accounts</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {hasSearched && !isSearching && (
          <div className="space-y-8">
            {/* Lock Accounts Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  Your Lock Accounts ({lockAccounts.length})
                </h2>
              </div>

              {lockAccounts.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                  <Lock className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-300 text-lg">
                    No lock accounts found
                  </p>
                  <p className="text-neutral-400 text-sm mt-2">
                    You haven't created any time-locked accounts yet
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {lockAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                account.status
                              )}`}
                            >
                              {account.status.toUpperCase()}
                            </span>
                            <span className="text-2xl font-bold text-white">
                              {account.amount} SOL
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-neutral-300">
                              <Gift className="w-4 h-4" />
                              <span>
                                To: {truncateAddress(account.recipient)}
                              </span>
                              <button
                                onClick={() =>
                                  copyToClipboard(account.recipient)
                                }
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center space-x-2 text-neutral-300">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Created:{" "}
                                {account.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-2 text-lg font-semibold">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span
                              className={
                                account.status === "expired"
                                  ? "text-red-400"
                                  : "text-white"
                              }
                            >
                              {formatTimeRemaining(account.unlockTime)}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            Unlocks: {account.unlockTime.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recipient Accounts Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                  Incoming Transfers ({recipientAccounts.length})
                </h2>
              </div>

              {recipientAccounts.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                  <Gift className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-300 text-lg">
                    No incoming transfers found
                  </p>
                  <p className="text-neutral-400 text-sm mt-2">
                    No one has sent you any time-locked transfers yet
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {recipientAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-400/30 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                account.status
                              )}`}
                            >
                              {account.status.toUpperCase()}
                            </span>
                            <span className="text-2xl font-bold text-white">
                              {account.amount} SOL
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-neutral-300">
                              <Wallet className="w-4 h-4" />
                              <span>
                                From: {truncateAddress(account.sender)}
                              </span>
                              <button
                                onClick={() => copyToClipboard(account.sender)}
                                className="text-green-400 hover:text-green-300 transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center space-x-2 text-neutral-300">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Received:{" "}
                                {account.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-2 text-lg font-semibold">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span
                              className={
                                account.status === "claimable"
                                  ? "text-green-400"
                                  : "text-white"
                              }
                            >
                              {account.status === "claimable"
                                ? "Ready to Claim!"
                                : formatTimeRemaining(account.unlockTime)}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            {account.status === "claimable"
                              ? "Available now"
                              : `Available: ${account.unlockTime.toLocaleDateString()}`}
                          </p>

                          {account.status === "claimable" && (
                            <button className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 px-4 py-2 rounded-lg text-white font-medium text-sm transition-all duration-300 transform hover:scale-105">
                              Claim Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white">
                  {lockAccounts
                    .reduce((sum, acc) => sum + acc.amount, 0)
                    .toFixed(2)}{" "}
                  SOL
                </p>
                <p className="text-sm text-neutral-300">Total Locked</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-2xl p-6 text-center">
                <Gift className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white">
                  {recipientAccounts
                    .reduce((sum, acc) => sum + acc.amount, 0)
                    .toFixed(2)}{" "}
                  SOL
                </p>
                <p className="text-sm text-neutral-300">Total Incoming</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white">
                  {
                    recipientAccounts.filter(
                      (acc) => acc.status === "claimable"
                    ).length
                  }
                </p>
                <p className="text-sm text-neutral-300">Ready to Claim</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountLookup;
