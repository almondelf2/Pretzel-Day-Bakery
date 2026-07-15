const en = {
  nav: {
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    order: 'Order',
    findUs: 'Find Us',
    brand: 'Pretzel Day Bakery',
  },
  home: {
    hero: {
      badge: 'Award-Winning Pretzels',
      title: 'Go Ahead,\nBake My Day.',
      subtitle:
        'Every pretzel hand-twisted, lye-dipped, and baked to perfection. Sweet, savory, or classic — there\'s a pretzel for every mood.',
      viewMenu: 'View Menu',
      placeOrder: 'Place an Order',
      tagline: 'Every day is pretzel day since 2005',
    },
    stats: {
      hours: '7am – 7pm',
      freshDaily: 'Fresh Daily',
      customers: '10,000+',
      happyCustomers: 'Happy Customers',
      years: '15 Years',
      excellence: 'Of Excellence',
    },
    featured: {
      title: 'Customer Favorites',
      subtitle: "The pretzels our neighbors can't get enough of",
      browseMenu: 'Browse Full Menu',
      noItems: 'No featured items available',
      badge: 'Featured',
    },
    categories: {
      title: 'What We Bake',
      subtitle: '{{total}} items across {{count}} categories',
      itemCount_one: '{{count}} item',
      itemCount_other: '{{count}} items',
    },
    cta: {
      title: 'Planning an Event?',
      subtitle:
        'From office parties to grand celebrations, we craft custom pretzel spreads and catering that make every moment unforgettable.',
      button: 'Schedule Your Order',
    },
  },
  about: {
    hero: {
      title: 'Our Story',
      subtitle:
        'A neighborhood pretzel bakery built on tradition, a secret lye-dip recipe, and the firm belief that every day should be Pretzel Day.',
    },
    story: {
      title: 'Every Day is Pretzel Day',
      p1: "Pretzel Day Bakery was born on a single, magical afternoon in 2005 when William Buttlicker walked into a regional baking competition with a hand-twisted soft pretzel and walked out with a trophy and a calling.",
      p2: "We open before sunrise, shaping and dipping each pretzel by hand. By the time the doors open, the salt is crusted just right, the dough is chewy in the center, and the whole block smells incredible.",
      p3: "What started as a one-man operation now has a small but legendary crew. Stanley keeps the rhythm. Pam keeps it beautiful. William keeps reminding everyone that his name is pronounced exactly how it looks.",
      p4: "We don't cut corners. We don't use frozen dough. We don't let a single pretzel leave without meeting our standards. Because every customer deserves their own Pretzel Day.",
      imgAlt: 'Inside Pretzel Day Bakery',
    },
    values: {
      title: 'What We Believe',
      subtitle: 'The values that shape every pretzel we twist',
      handcrafted: {
        title: 'Handcrafted',
        desc: 'Every pretzel is hand-twisted, never machine-made. The shape matters as much as the taste.',
      },
      community: {
        title: 'Community',
        desc: "You're not a customer — you're a neighbor. We remember your order and ask about your day.",
      },
      quality: {
        title: 'Quality',
        desc: 'Local flour, real butter, food-grade lye. No shortcuts, no frozen dough, no compromises.',
      },
      time: {
        title: 'Time',
        desc: "Good pretzels can't be rushed. We give our dough the hours it needs to develop flavor and chew.",
      },
    },
    team: {
      title: 'Meet the Bakers',
      subtitle: 'The people behind your pretzel. Portraits by Pam.',
      members: [
        {
          name: 'William Buttlicker',
          role: 'Head Baker & Founder',
          bio: 'Founded Pretzel Day Bakery with a family recipe and an iron will. Insists every customer is family — especially the ones with unusual last names.',
        },
        {
          name: 'Stanley "The Manly" Hudson',
          role: 'Sweet Baker',
          bio: 'Quiet. Efficient. Responsible for every sweet pretzel on the menu. Crossword puzzles are a separate matter.',
        },
        {
          name: 'Pamela "Pamcake" Beesly',
          role: 'Savory Baker',
          bio: 'Runs the savory side with precision and a light hand. Also responsible for all in-store watercolor signage.',
        },
        {
          name: 'Kevin "Chumbo" Malone',
          role: 'Baker',
          bio: 'Kevin handles the pretzel dogs. He also handles a lot of the tasting. We\'ve stopped questioning it.',
        },
      ],
    },
    visit: {
      title: 'Visit Us Soon',
      subtitle: "We're on Baker Street, just past the park. Come for the pretzel, stay for the warmth.",
      address: '123 Baker Street',
      weekdays: 'Monday – Saturday: 7am – 7pm',
      sunday: 'Sunday: 8am – 5pm',
    },
  },
  menu: {
    hero: {
      title: 'Our Menu',
      subtitle: 'Every pretzel hand-twisted and baked fresh daily',
    },
    filter: {
      all: 'All Items',
    },
    items: {
      showing_one: 'Showing {{count}} item',
      showing_other: 'Showing {{count}} items',
      inCategory: 'in {{name}}',
      unavailable: 'Currently Unavailable',
      noItems: 'No items found in this category',
      viewAll: 'View All Items',
      featured: 'Featured',
      noImage: 'No image',
    },
  },
  itemDetail: {
    back: 'Back to Menu',
    featuredItem: 'Featured Item',
    unavailableMsg: 'This item is currently unavailable',
    basedOn_one: 'Based on {{count}} review',
    basedOn_other: 'Based on {{count}} reviews',
    review: {
      title: 'Leave a Review',
      name: 'Your Name',
      namePlaceholder: 'Enter your name',
      rating: 'Your Rating',
      stars_one: '{{count}} star',
      stars_other: '{{count}} stars',
      comment: 'Comment (optional)',
      commentPlaceholder: 'Share your thoughts...',
      submit: 'Submit Review',
      submitting: 'Submitting...',
    },
    reviewList: {
      title: 'Customer Reviews',
      noReviews: 'No reviews yet. Be the first to review!',
    },
    toast: {
      missingTitle: 'Missing information',
      missingDesc: 'Please enter your name',
      successTitle: 'Thank you!',
      successDesc: 'Your rating has been submitted',
      errorTitle: 'Error',
      errorDesc: 'Failed to submit rating',
    },
    invalidItem: 'Invalid menu item',
    itemNotFound: 'Item not found',
    noImageAvailable: 'No image available',
  },
  order: {
    hero: {
      title: 'Schedule Your Order',
      subtitle: 'Perfect for celebrations, office events, or stocking up on pretzels',
    },
    type: {
      title: 'Order Type',
      bulk: { title: 'Bulk Order', desc: 'Large quantity of specific items' },
      catering: { title: 'Catering', desc: 'Event or party service' },
    },
    contact: {
      title: 'Contact Information',
      name: 'Full Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone',
      phonePlaceholder: '(555) 123-4567',
    },
    event: {
      title: 'Event Details',
      date: 'Event Date',
      location: 'Event Location',
      locationPlaceholder: 'Address or venue name',
      guests: 'Guest Count',
      guestsPlaceholder: 'Number of guests',
      notes: 'Special Requests',
      notesPlaceholder: 'Dietary restrictions, delivery instructions, etc.',
    },
    items: {
      title: 'Select Items',
      choosePlaceholder: 'Choose an item',
      add: 'Add',
      each: 'each',
      specialInstructions: 'Special instructions for this item...',
    },
    summary: {
      title: 'Order Summary',
      type: 'Order Type',
      items: 'Items',
      totalQty: 'Total Quantity',
      estimated: 'Estimated Total',
      note: 'Final price confirmed upon order review',
      submit: 'Submit Order',
      submitting: 'Submitting...',
      contact: "We'll contact you within 24 hours to confirm details and finalize your order.",
    },
    toast: {
      noItemsTitle: 'No items selected',
      noItemsDesc: 'Please add at least one item to your order',
      successTitle: 'Order Submitted!',
      successDesc: "We'll be in touch shortly to confirm your order.",
      errorTitle: 'Error',
      errorDesc: 'Failed to submit order',
    },
    typeLabel: {
      bulk: 'Bulk',
      catering: 'Catering',
    },
  },
  qty: {
    addToOrder: 'Add to Order',
    unavailable: 'Currently unavailable',
  },
  footer: {
    tagline:
      'Hand-twisted soft pretzels — sweet, savory, and classic — baked fresh every morning. Because every day should be Pretzel Day.',
    quickLinks: 'Quick Links',
    about: 'About Us',
    placeOrder: 'Place Order',
    contact: 'Contact',
    hours: 'Hours',
    address: '123 Baker Street',
    weekdays: 'Monday – Saturday: 7am – 7pm',
    sunday: 'Sunday: 8am – 5pm',
    copyright: '© {{year}} Pretzel Day Bakery. All rights reserved.',
  },
  findUs: {
    badge: 'Scranton Locations',
    hero: {
      title: 'Find Us',
      subtitle: 'Started in a cart, now three locations across Scranton — always a fresh pretzel nearby.',
    },
    selected: 'Viewing',
    getDirections: 'Get Directions',
    hours: {
      weekdays: 'Mon – Fri',
      satThu: '7am – 9pm',
      friday: 'Sat – Sun',
      friHours: '8am – 6pm',
    },
    branches: {
      'scranton-business-park': {
        name: 'Scranton Business Park',
        neighborhood: 'Slough Avenue',
        address: '1725 Slough Ave, Suite 200, Scranton Business Park',
      },
      'steamtown-mall': {
        name: 'Steamtown Mall',
        neighborhood: 'Downtown Scranton',
        address: 'Steamtown Mall, Scranton, PA 18503',
      },
      alfredos: {
        name: "Alfredo's Pizza Cafe",
        neighborhood: 'Scranton',
        address: "Alfredo's Pizza Cafe, Scranton, PA",
      },
    },
  },
  lang: {
    switchLabel: 'Language',
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
  },
};

export default en;
