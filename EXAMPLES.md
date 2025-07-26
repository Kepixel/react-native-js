# Kepixel React-Native-JS Event Examples

This document provides examples for tracking different event types using the Kepixel React-Native-JS library.

## Table of Contents
- [ViewContent Event](#viewcontent-event)
- [AddToCart Event](#addtocart-event)
- [Purchase Event](#purchase-event)
- [Download Event](#download-event)
- [AddPaymentInfo Event](#addpaymentinfo-event)
- [AddToWishlist Event](#addtowishlist-event)
- [AppInstall Event](#appinstall-event)
- [AppOpen Event](#appopen-event)
- [CompleteRegistration Event](#completeregistration-event)
- [Contact Event](#contact-event)
- [CustomEvent Event](#customevent-event)
- [InitiateCheckout Event](#initiatecheckout-event)
- [ListView Event](#listview-event)
- [Login Event](#login-event)
- [PageView Event](#pageview-event)
- [Search Event](#search-event)
- [SignUp Event](#signup-event)

## ViewContent Event
The ViewContent event is used to track when users view specific content.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackViewContent } = useKepixel();

// Example: Track when a user views a product
trackViewContent({
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
```

## AddToCart Event
The AddToCart event is used to track when users add items to their cart.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackAddToCart } = useKepixel();

// Example: Track when a user adds a product to cart
trackAddToCart({
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
```

## Purchase Event
The Purchase event is used to track when users complete a purchase.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackPurchase } = useKepixel();

// Example: Track when a user completes a purchase
trackPurchase({
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
```

## Download Event
The Download event is used to track when users download files.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackDownload } = useKepixel();

// Example: Track when a user downloads a file
trackDownload({
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
```

## AddPaymentInfo Event
The AddPaymentInfo event is used to track when users add payment information.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackAddPaymentInfo } = useKepixel();

// Example: Track when a user adds payment information
trackAddPaymentInfo({
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
```

## AddToWishlist Event
The AddToWishlist event is used to track when users add items to their wishlist.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackAddToWishlist } = useKepixel();

// Example: Track when a user adds a product to wishlist
trackAddToWishlist({
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
```

## AppInstall Event
The AppInstall event is used to track when users install the app.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackAppInstall } = useKepixel();

// Example: Track when a user installs the app
trackAppInstall({
  user_data: {
    device_model: 'iPhone 13',
    os_version: 'iOS 15.0'
  },
  custom_data: {
    install_source: 'App Store',
    referrer: 'direct'
  }
});
```

## AppOpen Event
The AppOpen event is used to track when users open the app.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackAppOpen } = useKepixel();

// Example: Track when a user opens the app
trackAppOpen({
  user_data: {
    app_version: '1.0.0',
    device_model: 'iPhone 13'
  },
  custom_data: {
    session_id: '12345',
    open_count: 5
  }
});
```

## CompleteRegistration Event
The CompleteRegistration event is used to track when users complete a registration process.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackCompleteRegistration } = useKepixel();

// Example: Track when a user completes registration
trackCompleteRegistration({
  user_data: {
    email: 'user@example.com',
    name: 'John Doe'
  },
  custom_data: {
    registration_method: 'email',
    user_type: 'customer'
  }
});
```

## Contact Event
The Contact event is used to track when users make contact.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackContact } = useKepixel();

// Example: Track when a user makes contact
trackContact({
  user_data: {
    email: 'user@example.com',
    phone: '1234567890'
  },
  custom_data: {
    contact_method: 'email',
    contact_reason: 'support'
  }
});
```

## CustomEvent Event
The CustomEvent event is used to track custom events.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackCustomEvent } = useKepixel();

// Example: Track a custom event
trackCustomEvent({
  user_data: {
    email: 'user@example.com'
  },
  custom_data: {
    event_name: 'button_click',
    button_id: 'submit_button',
    page: 'checkout'
  }
});
```

## InitiateCheckout Event
The InitiateCheckout event is used to track when users begin the checkout process.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackInitiateCheckout } = useKepixel();

// Example: Track when a user initiates checkout
trackInitiateCheckout({
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
```

## ListView Event
The ListView event is used to track when users view a list of items.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackListView } = useKepixel();

// Example: Track when a user views a list of products
trackListView({
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
```

## Login Event
The Login event is used to track when users log in.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackLogin } = useKepixel();

// Example: Track when a user logs in
trackLogin({
  user_data: {
    email: 'user@example.com',
    id: 'user-123'
  },
  custom_data: {
    login_method: 'email',
    login_status: 'success'
  }
});
```

## PageView Event
The PageView event is used to track when users view a page.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackPageView } = useKepixel();

// Example: Track when a user views a page
trackPageView({
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
```

## Search Event
The Search event is used to track when users perform a search.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackSearch } = useKepixel();

// Example: Track when a user performs a search
trackSearch({
  search_string: 'blue t-shirt',
  user_data: {
    email: 'user@example.com'
  },
  custom_data: {
    search_results_count: 15,
    search_category: 'products'
  }
});
```

## SignUp Event
The SignUp event is used to track when users sign up for a service.

```javascript
import { useKepixel } from '@kepixel/react-native-sdk';

const { trackSignUp } = useKepixel();

// Example: Track when a user signs up
trackSignUp({
  user_data: {
    email: 'user@example.com',
    name: 'John Doe'
  },
  custom_data: {
    signup_method: 'email',
    newsletter_opt_in: true
  }
});
```