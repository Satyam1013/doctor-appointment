// src/constants/productData.ts
/* eslint-disable @typescript-eslint/no-require-imports */

export interface Product {
  _id?: string;
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
  ingredients?: string;
  caution?: string;
  information?: string;
  contents?: string;
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
    title: 'Brightening Gel Toothpaste',
    categoryKey: 'whiteninggel',
    price: 899,
    originalPrice: 1299,
    description:
      'Vitamin C-infused whitening gel toothpaste that removes stains, strengthens gums, and provides long-lasting freshness with every brush.',
    tags: ['Teeth Care', 'Whitening', 'Toothpaste', 'Daily Use'],
    images: [
      require('../../assets/images/ecom/whiteninggel/1.png'),
      require('../../assets/images/ecom/whiteninggel/2.png'),
      require('../../assets/images/ecom/whiteninggel/3.png'),
      require('../../assets/images/ecom/whiteninggel/4.png'),
    ],
    productDetails:
      'mydent Brightening Gel Toothpaste is a fluoridated, Vitamin C-boosted formula that combines whitening, freshness, and gum health. Its foaming gel texture with clove and eucalyptus oil offers a gentle yet powerful clean, ideal for daily use—even on sensitive teeth.',
    benefits:
      '- Visibly whitens teeth and removes surface stains\n' +
      '- Freshens breath with long-lasting clove and eucalyptus freshness\n' +
      '- Strengthens gums and supports full-mouth health\n' +
      '- Enamel-safe for sensitive teeth\n' +
      '- Gentle, foaming formula with Vitamin C beads',
    howToUse:
      'Apply a pea-sized amount to a toothbrush and brush thoroughly twice daily or as directed by your dentist. Avoid swallowing and rinse thoroughly after use.',
    ingredients:
      'Sorbitol, Silica, PEG-8, Aqua, Hydrated Silica, Sodium Methyl Cocoyl Taurate, Flavour, Cellulose Gum, Sodium Benzoate, Cocamidopropyl Betaine, Sodium Fluoride, Zinc Sulfate, Cellulose, Lactose, Ascorbic Acid (Vitamin C), Hydroxypropyl Methylcellulose, Sucralose, Disodium EDTA, Eugenia Caryophyllus Oil (Clove Oil), Eucalyptus Globulus Oil (Eucalyptus Oil).',
    caution:
      'Keep out of reach of children under 6. In case of accidental ingestion, seek medical help. Avoid contact with eyes. If contact occurs, rinse with water immediately.',
    information:
      'mydent is India’s leading at-home smile makeover brand—created by orthodontists, backed by technology. Our refreshing gel toothpaste is part of a broader oral care line including whitening kits, aligners, and smart toothbrushes—crafted for a complete, confident smile routine.',
  },
  whiteningpen: {
    title: 'Spark Teeth Whitening Pen',
    categoryKey: 'whiteningpen',
    price: 599,
    originalPrice: 899,
    description:
      'Fast-acting whitening pen with enamel-safe PAP+ technology for a visibly brighter smile in just 30 minutes—perfect for travel and daily touch-ups.',
    tags: [
      'Oral Care',
      'Portable',
      'Whitening',
      'PAP Technology',
      'Teeth Brightening',
    ],
    images: [
      require('../../assets/images/ecom/whiteningpen/1.png'),
      require('../../assets/images/ecom/whiteningpen/2.png'),
      require('../../assets/images/ecom/whiteningpen/3.png'),
    ],
    productDetails:
      'The mydent Spark Teeth Whitening Pen is a compact, peroxide-free solution powered by PAP+ technology. It safely removes stains, fights plaque, and freshens breath without causing sensitivity—whiten anywhere, anytime.',
    benefits:
      '- Powered by PAP+ Technology\n' +
      '- Enamel-safe & sensitivity-free\n' +
      '- Whitens teeth in 30 minutes\n' +
      '- Removes coffee, tea, wine & tobacco stains\n' +
      '- Freshens breath and fights plaque\n' +
      '- 100% toxin-free and travel-friendly',
    howToUse:
      '1. Rinse your mouth before application\n' +
      '2. Shake the pen well\n' +
      '3. Twist bottom until gel appears (first use may require 20 twists)\n' +
      '4. Apply a thin, even layer onto teeth\n' +
      '5. Wait 30 seconds–1 minute, then rinse with water',
    ingredients:
      'Sorbitol, Aqua (Water), PAP (Phthalimidoperoxycaproic Acid), Propylene Glycol, Glycerin, Potassium Nitrate, PEG-8, Hydroxyapatite, Cellulose Gum, Hydroxyethyl Cellulose, Xanthan Gum, Sodium Saccharin, Menthol, Methylparaben, Aloe Vera Leaf Juice, Chamomile Extract, Pomegranate Seed Extract, Sodium Bicarbonate, Propylparaben',
    information:
      'Designed by orthodontists and built with cutting-edge tech, mydent offers India’s most advanced at-home oral care. The Spark Whitening Pen is certified by CE, CPSR, and RoHS, and is part of our larger lineup of smart dental solutions—from aligners to electric toothbrushes—all created to redefine your smile journey with comfort and confidence.',
  },
  teethwhiteningkit: {
    title: 'Teeth Whitening Kit',
    categoryKey: 'teethwhiteningkit',
    price: 2100,
    originalPrice: 7000,
    description:
      'Comprehensive teeth whitening kit for a fast, radiant smile—anytime, anywhere.',
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
      'Smile-Ready for Your Morning Meeting or Night Out? Introducing the mydent 1st Generation Whitening Kit – your go-to solution for a confident, radiant smile anytime, anywhere! Powered by advanced PAP technology, the whitening gel delivers effective results without sensitivity, while the portable LED accelerator mouthpiece uses blue light technology to boost whitening power on the go.',
    benefits:
      '- Advanced PAP Formulation: Safe and effective without harsh ingredients\n- Wireless LED Technology: Portable and hassle-free\n- Enamel-Safe: Protects teeth while whitening\n- Sensitivity-Free: Comfortable for daily use\n- CE, CPSR, and RoHS Certified: Meets top safety standards\n- At-Home Whitening: Get professional results at home in under 15 minutes',
    howToUse:
      'Step 1: Rinse mouth and tray\nStep 2: Use shade guide to note tooth color\nStep 3: Twist pen to release gel\nStep 4: Apply thin layer to dry teeth\nStep 5: Use 0.5–0.7 ml of gel total\nStep 6: Attach tray to LED and power on\nStep 7: Relax and minimize saliva\nStep 8: Keep tray in for 12–15 mins (up to 30 max)\nStep 9: Rinse mouth and tray after\nStep 10: Avoid food/drink for 30 mins\nStep 11: Repeat daily for 9–12 days',
    ingredients:
      'PAP (Phthalimidoperoxycaproic acid), Potassium Citrate, Hydroxyapatite, Propylene Glycol, Glycerin, PEG-8, Menthol, Flavoring Agents.',
    caution:
      'For external use only. Not suitable for children under 12. Do not swallow gel. Avoid use on broken gums or teeth. If irritation occurs, discontinue use and consult a dentist.',
    information:
      'What’s Inside:\n- 3 mydent Spark Whitening Pens with PAP gel\n- 1 Food-Grade Mouth Tray\n- 1 Wireless LED Light Accelerator\n- 1 Shade Card\n- 1 User Manual\nExpected delivery within 7–10 working days.',
  },
  teethwhiteningserum: {
    title: 'Teeth Whitening Serum',
    categoryKey: 'teethwhiteningserum',
    price: 480,
    originalPrice: 600,
    description:
      'Instantly brightens your smile with purple-toned, enamel-safe whitening serum for daily touch-ups.',
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
      'Get a visibly brighter smile in seconds with the mydent teeth whitening Serum, expertly formulated to neutralize yellow tones and revive your natural whiteness. The non-cytotoxic, enamel-safe formula ensures effective results without harsh chemicals, ideal for sensitive teeth. Great for daily use or pre-event touch-ups.',
    benefits:
      '- Instantly brightens with advanced colour-correcting purple serum\n- Bleach-free and enamel-safe for worry-free use\n- Clinically tested and certified safe for all skin types\n- Sugar-free and gentle on teeth and gums\n- Infused with peppermint oil for long-lasting freshness\n- Compact and perfect for on-the-go confidence',
    howToUse:
      'Step 1: Dispense 2 pumps onto a soft-bristle toothbrush\nStep 2: Brush gently in circular motions for 2 minutes\nStep 3: Spit and rinse mouth thoroughly (do not swallow)\nPro Tip: Use as needed before events or daily for quick refresh',
    ingredients:
      'Glycerin, Hydrated Silica, Xylitol, Peppermint Oil (Mentha Piperita), Polysorbate 80, Cellulose Gum, Phenoxyethanol, Ethylhexylglycerin, Sucralose, Purple Colorants.',
    caution:
      'Do not swallow. For external use only. Not for children under 12. Avoid contact with eyes. If irritation occurs, stop use and consult a dentist.',
    information:
      'How It Works: Based on colour theory, purple neutralizes yellow—making this serum ideal for removing visible discoloration. Safe for daily use and suitable for all skin/teeth types. Travel-ready, compact design. Expected delivery in 7–10 working days.',
  },
  teethwhiteningstrips: {
    title: 'Teeth Whitening Strips',
    categoryKey: 'teethwhiteningstrips',
    price: 749,
    originalPrice: 1099,
    description:
      'Effective and enamel-safe bamboo charcoal whitening strips for a brighter, healthier smile—without sensitivity.',
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
      'Discover a fast, safe way to whiten your teeth at home with mydent Bamboo Charcoal Teeth Whitening Strips. Formulated to tackle even stubborn stains, these strips offer noticeable results without causing sensitivity.',
    benefits:
      '- Whitens teeth in 30 minutes per session\n- Safe and gentle for daily use\n- No sensitivity formula\n- Easy peel-and-stick application\n- Fresh finish with clean rinse\n- Charcoal-infused for deep stain removal',
    howToUse:
      'Step 1: Peel off the upper and lower whitening strips.\nStep 2: Apply the top strip to upper teeth and bottom strip to lower teeth.\nStep 3: Leave on for 30 minutes without eating or drinking.\nStep 4: Remove strips and rinse any remaining gel. Optionally brush gently for best finish.',
    ingredients:
      'Bamboo Charcoal, Hydrogen Peroxide (safe concentration), PVP, Glycerin, Menthol, Water, Carbomer, Sodium Hydroxide, Cellulose Gum.',
    caution:
      'For external use only. Not recommended for children under 12. Avoid contact with eyes. If irritation occurs, stop use and consult a dentist.',
    information:
      'Achieve professional-level whitening at home. Use daily or as needed for touch-ups. Results may vary based on stain intensity. Delivery in 7–10 working days.',
  },
  toothpaste: {
    title: 'Crystal Cool Toothpaste',
    categoryKey: 'toothpaste',
    price: 199,
    originalPrice: 299,
    description:
      'Start your day with an icy burst of freshness and confidence with mydent Crystal Cool Toothpaste. Long-lasting minty freshness, enamel-safe formula, and advanced plaque protection make this your daily essential for a radiant smile.',
    tags: ['Toothpaste', 'Mint Freshness', 'Daily Use', 'Enamel Safe'],
    images: [
      require('../../assets/images/ecom/toothpaste/1.png'),
      require('../../assets/images/ecom/toothpaste/2.png'),
    ],
    productDetails:
      '100g tube of advanced toothpaste that provides long-lasting icy freshness while fighting plaque and bacteria. Strengthens enamel and supports healthy gums.',
    benefits:
      '❄️ Long-Lasting Icy Freshness\n' +
      '🛡️ Daily Germ Protection against bacteria and plaque\n' +
      '🌿 Mint-powered fresh breath\n' +
      '🦷 Supports healthy gums and strong teeth\n' +
      '✅ Enamel-safe, ideal for daily use without sensitivity',
    howToUse:
      'Brush your teeth twice daily for 2 minutes, especially after meals, for lasting freshness and oral protection.',
    ingredients:
      'Sorbitol, Aqua, Glycerin, Sodium Lauryl Sulfate, Sodium Fluoride, Xylitol, Sodium Saccharin, Menthol, Sodium Bicarbonate, Titanium Dioxide, Cellulose Gum, Clove Oil, Natural Mint Extracts.',
    information:
      'mydent Crystal Cool Toothpaste offers a cool burst of freshness with every brush, formulated to deliver all-day freshness and protect your smile. This advanced formula is perfect for individuals looking for a long-lasting refreshing sensation, healthier gums, and stronger enamel. As part of mydent’s commitment to providing innovative, at-home oral care solutions, Crystal Cool offers an enamel-safe, gentle formula for daily use, making it a must-have for your morning and nighttime routines.',
  },
  waterflosser: {
    title: 'Water Flosser',
    categoryKey: 'waterflosser',
    price: 2000,
    originalPrice: 4000,
    description: 'Cordless water flosser for deep cleaning between teeth.',
    tags: ['Water Flosser', 'Dental Hygiene'],
    images: [
      require('../../assets/images/ecom/waterflosser/1.png'),
      require('../../assets/images/ecom/waterflosser/2.png'),
      require('../../assets/images/ecom/waterflosser/3.png'),
    ],
    productDetails:
      'Elevate your oral hygiene routine with the mydent Advanced Water Flosser – a portable, rechargeable solution designed for effective and convenient dental care. Featuring a large-capacity water tank and customizable water pressure settings, it offers three cleaning modes: Normal, Point, and Pulse, to suit your individual needs. The flosser comes equipped with 2 jet tips, 1 orthodontic tip, 1 periodontal tip, and 1 tongue cleaner tip for a complete clean. Its ergonomic design, gravity ball technology for consistent water flow, and built-in charging indicator make it both user-friendly and travel-ready. Safe, efficient, and perfect for on-the-go use!',
    benefits:
      'mydent Advanced Water Flosser – Complete, Customizable, and Travel-Ready Oral Care\n- Three Modes: Normal, Point, Pulse with 4 adjustable water pressures.\n- Portable & Ergonomic: Large tank, gravity ball for consistent flow, and compact design.\n- Accessory Kit: Includes 2 jet tips, 1 orthodontic, 1 periodontal, and 1 tongue cleaner tip.\n- Smart Operation: Power key, jet tip lock, charging indicator, and water level display.\n- Factory-Tested: May contain traces of distilled water; safe for use.',
    howToUse:
      'How to Use the mydent Advanced Water Flosser:\n1. Fill the Reservoir: Open and fill the tank with clean water, then secure the lid.\n2. Attach the Jet Tip: Choose a tip (jet, ortho, perio, tongue) and insert until it clicks.\n3. Power On: Press ON/OFF and let water flow stabilize.\n4. Start with Soft Mode: Ideal for beginners or sensitive gums.\n5. Position the Nozzle: Aim between teeth at the gumline.\n6. Adjust Pressure: Move slowly, changing pressure/modes as needed.\n7. Finish & Rinse: Turn off, remove the tip, empty tank, and rinse parts.',
    ingredients:
      'ABS plastic body, BPA-free water reservoir, food-grade silicone sealings, stainless steel internals, electronic components.',
    caution:
      'Do not use with mouthwash or any liquid other than clean water unless specified. Not recommended for children under 12 without supervision. Avoid pointing the stream directly into the throat or eyes.',
    information:
      'The device is water-resistant but not waterproof—do not submerge. Charge fully before first use. Distilled water residue from factory testing is safe and harmless.',
  },
  chewes: {
    title: 'Chewes',
    categoryKey: 'chewes',
    price: 300,
    originalPrice: 600,
    description:
      'Gotcha! Like many others, you’ve fallen for our clickbait title! 😜 But don’t worry—these aren’t candies (unfortunately). However, they do come in three exciting flavors that make your experience even better!\n🛒 Order now and get it delivered within 7-10 working days.\n💰 Price includes all taxes.',
    tags: ['Oral Freshener', 'Chewables'],
    images: [
      require('../../assets/images/ecom/chewes/1.png'),
      require('../../assets/images/ecom/chewes/2.png'),
      require('../../assets/images/ecom/chewes/3.png'),
      require('../../assets/images/ecom/chewes/4.png'),
      require('../../assets/images/ecom/chewes/5.png'),
    ],
    productDetails:
      'Why Use Chewies?\nAs you embark on your smile journey, your new aligners may not fit tightly at first. Chewies help provide extra pressure, allowing your aligners to fit more comfortably and straighten your teeth faster. Simply bite down on one chewie on each side of your mouth for 5 to 10 minutes, three to four times a day, and feel the pressure work to improve your aligner fit and speed up your results.\n\nWho Is It For?\nPerfect for anyone using aligners as part of their smile transformation.\n\nWhat’s in the Box?\n1 Chewie',
    benefits:
      'Chewies – The Easy & Effective Way to Enhance Your Smile Journey\n- Easy to Use: Simply bite down for 5–10 minutes, three to four times a day, to help your aligners fit better and straighten your teeth faster.\n- Exciting Flavours: Available in three refreshing flavours – Strawberry, Grapes, and Mint.\n- Hygienic & Safe: Crafted with hygiene and safety in mind, ensuring a clean and comfortable experience.',
    howToUse:
      'How to Use Chewies:\nStep 1:\nAfter putting on your aligners, bite down on the chewie for up to two minutes. Start with your right side and gradually work your way to the left.\n\nStep 2:\nOnce you’re done, your aligners should now have a snug fit. Clean and dry your chewie after every use.\n\nStep 3:\nStore your chewie in a dry box to keep it hygienic and ready for the next use.\n\nRepeat these steps each time you use your aligners for best results.',
    ingredients:
      'Food-grade silicone or similar non-toxic, BPA-free, latex-free material, flavored with safe food-grade essences (Strawberry, Grapes, Mint).',
    caution:
      'Do not swallow. Not suitable for children under 12. Keep out of reach of pets and children. Clean regularly to maintain hygiene.',
    information:
      'Chewies are reusable and designed to assist aligner fit and comfort. They are not edible and should only be used as directed for orthodontic support.',
  },
  electronictoothbrush: {
    title: 'Electro Sonic Electric Toothbrush',
    categoryKey: 'electronictoothbrush',
    price: 1899,
    originalPrice: 2699,
    description:
      'The mydent Electro Sonic Electric Toothbrush is designed for optimal oral care with 6 customizable modes, 5 brush heads, and waterproof protection. Experience a tailored, deep clean wherever you go with long-lasting power and a travel-friendly design.',
    tags: ['Toothbrush', 'Rechargeable', 'Electronic', 'Sonic Cleaning'],
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
      'The mydent Electro Sonic Electric Toothbrush offers a personalized brushing experience with 6 cleaning modes and 5 interchangeable brush heads. It is IPX7 waterproof for safe use in the shower and has a long-lasting rechargeable battery. Perfect for daily use and travel.',
    benefits:
      '• 6 Customizable Modes for tailored cleaning\n' +
      '• 5 Interchangeable Brush Heads for optimized cleaning\n' +
      '• IPX7 Waterproof for use in shower and easy cleaning\n' +
      '• Rechargeable with up to 2 weeks of use on a single charge\n' +
      '• Includes a travel case for portability\n' +
      '• Superior teeth cleaning for a fresh smile every day',
    howToUse:
      '1. Choose your desired cleaning mode.\n' +
      '2. Brush for 2 minutes using the built-in timer for optimal cleaning.\n' +
      '3. After use, rinse the toothbrush head and store it in the travel case for easy portability.',
    contents:
      '• Electric Toothbrush Handle\n' +
      '• 5 Interchangeable Brush Heads\n' +
      '• Rechargeable Battery\n' +
      '• Travel Case\n' +
      '• User Manual',
  },
  pulltool: {
    title: 'Aligner Retriever Tool',
    categoryKey: 'pulltool',
    price: 499,
    originalPrice: 799,
    description:
      'Effortlessly remove your aligners with this ergonomic Aligner Retriever Tool. Designed for comfort and safety, it ensures easy, hygienic removal of your aligners or retainers without damage.',
    tags: ['Aligner Tool', 'Dental Tool', 'Aligner Removal'],
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
    productDetails:
      'The Aligner Retriever Tool is designed with a specially crafted hook for easy and comfortable aligner removal. Its compact, ergonomic design makes it travel-friendly and easy to use wherever you are.',
    benefits:
      '• Ergonomic and easy-to-use design\n' +
      '• Safely removes aligners without damaging them\n' +
      '• Compact and travel-friendly\n' +
      '• Ensures hygienic removal of aligners or retainers\n' +
      '• Ideal for anyone using mydent aligners, from beginners to experienced users',
    howToUse:
      '1. Start from the back of your mouth, positioning the tool along your gum line on both sides.\n' +
      '2. Gently move towards the front of your mouth, pulling the aligners off your teeth.\n' +
      '3. Use gentle pressure to ensure no damage occurs to the aligners.',
    contents: '• 1 Aligner Retriever Tool',
  },
  alignersandretainer: {
    title: 'Mydent Retainer',
    categoryKey: 'alignersandretainer',
    price: 4999,
    originalPrice: 6499,
    description:
      'The final step of your smile makeover journey. Maintain your stunning smile with our custom-fitted retainers, designed to preserve the results of your treatment for lasting perfection.',
    tags: ['Retainers', 'Smile Makeover', 'Dental Care'],
    images: [
      require('../../assets/images/ecom/aligners/1.png'),
      require('../../assets/images/ecom/aligners/2.png'),
      require('../../assets/images/ecom/aligners/3.png'),
    ],
    productDetails:
      'Ideal for maintaining the results of your smile makeover, these retainers should be worn for 24 hours a day for the first 6 months after your treatment. They are custom-fitted to ensure lasting results.',
    benefits:
      '• Custom-fitted for a perfect, comfortable fit\n' +
      '• Ensures lasting results from your smile makeover\n' +
      '• Wearable 24/7 for the first 6 months\n' +
      '• Available in upper, lower, or both retainers, depending on your order\n' +
      '• Preserve your smile in the most discreet way',
    howToUse:
      '• Wear the retainer 24 hours a day for the first 6 months after your smile makeover.\n' +
      '• After 6 months, wear the retainer at night to maintain the results.',
    contents:
      '• Upper Retainer\n' +
      '• Lower Retainer\n' +
      '• Or Both, depending on your order',
  },
  alignersfoam: {
    title: 'Foamy Aligner Cleaning Foam',
    categoryKey: 'alignersfoam',
    price: 599,
    originalPrice: 899,
    description:
      'Gentle, peppermint-infused foam cleanser that whitens and refreshes aligners while killing 99% of bacteria—perfect for on-the-go care.',
    tags: ['Aligner Care', 'Cleaner', 'Whitening', 'Oral Hygiene'],
    images: [
      require('../../assets/images/ecom/alignersfoam/1.png'),
      require('../../assets/images/ecom/alignersfoam/2.png'),
      require('../../assets/images/ecom/alignersfoam/3.png'),
      require('../../assets/images/ecom/alignersfoam/4.png'),
    ],
    productDetails:
      'Foamy Aligner Cleaning Foam by mydent is a powerful yet safe cleaner formulated for all clear aligners and retainers. With a BPA-free, antibacterial blend and peppermint freshness, it whitens, deodorizes, and protects without harsh chemicals. Portable and easy to use—just apply, wait 30 seconds, and rinse.',
    benefits:
      '- BPA-Free: Safe, chemical-free formula\n' +
      '- Stain-Free: Removes yellowing and buildup\n' +
      '- Odor-Free: Eliminates bacteria-causing smells\n' +
      '- 99% Germ Kill: Strong antibacterial protection\n' +
      '- Minty Freshness: Leaves aligners clean and invigorated\n' +
      '- Easy & Portable: Ideal for home or travel use',
    howToUse:
      '1. Remove aligners from your mouth\n' +
      '2. Pump foam directly onto aligners\n' +
      '3. Let sit for 30 seconds\n' +
      '4. Rinse thoroughly with water\n' +
      '5. Repeat as needed before each use',
    ingredients:
      'Cocamidopropyl Betaine, Benzalkonium Chloride, Propylene Glycol, Diazolidinyl Urea, Iodopropynyl Butylcarbamate, Water, Peppermint, Glycerine',
    information:
      'Crafted by orthodontists and powered by cutting-edge tech, mydent is India’s leading at-home smile makeover brand. The Foamy Aligner Cleaning Foam is part of our modern oral care lineup, including aligners, whitening pens, smart toothbrushes, and more. It delivers easy, fast, and refreshing aligner hygiene—just apply, wait, rinse, and smile!',
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
      'Cheek retractors help keep the oral cavity open by gently pulling back the cheeks, offering an unobstructed view for dental exams, procedures, or clear intraoral photography. Made from durable, medical-grade material for professional or at-home aligner check-ups.',
    benefits:
      '- Provides clear visibility of teeth and gums for dental procedures and aligner checks.\n- Comfortable ergonomic fit designed to reduce strain and irritation.\n- Reusable and easy to clean—can be sterilized using hot water or disinfectants.',
    howToUse:
      '1. Hold the retractor by its arms and gently place each end inside the mouth, hooking behind the lips.\n2. Adjust to ensure both cheeks are comfortably and fully retracted.\n3. Use hands to hold in place or allow it to rest during the procedure or photography.\n4. After use, wash thoroughly and dry before storing.',
    ingredients:
      'High-quality medical-grade BPA-free plastic (polycarbonate or polypropylene).',
    caution:
      'Do not force into mouth. Avoid use if you have mouth sores or irritation. Supervise children using cheek retractors.',
    information:
      'Cheek retractors are non-invasive tools commonly used in dentistry and orthodontics. Suitable for both clinic and home use. Wash before and after each use to maintain hygiene.',
  },
};
