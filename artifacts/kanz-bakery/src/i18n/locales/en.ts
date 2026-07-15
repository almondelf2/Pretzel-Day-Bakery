const en = {
  nav: {
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    order: 'Order',
    brand: 'Kanz Bakery',
  },
  home: {
    hero: {
      badge: 'Award-Winning Bakery',
      title: 'Baked Fresh,\nServed Warm',
      subtitle:
        'Every loaf, every pastry, every cake is handcrafted with care. Start your morning with the smell of fresh bread and the warmth of home.',
      viewMenu: 'View Menu',
      placeOrder: 'Place an Order',
      tagline: 'Baked with love since 2009',
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
      subtitle: "The treats our neighbors can't get enough of",
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
        'From intimate gatherings to grand celebrations, we craft custom cakes and catering that make every moment memorable.',
      button: 'Schedule Your Order',
    },
  },
  about: {
    hero: {
      title: 'Our Story',
      subtitle:
        'A neighborhood bakery built on tradition, warmth, and the simple joy of breaking bread together.',
    },
    story: {
      title: 'Fifteen Years of Fresh Starts',
      p1: "Kanz Bakery opened its doors in 2009 with a simple promise: to bake bread the way your grandmother did — slowly, carefully, with hands that care.",
      p2: "We wake before sunrise to shape dough that's been rising overnight. By the time you walk through our doors, the croissants are still warm, the sourdough is crackling, and the air smells like butter and possibility.",
      p3: "What started as a two-person operation has grown into a beloved neighborhood fixture. But we've kept what matters: every loaf is still shaped by hand, every cake is still custom, and every customer is still greeted by name.",
      p4: "We don't use shortcuts. We don't rush fermentation. We don't compromise on ingredients. Because good bread takes time, and you're worth it.",
      imgAlt: 'Inside Kanz Bakery',
    },
    values: {
      title: 'What We Believe',
      subtitle: 'The values that shape every loaf we bake',
      handcrafted: {
        title: 'Handcrafted',
        desc: 'Every pastry is shaped by skilled hands, not machines. We believe in the human touch.',
      },
      community: {
        title: 'Community',
        desc: "You're not a customer — you're a neighbor. We remember your order and ask about your day.",
      },
      quality: {
        title: 'Quality',
        desc: 'Local flour, real butter, organic eggs. No preservatives, no shortcuts, no compromises.',
      },
      time: {
        title: 'Time',
        desc: "Good bread can't be rushed. We give dough the hours it needs to develop flavor and texture.",
      },
    },
    team: {
      title: 'Meet the Bakers',
      subtitle: 'The people behind your morning pastry',
      members: [
        {
          name: 'Sarah Martinez',
          role: 'Head Baker & Founder',
          bio: 'Started Kanz with a sourdough starter and a dream. Still wakes at 4am every day.',
        },
        {
          name: 'James Chen',
          role: 'Pastry Chef',
          bio: 'Trained in Paris, returned home to make croissants that rival the Seine.',
        },
        {
          name: 'Maya Thompson',
          role: 'Cake Designer',
          bio: 'Turns celebrations into edible art. Every cake tells a story.',
        },
      ],
    },
    visit: {
      title: 'Visit Us Soon',
      subtitle: "We're on Baker Street, just past the park. Come for the bread, stay for the warmth.",
      address: '123 Baker Street',
      weekdays: 'Monday – Saturday: 7am – 7pm',
      sunday: 'Sunday: 8am – 5pm',
    },
  },
  menu: {
    hero: {
      title: 'Our Menu',
      subtitle: 'Every item baked fresh daily with local ingredients',
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
      subtitle: 'Perfect for celebrations, office events, or stocking up on favorites',
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
      'Handcrafted breads, pastries, and celebration cakes baked fresh daily. Every bite tells a story of tradition and warmth.',
    quickLinks: 'Quick Links',
    about: 'About Us',
    placeOrder: 'Place Order',
    contact: 'Contact',
    address: '123 Baker Street',
    weekdays: 'Monday – Saturday: 7am – 7pm',
    sunday: 'Sunday: 8am – 5pm',
    copyright: '© {{year}} Kanz Bakery. All rights reserved.',
  },
  lang: {
    switchLabel: 'Language',
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
  },
};

export default en;
