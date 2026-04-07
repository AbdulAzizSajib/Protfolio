"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Icon } from "@iconify/react";
import { rainPoop } from "poopetti";

const LoveButton = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  const getIdentifier = () => {
    let identifier = localStorage.getItem("portfolioUserId");
    if (!identifier) {
      identifier = `user_${Date.now()}${Math.random().toString(36)}`;
      localStorage.setItem("portfolioUserId", identifier);
    }
    return identifier;
  };

  const fetchLikeStatus = async () => {
    setLoading(true);
    try {
      const identifier = getIdentifier();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/api/like/check?identifier=${identifier}`);
      const data = await res.json();

      if (data.success) {
        setHasLiked(data.hasLiked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikeStatus();
  }, []);

  const handleLike = async () => {
    setLoading(true);

    try {
      const identifier = getIdentifier();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

      if (hasLiked) {
        const res = await fetch(`${apiUrl}/api/like/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier }),
        });
        const data = await res.json();

        if (data.success) {
          setHasLiked(false);
          setLikeCount(data.likeCount);
        }
      } else {
        const res = await fetch(`${apiUrl}/api/like/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier }),
        });
        const data = await res.json();

        if (data.success) {
          setHasLiked(true);
          setLikeCount(data.likeCount);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 600);

          rainPoop({
            emoji: ["😇", "😁", "🤩", "🥳", "🤍", "😎"],
            duration: 5000,
            density: 80,
          });
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        type="button"
        className={`flex items-center gap-2 px-4 py-1 rounded-full transition-all duration-300 ${
          hasLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } ${isAnimating ? "scale-110" : "scale-90"}`}
      >
        {loading ? (
          <Icon icon="streamline-ultimate:loading" className="w-5 h-5 animate-spin" />
        ) : (
          <Heart
            className={`w-5 h-5 ${hasLiked ? "fill-current" : ""} ${
              isAnimating ? "animate-pulse" : ""
            }`}
          />
        )}
        <span className="font-semibold">{likeCount}</span>
      </button>
    </div>
  );
};

export default LoveButton;
