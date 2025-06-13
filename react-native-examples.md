# Kepixel React Native SDK Examples

This document provides practical examples of how to use the Kepixel React Native SDK in different scenarios.

## Table of Contents
- [Basic Setup](#basic-setup)
- [Screen Tracking](#screen-tracking)
- [User Action Tracking](#user-action-tracking)
- [E-commerce Tracking](#e-commerce-tracking)
- [User Authentication Tracking](#user-authentication-tracking)
- [Advanced E-commerce Tracking](#advanced-e-commerce-tracking)
- [Complete App Example](#complete-app-example)

## Basic Setup

### Setting up the Kepixel Provider

```jsx
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KepixelProvider, KepixelTracker } from 'react-native-kepixel';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';

const Stack = createStackNavigator();

// Initialize the tracker with your app ID
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  log: __DEV__, // Enable logging in development mode
});

const App = () => {
  return (
    <KepixelProvider instance={tracker}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </KepixelProvider>
  );
};

export default App;
```

## Screen Tracking

### Tracking Screen Views

```jsx
// screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const HomeScreen = ({ navigation }) => {
  const kepixel = useKepixel();

  useEffect(() => {
    // Track screen view when component mounts
    kepixel.trackScreenView({ 
      name: 'Home',
      user_data: { id: 'user123' }
    });
    
    // Enable heart beat timer to track time spent on screen
    kepixel.enableHeartBeatTimer();
    
    // Clean up when component unmounts
    return () => {
      kepixel.disableHeartBeatTimer();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our Store</Text>
      <Button 
        title="View Products" 
        onPress={() => navigation.navigate('Product')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
```

### Tracking Screen Views with Navigation Events

```jsx
// App.js (with navigation tracking)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KepixelProvider, KepixelTracker } from 'react-native-kepixel';
import { useKepixel } from 'react-native-kepixel';

// ... import screens

const Stack = createStackNavigator();

// Initialize the tracker
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  log: __DEV__,
});

// Navigation tracking component
const NavigationTracking = () => {
  const kepixel = useKepixel();
  
  const routeNameRef = React.useRef();
  
  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = state.routes[state.index].name;

    if (previousRouteName !== currentRouteName) {
      // Track screen view
      kepixel.trackScreenView({ 
        name: currentRouteName,
        user_data: { id: 'user123' }
      });
    }
    
    // Save the current route name for next comparison
    routeNameRef.current = currentRouteName;
  };
  
  return null;
};

const App = () => {
  return (
    <KepixelProvider instance={tracker}>
      <NavigationContainer
        onStateChange={onNavigationStateChange}
      >
        <NavigationTracking />
        <Stack.Navigator initialRouteName="Home">
          {/* ... Stack.Screen components */}
        </Stack.Navigator>
      </NavigationContainer>
    </KepixelProvider>
  );
};

export default App;
```

## User Action Tracking

### Tracking Button Presses

```jsx
// components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const ProductCard = ({ product, onPress }) => {
  const kepixel = useKepixel();

  const handlePress = () => {
    // Track the action
    kepixel.trackAction({
      name: 'Product / Click',
      user_data: { id: 'user123' },
    });
    
    // Call the original onPress handler
    onPress(product);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default ProductCard;
```

### Tracking Form Submissions

```jsx
// screens/ContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const ContactScreen = () => {
  const kepixel = useKepixel();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Validate form
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Track the contact event
    kepixel.trackContact({
      user_data: {
        id: 'user123',
        name: name,
        email: email,
      },
      custom_data: {
        message_length: message.length,
        source: 'contact_form',
      },
    });

    // Show success message
    Alert.alert('Success', 'Your message has been sent!');
    
    // Clear form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
});

export default ContactScreen;
```

## E-commerce Tracking

### Product View Tracking

```jsx
// screens/ProductScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const ProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const kepixel = useKepixel();

  useEffect(() => {
    // Track screen view
    kepixel.trackScreenView({ 
      name: `Product / ${product.name}`,
      user_data: { id: 'user123' }
    });
    
    // Track view content event
    kepixel.trackViewContent({
      id: product.id,
      name: product.name,
      currency: 'USD',
      type: 'product',
      value: product.price,
      user_data: { id: 'user123' },
      custom_data: { category: product.category }
    });
    
    // Track using advanced e-commerce tracking
    kepixel.setEcommerceView(
      product.id,
      product.name,
      product.category,
      product.price
    );
    kepixel.trackPageView({
      id: `product-${product.id}`,
      name: product.name,
      category: 'product',
      type: 'detail',
      user_data: { id: 'user123' }
    });
  }, [product]);

  const handleAddToCart = () => {
    // Track add to cart event
    kepixel.trackAddToCart({
      currency: 'USD',
      value: product.price,
      items: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ],
      description: `Added ${product.name} to cart`,
      user_data: { id: 'user123' },
      custom_data: { source: 'product_detail' }
    });
    
    // Navigate to cart
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default ProductScreen;
```

### Cart Tracking

```jsx
// screens/CartScreen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useKepixel } from 'react-native-kepixel';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation, route }) => {
  const kepixel = useKepixel();
  const { cartItems } = route.params;
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  useEffect(() => {
    // Track screen view
    kepixel.trackScreenView({ 
      name: 'Cart',
      user_data: { id: 'user123' }
    });
    
    // Track cart using advanced e-commerce tracking
    kepixel.clearEcommerceCart();
    
    // Add each item to the cart
    cartItems.forEach(item => {
      kepixel.addEcommerceItem(
        item.id,
        item.name,
        item.category,
        item.price,
        item.quantity
      );
    });
    
    // Track cart update
    kepixel.trackEcommerceCartUpdate(cartTotal);
  }, [cartItems, cartTotal]);

  const handleCheckout = () => {
    // Track initiate checkout event
    kepixel.trackInitiateCheckout({
      value: cartTotal,
      currency: 'USD',
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      user_data: { id: 'user123' },
      custom_data: { source: 'cart_screen' }
    });
    
    // Navigate to checkout
    navigation.navigate('Checkout', { cartItems, cartTotal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
          />
          
          <View style={styles.summary}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
          </View>
          
          <Button title="Proceed to Checkout" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
```

### Checkout and Purchase Tracking

```jsx
// screens/CheckoutScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const CheckoutScreen = ({ navigation, route }) => {
  const kepixel = useKepixel();
  const { cartItems, cartTotal } = route.params;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleAddPaymentInfo = () => {
    // Track add payment info event
    kepixel.trackAddPaymentInfo({
      value: cartTotal,
      currency: 'USD',
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      user_data: { 
        id: 'user123',
        email: email,
        name: name
      },
      custom_data: { 
        payment_method: paymentMethod,
        source: 'checkout_screen'
      }
    });
    
    // Show confirmation
    Alert.alert('Payment Info Added', 'Your payment information has been added.');
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!name || !email || !address || !paymentMethod) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Generate order ID
    const orderId = `ORDER-${Date.now()}`;
    
    // Calculate values
    const subtotal = cartTotal;
    const tax = subtotal * 0.08; // 8% tax
    const shipping = 5.99;
    const discount = 0;
    const grandTotal = subtotal + tax + shipping - discount;
    
    // Track purchase event
    kepixel.trackPurchase({
      order_id: orderId,
      currency: 'USD',
      value: grandTotal,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      description: `Order ${orderId}`,
      user_data: { 
        id: 'user123',
        email: email,
        name: name
      },
      custom_data: { 
        payment_method: paymentMethod,
        shipping_address: address,
        source: 'checkout_screen'
      }
    });
    
    // Track using advanced e-commerce tracking
    kepixel.clearEcommerceCart();
    
    // Add each item to the cart
    cartItems.forEach(item => {
      kepixel.addEcommerceItem(
        item.id,
        item.name,
        item.category,
        item.price,
        item.quantity
      );
    });
    
    // Track order
    kepixel.trackEcommerceOrder(
      orderId,
      grandTotal,
      subtotal,
      tax,
      shipping,
      discount
    );
    
    // Navigate to order confirmation
    navigation.navigate('OrderConfirmation', { 
      orderId, 
      cartItems, 
      subtotal,
      tax,
      shipping,
      discount,
      grandTotal
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Shipping Address"
        value={address}
        onChangeText={setAddress}
        multiline
        numberOfLines={2}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Payment Method"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      
      <View style={styles.summary}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
      </View>
      
      <Button title="Add Payment Info" onPress={handleAddPaymentInfo} />
      <View style={styles.buttonSpacer} />
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    height: 10,
  },
});

export default CheckoutScreen;
```

## User Authentication Tracking

### Login Tracking

```jsx
// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const LoginScreen = ({ navigation }) => {
  const kepixel = useKepixel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validate form
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simulate login API call
    // In a real app, you would call your authentication API here
    setTimeout(() => {
      // Set user ID in Kepixel
      kepixel.setUserId(email);
      
      // Track login event
      kepixel.trackLogin({
        user_data: {
          id: email,
          email: email,
        },
        custom_data: {
          login_method: 'email',
          source: 'login_screen'
        }
      });
      
      // Navigate to home screen
      navigation.navigate('Home');
    }, 1000);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.buttonSpacer} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonSpacer: {
    height: 10,
  },
});

export default LoginScreen;
```

### Sign Up Tracking

```jsx
// screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const SignUpScreen = ({ navigation }) => {
  const kepixel = useKepixel();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Validate form
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simulate sign up API call
    // In a real app, you would call your registration API here
    setTimeout(() => {
      // Track sign up event
      kepixel.trackSignUp({
        user_data: {
          id: email,
          email: email,
          name: name,
        },
        custom_data: {
          signup_method: 'email',
          source: 'signup_screen'
        }
      });
      
      // Navigate to registration completion screen
      navigation.navigate('CompleteRegistration', { email, name });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;
```

### Registration Completion Tracking

```jsx
// screens/CompleteRegistrationScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useKepixel } from 'react-native-kepixel';

const CompleteRegistrationScreen = ({ navigation, route }) => {
  const kepixel = useKepixel();
  const { email, name } = route.params;

  useEffect(() => {
    // Set user ID in Kepixel
    kepixel.setUserId(email);
    
    // Track complete registration event
    kepixel.trackCompleteRegistration({
      method: 'email',
      user_data: {
        id: email,
        email: email,
        name: name,
      },
      custom_data: {
        source: 'complete_registration_screen'
      }
    });
  }, []);

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Complete!</Text>
      <Text style={styles.message}>
        Thank you for registering, {name}. Your account has been created successfully.
      </Text>
      <Button title="Continue to Home" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default CompleteRegistrationScreen;
```

## Advanced E-commerce Tracking

### Complete E-commerce Flow

```jsx
// utils/ecommerceTracking.js
import { useKepixel } from 'react-native-kepixel';

// Helper function to track product view
export const trackProductView = (kepixel, product) => {
  // Track using standard event
  kepixel.trackViewContent({
    id: product.id,
    name: product.name,
    currency: 'USD',
    type: 'product',
    value: product.price,
    user_data: { id: 'user123' },
    custom_data: { category: product.category }
  });
  
  // Track using advanced e-commerce tracking
  kepixel.setEcommerceView(
    product.id,
    product.name,
    product.category,
    product.price
  );
  kepixel.trackPageView({
    id: `product-${product.id}`,
    name: product.name,
    category: 'product',
    type: 'detail',
    user_data: { id: 'user123' }
  });
};

// Helper function to track add to cart
export const trackAddToCart = (kepixel, product, quantity = 1) => {
  kepixel.trackAddToCart({
    currency: 'USD',
    value: product.price * quantity,
    items: [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      }
    ],
    description: `Added ${product.name} to cart`,
    user_data: { id: 'user123' },
    custom_data: { source: 'product_detail' }
  });
};

// Helper function to track cart update
export const trackCartUpdate = (kepixel, cartItems) => {
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );
  
  // Track using advanced e-commerce tracking
  kepixel.clearEcommerceCart();
  
  // Add each item to the cart
  cartItems.forEach(item => {
    kepixel.addEcommerceItem(
      item.id,
      item.name,
      item.category,
      item.price,
      item.quantity
    );
  });
  
  // Track cart update
  kepixel.trackEcommerceCartUpdate(cartTotal);
  
  return cartTotal;
};

// Helper function to track checkout
export const trackCheckout = (kepixel, cartItems, cartTotal) => {
  kepixel.trackInitiateCheckout({
    value: cartTotal,
    currency: 'USD',
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    user_data: { id: 'user123' },
    custom_data: { source: 'cart_screen' }
  });
};

// Helper function to track purchase
export const trackPurchase = (kepixel, orderId, cartItems, userData, customData) => {
  // Calculate values
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 5.99;
  const discount = 0;
  const grandTotal = subtotal + tax + shipping - discount;
  
  // Track purchase event
  kepixel.trackPurchase({
    order_id: orderId,
    currency: 'USD',
    value: grandTotal,
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    description: `Order ${orderId}`,
    user_data: userData,
    custom_data: customData
  });
  
  // Track using advanced e-commerce tracking
  kepixel.clearEcommerceCart();
  
  // Add each item to the cart
  cartItems.forEach(item => {
    kepixel.addEcommerceItem(
      item.id,
      item.name,
      item.category,
      item.price,
      item.quantity
    );
  });
  
  // Track order
  kepixel.trackEcommerceOrder(
    orderId,
    grandTotal,
    subtotal,
    tax,
    shipping,
    discount
  );
  
  return {
    orderId,
    subtotal,
    tax,
    shipping,
    discount,
    grandTotal
  };
};
```

## Complete App Example

### App.js with All Tracking Features

```jsx
// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KepixelProvider, KepixelTracker } from 'react-native-kepixel';
import { useKepixel } from 'react-native-kepixel';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CompleteRegistrationScreen from './screens/CompleteRegistrationScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createStackNavigator();

// Initialize the tracker
const tracker = new KepixelTracker({
  appId: 'YOUR_APP_ID',
  log: __DEV__,
});

// Navigation tracking component
const NavigationTracking = () => {
  const kepixel = useKepixel();
  
  const routeNameRef = React.useRef();
  
  useEffect(() => {
    // Track app start when the app is first loaded
    kepixel.trackAppStart({
      user_data: { id: 'anonymous' }
    });
    
    // Enable heart beat timer
    kepixel.enableHeartBeatTimer();
    
    // Enable link tracking
    kepixel.enableLinkTracking();
    
    // Clean up when component unmounts
    return () => {
      kepixel.disableHeartBeatTimer();
      kepixel.disableLinkTracking();
    };
  }, []);
  
  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = state.routes[state.index].name;

    if (previousRouteName !== currentRouteName) {
      // Track screen view
      kepixel.trackScreenView({ 
        name: currentRouteName,
        user_data: { id: kepixel.userId || 'anonymous' }
      });
    }
    
    // Save the current route name for next comparison
    routeNameRef.current = currentRouteName;
  };
  
  return null;
};

const App = () => {
  return (
    <KepixelProvider instance={tracker}>
      <NavigationContainer
        onStateChange={onNavigationStateChange}
      >
        <NavigationTracking />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="CompleteRegistration" component={CompleteRegistrationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </KepixelProvider>
  );
};

export default App;
```

This examples file provides a comprehensive set of examples for using the Kepixel React Native SDK in various scenarios, including basic setup, screen tracking, user action tracking, e-commerce tracking, user authentication tracking, and advanced e-commerce tracking. It also includes a complete app example that demonstrates how to integrate all these tracking features into a React Native application.
