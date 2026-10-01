"use client";

import { useState } from "react";
import { Star, Send, MessageCircle, Instagram, CheckCircle2 } from "lucide-react";
import { CONTACT } from "@/content/site";

export default function ReviewForm({ onReviewAdded }: { onReviewAdded?: (review: { quote: string; author: string; rating: number }) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !name.trim()) return;

    if (onReviewAdded) {
      onReviewAdded({
        quote: `“${reviewText.trim()}”`,
        author: name.trim() + (eventDetails ? ` (${eventDetails.trim()})` : ""),
        rating,
      });
    }

    setSubmitted(true);
  };

  const handleWhatsAppSubmit = () => {
    if (!reviewText.trim() || !name.trim()) return;

    const stars = "⭐".repeat(rating);
    const text =
      `Hi Ganpati Events,\n` +
      `Here is my review for your event decoration:\n\n` +
      `Rating: ${stars} (${rating}/5)\n` +
      `Name: ${name.trim()}\n` +
      (eventDetails.trim() ? `Event/Theme: ${eventDetails.trim()}\n` : "") +
      `Feedback: "${reviewText.trim()}"`;

    const url = `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="mt-6 pt-5 border-t border-line/60">
      {!isOpen && !submitted ? (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 bg-surface hover:bg-gold-light/20 text-text border border-line hover:border-gold px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            <Star className="w-4 h-4 text-gold fill-current" />
            <span>Booked with us? Share Your Review</span>
          </button>
        </div>
      ) : submitted ? (
        <div className="bg-surface border border-emerald/30 rounded-2xl p-5 text-center shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-10 h-10 text-emerald mx-auto mb-2" />
          <h3 className="font-serif font-bold text-lg text-text">
            Thank You for Your Valuable Feedback!
          </h3>
          <p className="text-muted text-xs sm:text-sm mt-1 max-w-md mx-auto">
            We appreciate your support. You can also tag us in your event photos on Instagram.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-deep bg-emerald/10 px-3.5 py-2 rounded-full hover:bg-emerald/20 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Tag us on Instagram</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setIsOpen(false);
                setReviewText("");
                setName("");
                setEventDetails("");
              }}
              className="text-xs text-muted hover:text-text px-3 py-2"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-line rounded-2xl p-5 sm:p-6 shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-line/40">
            <div>
              <h3 className="font-serif font-bold text-lg text-text">
                Leave a Review
              </h3>
              <p className="text-muted text-xs mt-0.5">
                Share your experience with Ganpati Events
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-text text-xl font-bold p-1 leading-none"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-gold-deep mb-1.5">
              Your Rating
            </label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star
                        ? "text-amber-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-semibold text-text mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ridhi Madhakar"
                className="w-full bg-[var(--bg)] border border-line rounded-xl px-3 py-2 text-xs sm:text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text mb-1">
                Occasion / Theme (Optional)
              </label>
              <input
                type="text"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder="e.g. 1st Birthday Setup"
                className="w-full bg-[var(--bg)] border border-line rounded-xl px-3 py-2 text-xs sm:text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-text mb-1">
              Your Feedback *
            </label>
            <textarea
              required
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about the decoration, setup timing, and overall experience..."
              className="w-full bg-[var(--bg)] border border-line rounded-xl p-3 text-xs sm:text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleWhatsAppSubmit}
              disabled={!name.trim() || !reviewText.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Review via WhatsApp</span>
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !reviewText.trim()}
              className="inline-flex items-center justify-center gap-1.5 bg-wine hover:bg-wine/90 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit on Page</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
