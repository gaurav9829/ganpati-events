const fs = require('fs');
const path = require('path');
const assert = require('assert');

const fileContent = fs.readFileSync(path.join(__dirname, '..', 'content', 'site.ts'), 'utf8');

console.log("--- VERIFYING VERBATIM CONTENT IN site.ts ---");

// Check Hero H1
assert(fileContent.includes('Turning your imagination into a royal birthday celebration'));
console.log("✓ Hero H1 match verified!");

// Check Package names & prices
assert(fileContent.includes('Essential Collection'));
assert(fileContent.includes('Rs. 14,000'));
assert(fileContent.includes('Elegant Collection'));
assert(fileContent.includes('Rs. 16,000'));
assert(fileContent.includes('Elite Collection'));
assert(fileContent.includes('Rs. 20,000'));
assert(fileContent.includes('Luxury Collection'));
assert(fileContent.includes('Rs. 25,000'));
assert(fileContent.includes('Signature Collection'));
console.log("✓ All 5 package names and prices verified!");

// Check Section 9 Quirks Preservation
assert(fileContent.includes('8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1'));
assert(fileContent.includes('1 candidate for 2 reel shoots by iPhone.'));
assert(fileContent.includes('Theme, colours, name, photos and custom requirements discuss karein.'));
assert(fileContent.includes('⭐ Most Booked'));
assert(fileContent.includes('Your Imagination into reality'));

console.log("✓ All Section 9 content quirks successfully verified!");
console.log("ALL VERBATIM CONTENT CHECKS PASSED!");
