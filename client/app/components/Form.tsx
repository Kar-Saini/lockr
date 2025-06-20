"use client";
import type React from "react";
import { useState } from "react";
import {
  Wallet,
  Clock,
  DollarSign,
  Lock,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Form = () => {
  const [formData, setFormData] = useState({
    amount: "",
    time: "",
    recipient: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.time) {
      newErrors.time = "Please specify a time period";
    }
    if (!formData.recipient || formData.recipient.length < 32) {
      newErrors.recipient = "Please enter a valid wallet address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="relative z-10 w-full min-h-screen py-5">
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center px-4">
        <div className="w-full border-2 border-purple-400/50 hover:border-purple-400/70 transition-colors duration-300 p-8 lg:p-8 rounded-3xl text-white flex flex-col space-y-6 bg-black/40 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                lockr
                <span className="text-cyan-400/70 text-3xl lg:text-4xl animate-pulse">
                  .
                </span>
              </h1>
              <div className="absolute inset-0 text-5xl lg:text-6xl font-extrabold text-cyan-400/5 blur-xl -z-10">
                lockr.
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-neutral-300 text-sm font-medium">
              {[
                { text: "Time-Locked", icon: Clock },
                { text: "Tamper-Proof", icon: Lock },
                { text: "Trustless", icon: CheckCircle },
              ].map(({ text, icon: Icon }) => (
                <div
                  key={text}
                  className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                >
                  <Icon className="w-3 h-3" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-white w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label
                  htmlFor="amount"
                  className="flex items-center space-x-2 text-lg font-semibold"
                >
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>Amount</span>
                  <span className="text-xs text-neutral-400 font-normal">
                    (SOL)
                  </span>
                </label>

                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    step="0.001"
                    min="0"
                    placeholder="e.g. 1.5"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    onFocus={() => setFocusedField("amount")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-gradient-to-br from-purple-900/50 to-cyan-500/20 text-white p-4 rounded-xl outline-none text-base placeholder-white/50 border-2 transition-all duration-300 ${
                      errors.amount
                        ? "border-red-400/50 focus:border-red-400"
                        : focusedField === "amount"
                        ? "border-cyan-400/50 focus:border-cyan-400 shadow-lg shadow-cyan-400/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  />

                  {focusedField === "amount" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {errors.amount && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.amount}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="time"
                  className="flex items-center space-x-2 text-lg font-semibold"
                >
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Time Period</span>
                </label>

                <div className="relative">
                  <input
                    type="text"
                    id="time"
                    name="time"
                    placeholder="e.g. 30 days, 1 year"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    onFocus={() => setFocusedField("time")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-gradient-to-br from-purple-900/50 to-cyan-500/20 text-white p-4 rounded-xl outline-none text-base placeholder-white/50 border-2 transition-all duration-300 ${
                      errors.time
                        ? "border-red-400/50 focus:border-red-400"
                        : focusedField === "time"
                        ? "border-blue-400/50 focus:border-blue-400 shadow-lg shadow-blue-400/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  />

                  {focusedField === "time" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {errors.time && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.time}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="recipient"
                className="flex items-center space-x-2 text-lg font-semibold"
              >
                <Wallet className="w-5 h-5 text-purple-400" />
                <span>Recipient</span>
                <span className="text-xs text-neutral-400 font-normal">
                  (Wallet Address)
                </span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  placeholder="Enter recipient wallet address"
                  value={formData.recipient}
                  onChange={(e) =>
                    handleInputChange("recipient", e.target.value)
                  }
                  onFocus={() => setFocusedField("recipient")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-gradient-to-br from-purple-900/50 to-cyan-500/20 text-white p-4 rounded-xl outline-none text-base placeholder-white/50 border-2 transition-all duration-300 ${
                    errors.recipient
                      ? "border-red-400/50 focus:border-red-400"
                      : focusedField === "recipient"
                      ? "border-purple-400/50 focus:border-purple-400 shadow-lg shadow-purple-400/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                />

                {focusedField === "recipient" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {errors.recipient && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.recipient}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <div className="relative group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full bg-gradient-to-br from-teal-600 via-cyan-600 to-purple-500 hover:from-teal-500 hover:via-cyan-500 hover:to-purple-400 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Locking...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>Lock It In</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>

          <div className="flex items-start space-x-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-100">
              <p className="font-semibold mb-1">Security Notice</p>
              <p>
                This action is irreversible. Please double-check all details
                before proceeding. Your funds will be cryptographically locked
                until the specified time period expires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
