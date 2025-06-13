# Kepixel React Native SDK Documentation

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Setup](#setup)
- [Basic Usage](#basic-usage)
- [Configuration](#configuration)
- [Tracking Functions](#tracking-functions)
  - [Basic Tracking](#basic-tracking)
  - [E-commerce Tracking](#e-commerce-tracking)
  - [User Authentication Tracking](#user-authentication-tracking)
  - [App-specific Tracking](#app-specific-tracking)
  - [Goal Tracking](#goal-tracking)
  - [Advanced E-commerce Tracking](#advanced-e-commerce-tracking)
- [User Data](#user-data)
- [Custom Data](#custom-data)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)

## Introduction

The Kepixel React Native SDK is a powerful tracking library designed to help you collect and analyze user behavior data in your React Native applications. It provides a comprehensive set of tracking functions for various user interactions, including e-commerce transactions, screen views, user authentication events, and more.

## Installation

To install the Kepixel React Native SDK, run the following command in your project directory:

```bash
npm install react-native-kepixel
# or
yarn add react-native-kepixel
```

## Setup

To use the Kepixel React Native SDK in your application, you need to set up the `KepixelProvider` at the root of your component tree and initialize the `KepixelTracker` instance.

```jsx
import React from 'react';
import { KepixelProvider, KepixelTracker } from 'react-native-kepixel';

// Initialize the tracker with your app ID
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  log: __DEV__, // Enable logging in development mode
});

const App = () => {
  return (
    <KepixelProvider instance={tracker}>
      {/* Your app components */}
    </KepixelProvider>
  );
};

export default App;
```

## Basic Usage

Once you've set up the `KepixelProvider`, you can use the `useKepixel` hook in any component to access the tracking functions.

```jsx
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const HomeScreen = () => {
  const kepixel = useKepixel();

  useEffect(() => {
    // Track screen view when component mounts
    kepixel.trackScreenView({ name: 'Home' });
  }, []);

  const handleButtonPress = () => {
    // Track a custom action
    kepixel.trackAction({
      name: 'Button / Press',
      user_data: { id: 'user123' }
    });
  };

  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <Button title="Press Me" onPress={handleButtonPress} />
    </View>
  );
};

export default HomeScreen;
```

## Configuration

### Setting the Application ID

The application ID is required when initializing the `KepixelTracker` instance:

```jsx
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
});
```

### Setting User ID

You can set the user ID to identify logged-in users:

```jsx
// During initialization
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  userId: 'user@example.com',
});

// Or later using the setUserId method
tracker.setUserId('user@example.com');

// Or using the hook
const kepixel = useKepixel();
kepixel.setUserId('user@example.com');
```

### Enabling Logging

You can enable logging to see tracking events in the console during development:

```jsx
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  log: true, // or __DEV__ to only enable in development
});
```

## Tracking Functions

The Kepixel React Native SDK provides a wide range of tracking functions for different types of user interactions.

### Basic Tracking

#### trackAppStart

Tracks the application start event.

```jsx
kepixel.trackAppStart({
  user_data: { id: 'user123' }
});
```

#### trackScreenView

Tracks when a user views a screen.

```jsx
kepixel.trackScreenView({
  name: 'Home',
  user_data: { id: 'user123' }
});
```

#### trackAction

Tracks a custom action.

```jsx
kepixel.trackAction({
  name: 'Button / Press',
  user_data: { id: 'user123' }
});
```

#### trackEvent

Tracks a custom event with category, action, name, and value.

```jsx
kepixel.trackEvent({
  category: 'Menu',
  action: 'Click',
  name: 'Navigation',
  value: 1,
  user_data: { id: 'user123' },
  custom_data: { source: 'sidebar' }
});
```

#### trackLink

Tracks clicks on outgoing links.

```jsx
kepixel.trackLink({
  link: 'https://example.com',
  user_data: { id: 'user123' }
});
```

#### trackDownload

Tracks file downloads.

```jsx
kepixel.trackDownload({
  download: 'https://example.com/files/document.pdf',
  user_data: { id: 'user123' }
});
```

### E-commerce Tracking

#### trackPurchase

Records a purchase event with order ID, currency, value, items, description, user data, and custom data.

```jsx
kepixel.trackPurchase({
  order_id: 'ORDER123',
  currency: 'USD',
  value: 69.97,
  items: [
    {
      id: '123',
      name: 'Test Product',
      price: 19.99,
      quantity: 2
    },
    {
      id: '456',
      name: 'Another Product',
      price: 29.99,
      quantity: 1
    }
  ],
  description: 'Example purchase',
  user_data: { id: 'user123' },
  custom_data: { source: 'checkout_page' }
});
```

#### trackAddToCart

Records an add to cart event with currency, value, items, description, user data, and custom data.

```jsx
kepixel.trackAddToCart({
  currency: 'USD',
  value: 49.98,
  items: [
    {
      id: '123',
      name: 'Test Product',
      price: 19.99,
      quantity: 2
    },
    {
      id: '456',
      name: 'Another Product',
      price: 29.99,
      quantity: 1
    }
  ],
  description: 'Example add to cart',
  user_data: { id: 'user123' },
  custom_data: { source: 'product_page' }
});
```

#### trackViewContent

Records a view content event with content ID, name, currency, type, value, user data, and custom data.

```jsx
kepixel.trackViewContent({
  id: '123',
  name: 'Test Product',
  currency: 'USD',
  type: 'product',
  value: 19.99,
  user_data: { id: 'user123' },
  custom_data: { source: 'product_list' }
});
```

#### trackInitiateCheckout

Records an initiate checkout event with value, currency, items, user data, and custom data.

```jsx
kepixel.trackInitiateCheckout({
  value: 69.97,
  currency: 'USD',
  items: [
    {
      id: '123',
      name: 'Test Product',
      price: 19.99,
      quantity: 2
    },
    {
      id: '456',
      name: 'Another Product',
      price: 29.99,
      quantity: 1
    }
  ],
  user_data: { id: 'user123' },
  custom_data: { source: 'cart_page' }
});
```

#### trackAddPaymentInfo

Records an add payment info event with value, currency, items, user data, and custom data.

```jsx
kepixel.trackAddPaymentInfo({
  value: 69.97,
  currency: 'USD',
  items: [
    {
      id: '123',
      name: 'Test Product',
      price: 19.99,
      quantity: 2
    },
    {
      id: '456',
      name: 'Another Product',
      price: 29.99,
      quantity: 1
    }
  ],
  user_data: { id: 'user123' },
  custom_data: { source: 'checkout_page' }
});
```

#### trackAddToWishlist

Records an add to wishlist event with items, user data, and custom data.

```jsx
kepixel.trackAddToWishlist({
  items: [
    {
      id: '123',
      name: 'Test Product',
      price: 19.99,
      quantity: 1
    }
  ],
  user_data: { id: 'user123' },
  custom_data: { source: 'product_page' }
});
```

#### trackSearch

Records a search event with search string, user data, and custom data.

```jsx
kepixel.trackSearch({
  search_string: 'example search query',
  user_data: { id: 'user123' },
  custom_data: { source: 'search_page' }
});
```

#### trackPageView

Records a page view event with page ID, name, category, type, user data, and custom data.

```jsx
kepixel.trackPageView({
  id: 'page123',
  name: 'Example Page',
  category: 'content',
  type: 'article',
  user_data: { id: 'user123' },
  custom_data: { source: 'navigation' }
});
```

#### trackListView

Records a list view event with list ID, name, category, type, user data, and custom data.

```jsx
kepixel.trackListView({
  id: 'list123',
  name: 'Featured Products',
  category: 'products',
  type: 'featured',
  user_data: { id: 'user123' },
  custom_data: { source: 'home_page' }
});
```

### User Authentication Tracking

#### trackSignUp

Records a sign up event with user data and custom data.

```jsx
kepixel.trackSignUp({
  user_data: {
    id: 'user123',
    email: 'user@example.com',
    name: 'John Doe'
  },
  custom_data: { source: 'signup_page' }
});
```

#### trackLogin

Records a login event with user data and custom data.

```jsx
kepixel.trackLogin({
  user_data: {
    id: 'user123',
    email: 'user@example.com',
    name: 'John Doe'
  },
  custom_data: { source: 'login_page' }
});
```

#### trackCompleteRegistration

Records a complete registration event with parameters, user data, and custom data.

```jsx
kepixel.trackCompleteRegistration({
  method: 'email',
  user_data: {
    id: 'user123',
    email: 'user@example.com',
    name: 'John Doe'
  },
  custom_data: { source: 'registration_page' }
});
```

### App-specific Tracking

#### trackAppOpen

Records an app open event with user data and custom data.

```jsx
kepixel.trackAppOpen({
  user_data: { id: 'user123' },
  custom_data: { source: 'notification' }
});
```

#### trackAppInstall

Records an app install event with user data and custom data.

```jsx
kepixel.trackAppInstall({
  user_data: { id: 'user123' },
  custom_data: { source: 'app_store' }
});
```

#### trackContact

Records a contact event with user data and custom data.

```jsx
kepixel.trackContact({
  user_data: {
    id: 'user123',
    email: 'user@example.com',
    name: 'John Doe'
  },
  custom_data: { source: 'contact_page' }
});
```

#### trackCustomEvent

Records a custom event with parameters, user data, and custom data.

```jsx
kepixel.trackCustomEvent({
  event_name: 'example_event',
  category: 'examples',
  user_data: { id: 'user123' },
  custom_data: { source: 'custom_page' }
});
```

### Goal Tracking

#### trackGoal

Manually triggers a goal conversion.

```jsx
// Without revenue
kepixel.trackGoal({
  goalId: 1,
  user_data: { id: 'user123' },
  custom_data: { source: 'goal_page' }
});

// With revenue
kepixel.trackGoal({
  goalId: 1,
  revenue: 10.50,
  user_data: { id: 'user123' },
  custom_data: { source: 'goal_page' }
});
```

### Advanced E-commerce Tracking

#### setEcommerceView

Sets the current view as a product or category page view. Must be called before trackPageView.

```jsx
// Track a product view
kepixel.setEcommerceView(
  "SKU123",                  // Product SKU
  "Awesome Product",         // Product name
  ["Category1", "Category2"], // Product category or array of up to 5 categories
  29.99                      // Product price
);
kepixel.trackPageView();

// Track a category view
kepixel.setEcommerceView(
  false,                     // Product SKU - false for category view
  false,                     // Product name - false for category view
  "Electronics"              // Product category
);
kepixel.trackPageView();
```

#### addEcommerceItem

Adds an item to the internal ecommerce cart for tracking. Must be called before trackEcommerceCartUpdate or trackEcommerceOrder.

```jsx
kepixel.addEcommerceItem(
  "SKU123",                  // Product SKU
  "Awesome Product",         // Product name
  ["Category1", "Category2"], // Product category or array of up to 5 categories
  29.99,                     // Product price
  2                          // Product quantity
);
```

#### clearEcommerceCart

Removes all items from the internal ecommerce cart.

```jsx
kepixel.clearEcommerceCart();
```

#### trackEcommerceCartUpdate

Tracks a shopping cart update. Call this after adding items with addEcommerceItem.

```jsx
// Add items to cart
kepixel.clearEcommerceCart();
kepixel.addEcommerceItem("SKU123", "Awesome Product", ["Category1", "Category2"], 29.99, 2);
kepixel.addEcommerceItem("SKU456", "Another Product", "Category3", 19.99, 1);

// Calculate cart total
const cartTotal = (29.99 * 2) + (19.99 * 1);

// Track the cart update
kepixel.trackEcommerceCartUpdate(cartTotal);
```

#### trackEcommerceOrder

Tracks an e-commerce order. Call this after adding items with addEcommerceItem.

```jsx
// Add items to order
kepixel.clearEcommerceCart();
kepixel.addEcommerceItem("SKU123", "Awesome Product", ["Category1", "Category2"], 29.99, 2);
kepixel.addEcommerceItem("SKU456", "Another Product", "Category3", 19.99, 1);

// Calculate values
const subtotal = (29.99 * 2) + (19.99 * 1);
const tax = subtotal * 0.08; // 8% tax
const shipping = 5.99;
const discount = 10.00;
const grandTotal = subtotal + tax + shipping - discount;

// Track the order
kepixel.trackEcommerceOrder(
  "ORDER12345",              // Order ID
  grandTotal,                // Grand total
  subtotal,                  // Subtotal
  tax,                       // Tax
  shipping,                  // Shipping
  discount                   // Discount
);
```

## User Data

The `user_data` parameter is an object that should contain at least one of the following properties:

- `email`: User's email address
- `phone`: User's phone number
- `name`: User's name
- `id`: User's ID

Example:

```jsx
const user_data = {
  email: "user@example.com",
  phone: "1234567890",
  name: "John Doe",
  id: "user123"
};
```

## Custom Data

The `custom_data` parameter is an optional object that can contain any custom properties you want to track.

Example:

```jsx
const custom_data = {
  source: "homepage",
  session_id: "abc123",
  referrer: "google.com"
};
```

## Items Format

For tracking functions that accept an `items` parameter, each item should be an object with the following properties:

- `id`: Item ID (required)
- `name`: Item name (required)
- `price`: Item price (required)
- `quantity`: Item quantity (required)

Example:

```jsx
const items = [
  {
    id: "123",
    name: "Product A",
    price: 19.99,
    quantity: 2
  },
  {
    id: "456",
    name: "Product B",
    price: 29.99,
    quantity: 1
  }
];
```

## Error Handling

The Kepixel React Native SDK performs validation on the parameters passed to tracking functions and throws errors when required parameters are missing. It's a good practice to wrap tracking calls in try-catch blocks to handle any potential errors.

```jsx
try {
  kepixel.trackScreenView({ name: 'Home' });
} catch (error) {
  console.error('Tracking error:', error);
}
```

## Advanced Usage

### Heart Beat Timer

Enable the heart beat timer to accurately measure the time spent on each screen:

```jsx
// Enable with default settings (15 seconds minimum active time)
kepixel.enableHeartBeatTimer();

// Enable with custom active time (30 seconds)
kepixel.enableHeartBeatTimer(30);

// Disable the heart beat timer
kepixel.disableHeartBeatTimer();
```

### Link Tracking

Enable automatic link tracking:

```jsx
// Enable link tracking
kepixel.enableLinkTracking();

// Enable link tracking with content tracking
kepixel.enableLinkTracking(true);

// Disable link tracking
kepixel.disableLinkTracking();
```

## Troubleshooting

### Common Issues

1. **Tracking events not being sent**: Make sure you have initialized the KepixelTracker with a valid appId and that your device has internet connectivity.

2. **Missing user data**: If user data is not being tracked, ensure you're setting the userId either during initialization or using the setUserId method.

3. **React hooks errors**: If you're getting errors related to React hooks, make sure you're using the useKepixel hook within a component that is a child of the KepixelProvider.

### Debugging

Enable logging during initialization to see tracking events in the console:

```jsx
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  log: true,
});
```

## API Reference

For a complete reference of all available methods and their parameters, please refer to the [API Reference](https://docs.kepixel.com/api-reference).
