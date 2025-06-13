import KepixelTracker from './src/KepixelTracker.js';

// Create an instance of KepixelTracker
let instance = new KepixelTracker({
    appId: "appId", // get app id from platform register
    log: true
});

// Example 1: Track App Open Event
instance.trackAppOpen({
    user_data: {
        email: 'user@example.com',
        phone: '1234567890',
        app_version: '1.0.0',
        device_model: 'iPhone 13'
    },
    custom_data: {
        session_id: '12345',
        open_count: 5
    }
});

// Example 2: Track View Content Event
instance.trackViewContent({
    id: 'product-123',
    name: 'Blue T-shirt',
    currency: 'USD',
    type: 'product',
    value: 29.99,
    user_data: {
        email: 'user@example.com',
        phone: '1234567890'
    },
    custom_data: {
        category: 'Clothing',
        color: 'Blue',
        size: 'M'
    }
});

// Example 3: Track Add To Cart Event
instance.trackAddToCart({
    value: 29.99,
    currency: 'USD',
    items: [
        {
            id: 'product-123',
            name: 'Blue T-shirt',
            price: 29.99,
            quantity: 1
        }
    ],
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        source: 'product_page'
    }
});

// Example 4: Track Purchase Event
instance.trackPurchase({
    value: 59.98,
    currency: 'USD',
    items: [
        {
            id: 'product-123',
            name: 'Blue T-shirt',
            price: 29.99,
            quantity: 1
        },
        {
            id: 'product-456',
            name: 'Black Jeans',
            price: 29.99,
            quantity: 1
        }
    ],
    order_id: 'order-789',
    description: 'Online purchase',
    user_data: {
        email: 'user@example.com',
        phone: '1234567890'
    },
    custom_data: {
        payment_method: 'credit_card',
        shipping_method: 'standard'
    }
});

// Example 5: Track Download Event
instance.trackDownload({
    download: 'https://example.com/files/document.pdf',
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        file_type: 'pdf',
        file_size: '2.5MB',
        file_name: 'document.pdf'
    }
});

// Example 6: Track Add Payment Info Event
instance.trackAddPaymentInfo({
    value: 59.98,
    currency: 'USD',
    items: [
        {
            id: 'product-123',
            name: 'Blue T-shirt',
            price: 29.99,
            quantity: 1
        },
        {
            id: 'product-456',
            name: 'Black Jeans',
            price: 29.99,
            quantity: 1
        }
    ],
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        payment_method: 'credit_card',
        card_type: 'visa'
    }
});

// Example 7: Track Add To Wishlist Event
instance.trackAddToWishlist({
    items: [
        {
            id: 'product-123',
            name: 'Blue T-shirt',
            price: 29.99,
            quantity: 1
        }
    ],
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        source: 'product_page'
    }
});

// Example 8: Track App Install Event
instance.trackAppInstall({
    user_data: {
        device_model: 'iPhone 13',
        os_version: 'iOS 15.0'
    },
    custom_data: {
        install_source: 'App Store',
        referrer: 'direct'
    }
});

// Example 9: Track Complete Registration Event
instance.trackCompleteRegistration({
    user_data: {
        email: 'user@example.com',
        name: 'John Doe'
    },
    custom_data: {
        registration_method: 'email',
        user_type: 'customer'
    }
});

// Example 10: Track Contact Event
instance.trackContact({
    user_data: {
        email: 'user@example.com',
        phone: '1234567890'
    },
    custom_data: {
        contact_method: 'email',
        contact_reason: 'support'
    }
});

// Example 11: Track Custom Event
instance.trackCustomEvent({
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        event_name: 'button_click',
        button_id: 'submit_button',
        page: 'checkout'
    }
});

// Example 12: Track Initiate Checkout Event
instance.trackInitiateCheckout({
    value: 59.98,
    currency: 'USD',
    items: [
        {
            id: 'product-123',
            name: 'Blue T-shirt',
            price: 29.99,
            quantity: 1
        },
        {
            id: 'product-456',
            name: 'Black Jeans',
            price: 29.99,
            quantity: 1
        }
    ],
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        cart_id: 'cart-123',
        checkout_step: 1
    }
});

// Example 13: Track List View Event
instance.trackListView({
    id: 'category-123',
    name: 'T-shirts',
    category: 'Clothing',
    type: 'product_list',
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        list_size: 20,
        page: 1,
        sort_by: 'popularity'
    }
});

// Example 14: Track Login Event
instance.trackLogin({
    user_data: {
        email: 'user@example.com',
        id: 'user-123'
    },
    custom_data: {
        login_method: 'email',
        login_status: 'success'
    }
});

// Example 15: Track Page View Event
instance.trackPageView({
    id: 'page-123',
    name: 'Home Page',
    category: 'Main',
    type: 'page',
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        page_url: 'https://example.com/home',
        referrer: 'https://google.com'
    }
});

// Example 16: Track Search Event
instance.trackSearch({
    search_string: 'blue t-shirt',
    user_data: {
        email: 'user@example.com'
    },
    custom_data: {
        search_results_count: 15,
        search_category: 'products'
    }
});

// Example 17: Track Sign Up Event
instance.trackSignUp({
    user_data: {
        email: 'user@example.com',
        name: 'John Doe'
    },
    custom_data: {
        signup_method: 'email',
        newsletter_opt_in: true
    }
});
