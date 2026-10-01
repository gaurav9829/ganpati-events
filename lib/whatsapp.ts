import { CONTACT } from "@/content/site";

export const packageEnquiryUrl = (shortName: string, priceWhatsApp: string): string => {
  const text =
    `Hi Ganpati Events,\n` +
    `I am interested in the ${shortName} Collection – ₹${priceWhatsApp}.\n` +
    `I would like to check availability for my birthday event.\n` +
    `Date:\n` +
    `Location:`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
};

export const helpChoosingUrl = (): string => {
  const text =
    `Hi Ganpati Events,\n` +
    `I need help choosing the right birthday decoration package.\n` +
    `Date:\n` +
    `Location:\n` +
    `Budget:`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
};
