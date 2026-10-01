const assert = require('assert');

const CONTACT = {
  whatsappBase: "https://wa.me/919351975852",
};

function packageEnquiryUrl(shortName, priceWhatsApp) {
  const text =
    `Hi Ganpati Events,\n` +
    `I am interested in the ${shortName} Collection – ₹${priceWhatsApp}.\n` +
    `I would like to check availability for my birthday event.\n` +
    `Date:\n` +
    `Location:`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
}

function helpChoosingUrl() {
  const text =
    `Hi Ganpati Events,\n` +
    `I need help choosing the right birthday decoration package.\n` +
    `Date:\n` +
    `Location:\n` +
    `Budget:`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
}

// Test Essential
const essentialUrl = packageEnquiryUrl("Essential", "14,000");
const essentialDecoded = decodeURIComponent(essentialUrl.replace("https://wa.me/919351975852?text=", ""));
assert.strictEqual(
  essentialDecoded,
  "Hi Ganpati Events,\nI am interested in the Essential Collection – ₹14,000.\nI would like to check availability for my birthday event.\nDate:\nLocation:"
);
console.log("✓ Essential package WhatsApp URL test passed!");

// Test Help
const helpUrl = helpChoosingUrl();
const helpDecoded = decodeURIComponent(helpUrl.replace("https://wa.me/919351975852?text=", ""));
assert.strictEqual(
  helpDecoded,
  "Hi Ganpati Events,\nI need help choosing the right birthday decoration package.\nDate:\nLocation:\nBudget:"
);
console.log("✓ Help choosing WhatsApp URL test passed!");

console.log("All WhatsApp URL unit tests passed successfully!");
