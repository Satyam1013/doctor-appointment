// src/constants/productData.ts
/* eslint-disable @typescript-eslint/no-require-imports */

export interface Product {
  title: string;
  categoryKey: string;
  price: number;
  originalPrice: number;
  description: string;
  tags: string[];
  images: any[];
  productDetails?: string;
  benefits?: string;
  howToUse?: string;
}

export const productData: Record<string, Product> = {
  whiteningboostergel: {
    title: 'Whitening Booster Gel',
    categoryKey: 'whiteningboostergel',
    price: 799,
    originalPrice: 1199,
    description: 'Whitening Booster Gel for brighter teeth and fresh breath.',
    tags: ['Oral Care', 'Whitening', 'Gel'],
    images: [
      require('../../assets/images/ecom/whiteningboostergel/1.png'),
      require('../../assets/images/ecom/whiteningboostergel/2.png'),
      require('../../assets/images/ecom/whiteningboostergel/3.png'),
    ],
    productDetails:
      'A gel formulated to boost the whitening effect of your daily routine.',
    benefits: 'Whitens teeth, freshens breath, easy to use.',
    howToUse:
      'Apply a small amount on toothbrush along with toothpaste and brush as usual.',
  },
  whiteninggel: {
    title: 'Whitening Gel',
    categoryKey: 'whiteninggel',
    price: 899,
    originalPrice: 1299,
    description: 'Advanced Whitening Gel for everyday oral care.',
    tags: ['Teeth Care', 'Whitening'],
    images: [
      require('../../assets/images/ecom/whiteninggel/1.png'),
      require('../../assets/images/ecom/whiteninggel/2.png'),
      require('../../assets/images/ecom/whiteninggel/3.png'),
      require('../../assets/images/ecom/whiteninggel/4.png'),
    ],
    productDetails:
      'Gentle gel suitable for daily use to maintain white teeth.',
    benefits: 'Reduces stains, maintains white appearance, gentle on enamel.',
    howToUse: 'Apply directly on teeth or mix with toothpaste and brush.',
  },
  whiteningpen: {
    title: 'Whitening Pen',
    categoryKey: 'whiteningpen',
    price: 599,
    originalPrice: 899,
    description: 'Portable Whitening Pen for quick on-the-go application.',
    tags: ['Oral Care', 'Portable', 'Whitening'],
    images: [
      require('../../assets/images/ecom/whiteningpen/1.png'),
      require('../../assets/images/ecom/whiteningpen/2.png'),
      require('../../assets/images/ecom/whiteningpen/3.png'),
    ],
    productDetails:
      'Sleek design pen to quickly apply whitening formula on the go.',
    benefits: 'Instant whitening, travel-friendly, easy to use.',
    howToUse:
      'Twist the pen and apply a thin layer on teeth. Leave for 30 minutes without eating or drinking.',
  },
  teethwhiteningkit: {
    title: 'Teeth Whitening Kit',
    categoryKey: 'teethwhiteningkit',
    price: 2199,
    originalPrice: 2999,
    description: 'Comprehensive teeth whitening kit for home use.',
    tags: ['Teeth Care', 'Complete Kit'],
    images: [
      require('../../assets/images/ecom/teethwhiteningkit/1.png'),
      require('../../assets/images/ecom/teethwhiteningkit/2.png'),
      require('../../assets/images/ecom/teethwhiteningkit/3.png'),
      require('../../assets/images/ecom/teethwhiteningkit/4.png'),
      require('../../assets/images/ecom/teethwhiteningkit/5.png'),
      require('../../assets/images/ecom/teethwhiteningkit/6.png'),
      require('../../assets/images/ecom/teethwhiteningkit/7.png'),
      require('../../assets/images/ecom/teethwhiteningkit/8.png'),
    ],
    productDetails:
      'Includes LED light and whitening gel for professional-level results at home.',
    benefits: 'Whitens deeply, easy home application, long-lasting effects.',
    howToUse:
      'Apply gel to mouth tray, insert into mouth, and turn on LED light for 15–20 minutes.',
  },
  teethwhiteningserum: {
    title: 'Teeth Whitening Serum',
    categoryKey: 'teethwhiteningserum',
    price: 699,
    originalPrice: 999,
    description: 'Potent serum to enhance teeth whitening results.',
    tags: ['Serum', 'Whitening', 'Dental'],
    images: [
      require('../../assets/images/ecom/teethwhiteningserum/1.png'),
      require('../../assets/images/ecom/teethwhiteningserum/2.png'),
      require('../../assets/images/ecom/teethwhiteningserum/3.png'),
      require('../../assets/images/ecom/teethwhiteningserum/4.png'),
      require('../../assets/images/ecom/teethwhiteningserum/5.png'),
      require('../../assets/images/ecom/teethwhiteningserum/6.png'),
    ],
    productDetails:
      'Concentrated serum designed to work with whitening treatments.',
    benefits: 'Enhances results, easy to apply, safe for enamel.',
    howToUse: 'Apply a few drops on teeth or mix with gel in the tray.',
  },
  teethwhiteningstrips: {
    title: 'Teeth Whitening Strips',
    categoryKey: 'teethwhiteningstrips',
    price: 749,
    originalPrice: 1099,
    description: 'Easy-to-use whitening strips for daily teeth care.',
    tags: ['Strips', 'Teeth Whitening'],
    images: [
      require('../../assets/images/ecom/teethwhiteningstrips/1.png'),
      require('../../assets/images/ecom/teethwhiteningstrips/2.png'),
      require('../../assets/images/ecom/teethwhiteningstrips/3.png'),
      require('../../assets/images/ecom/teethwhiteningstrips/4.png'),
      require('../../assets/images/ecom/teethwhiteningstrips/5.png'),
      require('../../assets/images/ecom/teethwhiteningstrips/6.png'),
    ],
    productDetails:
      'Flexible strips coated with whitening gel for easy application.',
    benefits: 'No mess, visibly whitens teeth, convenient.',
    howToUse: 'Apply strip on upper and lower teeth for 30 minutes daily.',
  },
  toothpaste: {
    title: 'Toothpaste',
    categoryKey: 'toothpaste',
    price: 199,
    originalPrice: 299,
    description: 'Fluoride toothpaste for daily cleaning and whitening.',
    tags: ['Toothpaste', 'Daily Use'],
    images: [
      require('../../assets/images/ecom/toothpaste/1.png'),
      require('../../assets/images/ecom/toothpaste/2.png'),
    ],
    productDetails: 'Whitening toothpaste with cavity protection.',
    benefits: 'Cleans, protects, and whitens teeth.',
    howToUse: 'Brush teeth twice daily for 2 minutes.',
  },
  waterflosser: {
    title: 'Water Flosser',
    categoryKey: 'waterflosser',
    price: 1599,
    originalPrice: 2299,
    description: 'Cordless water flosser for deep cleaning between teeth.',
    tags: ['Water Flosser', 'Dental Hygiene'],
    images: [
      require('../../assets/images/ecom/waterflosser/1.png'),
      require('../../assets/images/ecom/waterflosser/2.png'),
      require('../../assets/images/ecom/waterflosser/3.png'),
    ],
    productDetails:
      'Rechargeable water flosser for effective interdental cleaning.',
    benefits: 'Removes plaque, massages gums, portable.',
    howToUse: 'Fill with water and direct stream between teeth.',
  },
  chewes: {
    title: 'Chewes',
    categoryKey: 'chewes',
    price: 299,
    originalPrice: 499,
    description: 'Mint-flavored chewes to maintain oral freshness.',
    tags: ['Oral Freshener', 'Chewables'],
    images: [
      require('../../assets/images/ecom/chewes/1.png'),
      require('../../assets/images/ecom/chewes/2.png'),
      require('../../assets/images/ecom/chewes/3.png'),
      require('../../assets/images/ecom/chewes/4.png'),
      require('../../assets/images/ecom/chewes/5.png'),
    ],
    productDetails: 'Chewable tablets that freshen breath and clean teeth.',
    benefits: 'Freshens breath, easy to carry, helps oral hygiene.',
    howToUse: 'Chew 1–2 tablets after meals or when needed.',
  },
  electronictoothbrush: {
    title: 'Electronic Toothbrush',
    categoryKey: 'electronictoothbrush',
    price: 1899,
    originalPrice: 2699,
    description: 'Rechargeable toothbrush with multiple brushing modes.',
    tags: ['Toothbrush', 'Rechargeable', 'Electronic'],
    images: [
      require('../../assets/images/ecom/electronictoothbrush/1.png'),
      require('../../assets/images/ecom/electronictoothbrush/2.png'),
      require('../../assets/images/ecom/electronictoothbrush/3.png'),
      require('../../assets/images/ecom/electronictoothbrush/4.png'),
      require('../../assets/images/ecom/electronictoothbrush/5.png'),
      require('../../assets/images/ecom/electronictoothbrush/6.png'),
      require('../../assets/images/ecom/electronictoothbrush/7.png'),
      require('../../assets/images/ecom/electronictoothbrush/8.png'),
      require('../../assets/images/ecom/electronictoothbrush/9.png'),
      require('../../assets/images/ecom/electronictoothbrush/10.png'),
    ],
    productDetails:
      'Electric toothbrush with soft bristles and multiple settings.',
    benefits: 'Thorough cleaning, improves gum health, easy to use.',
    howToUse:
      'Brush teeth for 2 minutes using desired mode. Recharge as needed.',
  },
  pulltool: {
    title: 'Pull Tool',
    categoryKey: 'pulltool',
    price: 499,
    originalPrice: 799,
    description: 'Tool designed for safe and effective aligner removal.',
    tags: ['Aligner Tool', 'Dental Tool'],
    images: [
      require('../../assets/images/ecom/pulltool/1.png'),
      require('../../assets/images/ecom/pulltool/2.png'),
      require('../../assets/images/ecom/pulltool/3.png'),
      require('../../assets/images/ecom/pulltool/4.png'),
      require('../../assets/images/ecom/pulltool/5.png'),
      require('../../assets/images/ecom/pulltool/6.png'),
      require('../../assets/images/ecom/pulltool/7.png'),
      require('../../assets/images/ecom/pulltool/8.png'),
      require('../../assets/images/ecom/pulltool/9.png'),
    ],
    productDetails: 'Compact tool to remove aligners comfortably.',
    benefits: 'Reduces risk of damage, easy grip, safe material.',
    howToUse:
      'Use hook to gently dislodge aligner from molar area and peel forward.',
  },
  alignersandretainer: {
    title: 'Aligners and Retainer',
    categoryKey: 'alignersandretainer',
    price: 4999,
    originalPrice: 6499,
    description: 'Invisible aligners and retainers for perfect smiles.',
    tags: ['Aligners', 'Retainers', 'Dental'],
    images: [
      require('../../assets/images/ecom/aligners/1.png'),
      require('../../assets/images/ecom/aligners/2.png'),
      require('../../assets/images/ecom/aligners/3.png'),
    ],
    productDetails:
      'Custom-fitted aligners and retainers to straighten and maintain teeth.',
    benefits: 'Discreet, effective alignment, personalized fit.',
    howToUse:
      'Wear aligners as instructed by dentist, usually 20–22 hours per day.',
  },
  alignersfoam: {
    title: 'Aligners Foam Cleaner',
    categoryKey: 'alignersfoam',
    price: 599,
    originalPrice: 899,
    description: 'Foam cleaner for aligners and retainers.',
    tags: ['Aligner Care', 'Cleaner'],
    images: [
      require('../../assets/images/ecom/alignersfoam/1.png'),
      require('../../assets/images/ecom/alignersfoam/2.png'),
      require('../../assets/images/ecom/alignersfoam/3.png'),
      require('../../assets/images/ecom/alignersfoam/4.png'),
    ],
    productDetails: 'Antibacterial foam for cleaning aligners without rinsing.',
    benefits: 'Kills odor-causing bacteria, no rinse needed, gentle formula.',
    howToUse: 'Pump foam onto aligner, spread evenly, let sit or wipe clean.',
  },
  checkretractor: {
    title: 'Cheek Retractor',
    categoryKey: 'checkretractor',
    price: 249,
    originalPrice: 399,
    description: 'Cheek retractors for dental photography and procedures.',
    tags: ['Dental Tool', 'Photography'],
    images: [
      require('../../assets/images/ecom/checkretractor/1.png'),
      require('../../assets/images/ecom/checkretractor/2.png'),
      require('../../assets/images/ecom/checkretractor/3.png'),
    ],
    productDetails:
      'Durable retractors to keep cheeks away for clear oral view.',
    benefits: 'Comfortable fit, reusable, easy to sterilize.',
    howToUse:
      'Insert ends into mouth to retract cheeks. Hold or let rest during procedures.',
  },
};
