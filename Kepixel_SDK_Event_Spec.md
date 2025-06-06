## Table of Contents

1. ViewContent Event
2. AddToCart Event
3. Purchase Event
4. Download Event
5. AddPaymentInfo Event
6. AddToWishlist Event
7. AppInstall Event
8. AppOpen Event
9. CompleteRegistration Event
10. Contact Event
11. CustomEvent Event
12. InitiateCheckout Event
13. ListView Event
14. Login Event
15. PageView Event
16. Search Event
17. SignUp Event

---

## ViewContent Event

### Base Fields

* event\_name: 'ViewContent'
* timestamp: '2025-06-06T12:00:00Z'
* session\_id: 'sess\_789'
* user\_id: 'user\_456'
* device\_id: 'dev\_123'
* platform: 'web'
* page\_url: '[https://example.com/product/123](https://example.com/product/123)'
* referrer: '[https://google.com](https://google.com)'
* app\_version: '1.2.3'
* ip\_address: '192.168.1.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_456'
* user\_data.email: '[user@example.com](mailto:user@example.com)'
* user\_data.phone: '+1234567890'
* user\_data.name: 'John Doe'
* user\_data.country: 'US'
* user\_data.city: 'New York'

### custom\_data Fields

* custom\_data.value: 199.99
* custom\_data.currency: 'USD'
* custom\_data.order\_id: 'order\_001'
* custom\_data.items: \[{'id': 'product-123', 'name': 'Example Product'}]
* custom\_data.payment\_method: 'credit\_card'
* custom\_data.shipping\_method: 'standard'
* custom\_data.cart\_id: 'cart\_abc'
* custom\_data.coupon\_code: 'SUMMER2025'
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'Shopify'
* custom\_data.event\_version: '1.0'

---

## AddToCart Event

### Base Fields

* event\_name: 'AddToCart'
* timestamp: '2025-06-06T12:01:00Z'
* session\_id: 'sess\_789'
* user\_id: 'user\_456'
* device\_id: 'dev\_123'
* platform: 'web'
* page\_url: '[https://example.com/cart](https://example.com/cart)'
* referrer: '[https://example.com/product/123](https://example.com/product/123)'
* app\_version: '1.2.3'
* ip\_address: '192.168.1.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_456'
* user\_data.email: '[user@example.com](mailto:user@example.com)'
* user\_data.phone: '+1234567890'
* user\_data.name: 'John Doe'
* user\_data.country: 'US'
* user\_data.city: 'New York'

### custom\_data Fields

* custom\_data.value: 199.99
* custom\_data.currency: 'USD'
* custom\_data.order\_id: 'order\_001'
* custom\_data.items: \[{'id': 'product-123', 'name': 'Example Product'}]
* custom\_data.payment\_method: 'credit\_card'
* custom\_data.shipping\_method: 'standard'
* custom\_data.cart\_id: 'cart\_abc'
* custom\_data.coupon\_code: 'SUMMER2025'
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'Shopify'
* custom\_data.event\_version: '1.0'

---

## Purchase Event

### Base Fields

* event\_name: 'Purchase'
* timestamp: '2025-06-06T12:05:00Z'
* session\_id: 'sess\_789'
* user\_id: 'user\_456'
* device\_id: 'dev\_123'
* platform: 'web'
* page\_url: '[https://example.com/thank-you](https://example.com/thank-you)'
* referrer: '[https://example.com/checkout](https://example.com/checkout)'
* app\_version: '1.2.3'
* ip\_address: '192.168.1.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_456'
* user\_data.email: '[user@example.com](mailto:user@example.com)'
* user\_data.phone: '+1234567890'
* user\_data.name: 'John Doe'
* user\_data.country: 'US'
* user\_data.city: 'New York'

### custom\_data Fields

* custom\_data.value: 199.99
* custom\_data.currency: 'USD'
* custom\_data.order\_id: 'order\_001'
* custom\_data.items: \[{'id': 'product-123', 'name': 'Example Product'}]
* custom\_data.payment\_method: 'credit\_card'
* custom\_data.shipping\_method: 'standard'
* custom\_data.cart\_id: 'cart\_abc'
* custom\_data.coupon\_code: 'SUMMER2025'
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'Shopify'
* custom\_data.event\_version: '1.0'

---


## Download Event

### Base Fields

* event\_name: 'Download'
* timestamp: '2025-06-06T12:10:00Z'
* session\_id: 'sess\_999'
* user\_id: 'user\_789'
* device\_id: 'dev\_321'
* platform: 'mobile'
* page\_url: '[https://example.com/download/app](https://example.com/download/app)'
* referrer: '[https://example.com/home](https://example.com/home)'
* app\_version: '2.0.0'
* ip\_address: '192.168.2.1'
* user\_agent: 'KepixelApp/2.0'
* language: 'ar-EG'

### user\_data Fields

* user\_data.id: 'user\_789'
* user\_data.email: '[ahmed@example.com](mailto:ahmed@example.com)'
* user\_data.phone: '+201234567890'
* user\_data.name: 'Ahmed Ali'
* user\_data.country: 'EG'
* user\_data.city: 'Cairo'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'EGP'
* custom\_data.order\_id: 'dl\_2025\_01'
* custom\_data.items: \[{'id': 'app-001', 'name': 'Kepixel Mobile'}]
* custom\_data.payment\_method: 'free'
* custom\_data.shipping\_method: 'none'
* custom\_data.cart\_id: 'cart\_dl'
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'mobile\_app'
* custom\_data.integration\_partner: 'PlayStore'
* custom\_data.event\_version: '1.0'

---

## AddPaymentInfo Event

### Base Fields

* event\_name: 'AddPaymentInfo'
* timestamp: '2025-06-06T12:15:00Z'
* session\_id: 'sess\_456'
* user\_id: 'user\_777'
* device\_id: 'dev\_555'
* platform: 'web'
* page\_url: '[https://example.com/payment-info](https://example.com/payment-info)'
* referrer: '[https://example.com/checkout](https://example.com/checkout)'
* app\_version: '1.5.0'
* ip\_address: '192.168.3.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-GB'

### user\_data Fields

* user\_data.id: 'user\_777'
* user\_data.email: '[lisa@example.com](mailto:lisa@example.com)'
* user\_data.phone: '+441234567890'
* user\_data.name: 'Lisa Smith'
* user\_data.country: 'UK'
* user\_data.city: 'London'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'GBP'
* custom\_data.order\_id: 'order\_addpay\_01'
* custom\_data.items: \[{'id': 'sub-01', 'name': 'Pro Subscription'}]
* custom\_data.payment\_method: 'paypal'
* custom\_data.shipping\_method: 'none'
* custom\_data.cart\_id: 'cart\_777'
* custom\_data.coupon\_code: 'UKSAVE10'
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'WooCommerce'
* custom\_data.event\_version: '1.0'

---

## AddToWishlist Event

### Base Fields

* event\_name: 'AddToWishlist'
* timestamp: '2025-06-06T12:20:00Z'
* session\_id: 'sess\_wish'
* user\_id: 'user\_101'
* device\_id: 'dev\_w01'
* platform: 'web'
* page\_url: '[https://example.com/wishlist](https://example.com/wishlist)'
* referrer: '[https://example.com/product/789](https://example.com/product/789)'
* app\_version: '2.1.0'
* ip\_address: '10.0.0.5'
* user\_agent: 'Mozilla/5.0 (Windows NT)'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_101'
* user\_data.email: '[nour@example.com](mailto:nour@example.com)'
* user\_data.phone: '+966512345678'
* user\_data.name: 'Nour Fadel'
* user\_data.country: 'SA'
* user\_data.city: 'Riyadh'

### custom\_data Fields

* custom\_data.value: 120.0
* custom\_data.currency: 'SAR'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'wish-789', 'name': 'Wishlist Item'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: 'cart\_w01'
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'Magento'
* custom\_data.event\_version: '1.0'

---

## AppInstall Event

### Base Fields

* event\_name: 'AppInstall'
* timestamp: '2025-06-06T12:25:00Z'
* session\_id: 'sess\_ai123'
* user\_id: 'user\_ai001'
* device\_id: 'dev\_ai01'
* platform: 'android'
* page\_url: '[https://play.google.com/store/apps/details?id=kepixel](https://play.google.com/store/apps/details?id=kepixel)'
* referrer: '[https://example.com/landing](https://example.com/landing)'
* app\_version: '1.0.0'
* ip\_address: '172.16.0.1'
* user\_agent: 'Dalvik/2.1.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_ai001'
* user\_data.email: '[mohamed@example.com](mailto:mohamed@example.com)'
* user\_data.phone: '+201098765432'
* user\_data.name: 'Mohamed Saleh'
* user\_data.country: 'EG'
* user\_data.city: 'Alexandria'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'EGP'
* custom\_data.order\_id: 'app\_install\_01'
* custom\_data.items: \[{'id': 'app-install-2025', 'name': 'Kepixel Android App'}]
* custom\_data.payment\_method: 'free'
* custom\_data.shipping\_method: 'none'
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'google\_play'
* custom\_data.integration\_partner: 'Firebase'
* custom\_data.event\_version: '1.0'

---

## AppOpen Event

### Base Fields

* event\_name: 'AppOpen'
* timestamp: '2025-06-06T12:30:00Z'
* session\_id: 'sess\_ao234'
* user\_id: 'user\_ao002'
* device\_id: 'dev\_ao02'
* platform: 'ios'
* page\_url: 'kepixel://home'
* referrer: ''
* app\_version: '2.2.0'
* ip\_address: '10.1.1.2'
* user\_agent: 'KepixelApp/2.2.0 (iPhone; iOS 16.5)'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_ao002'
* user\_data.email: '[salma@example.com](mailto:salma@example.com)'
* user\_data.phone: '+966501112222'
* user\_data.name: 'Salma Haddad'
* user\_data.country: 'SA'
* user\_data.city: 'Jeddah'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'SAR'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'open-session', 'name': 'App Launch'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'app'
* custom\_data.integration\_partner: 'AppStore'
* custom\_data.event\_version: '1.0'

---

## CompleteRegistration Event

### Base Fields

* event\_name: 'CompleteRegistration'
* timestamp: '2025-06-06T12:35:00Z'
* session\_id: 'sess\_cr001'
* user\_id: 'user\_cr01'
* device\_id: 'dev\_cr01'
* platform: 'web'
* page\_url: '[https://example.com/registration-success](https://example.com/registration-success)'
* referrer: '[https://example.com/signup](https://example.com/signup)'
* app\_version: '1.0.0'
* ip\_address: '192.168.88.1'
* user\_agent: 'Mozilla/5.0 (Macintosh)'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_cr01'
* user\_data.email: '[fady@example.com](mailto:fady@example.com)'
* user\_data.phone: '+201110001111'
* user\_data.name: 'Fady Gamil'
* user\_data.country: 'EG'
* user\_data.city: 'Giza'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'EGP'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'reg-001', 'name': 'Free User Registration'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'CustomForm'
* custom\_data.event\_version: '1.0'

---

## Contact Event

### Base Fields

* event\_name: 'Contact'
* timestamp: '2025-06-06T12:40:00Z'
* session\_id: 'sess\_contact01'
* user\_id: 'user\_contact01'
* device\_id: 'dev\_contact01'
* platform: 'web'
* page\_url: '[https://example.com/contact-success](https://example.com/contact-success)'
* referrer: '[https://example.com/contact](https://example.com/contact)'
* app\_version: '1.0.0'
* ip\_address: '172.20.10.5'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_contact01'
* user\_data.email: '[dina@example.com](mailto:dina@example.com)'
* user\_data.phone: '+971555667788'
* user\_data.name: 'Dina Ameen'
* user\_data.country: 'AE'
* user\_data.city: 'Dubai'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'AED'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'contact-001', 'name': 'General Inquiry'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'ContactForm7'
* custom\_data.event\_version: '1.0'

---

## CustomEvent Event

### Base Fields

* event\_name: 'CustomEvent'
* timestamp: '2025-06-06T12:45:00Z'
* session\_id: 'sess\_custom01'
* user\_id: 'user\_custom01'
* device\_id: 'dev\_custom01'
* platform: 'web'
* page\_url: '[https://example.com/custom-action](https://example.com/custom-action)'
* referrer: ''
* app\_version: '1.0.0'
* ip\_address: '10.0.10.10'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_custom01'
* user\_data.email: '[zain@example.com](mailto:zain@example.com)'
* user\_data.phone: '+962788998877'
* user\_data.name: 'Zain Omar'
* user\_data.country: 'JO'
* user\_data.city: 'Amman'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'JOD'
* custom\_data.order\_id: 'custom\_evt\_01'
* custom\_data.items: \[{'id': 'custom-001', 'name': 'CTA Button Click'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'custom\_js\_event'
* custom\_data.integration\_partner: 'Manual'
* custom\_data.event\_version: '1.0'

---

## InitiateCheckout Event

### Base Fields

* event\_name: 'InitiateCheckout'
* timestamp: '2025-06-06T12:50:00Z'
* session\_id: 'sess\_chkout1'
* user\_id: 'user\_chk001'
* device\_id: 'dev\_chk01'
* platform: 'web'
* page\_url: '[https://example.com/checkout](https://example.com/checkout)'
* referrer: '[https://example.com/cart](https://example.com/cart)'
* app\_version: '1.3.0'
* ip\_address: '172.30.1.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_chk001'
* user\_data.email: '[khaled@example.com](mailto:khaled@example.com)'
* user\_data.phone: '+96598765432'
* user\_data.name: 'Khaled Hasan'
* user\_data.country: 'KW'
* user\_data.city: 'Kuwait City'

### custom\_data Fields

* custom\_data.value: 450.0
* custom\_data.currency: 'KWD'
* custom\_data.order\_id: 'checkout\_001'
* custom\_data.items: \[{'id': 'item-1001', 'name': 'Annual License'}]
* custom\_data.payment\_method: 'credit\_card'
* custom\_data.shipping\_method: 'express'
* custom\_data.cart\_id: 'cart\_chk01'
* custom\_data.coupon\_code: 'KUWAIT30'
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'Stripe'
* custom\_data.event\_version: '1.0'

---

## ListView Event

### Base Fields

* event\_name: 'ListView'
* timestamp: '2025-06-06T12:55:00Z'
* session\_id: 'sess\_lv01'
* user\_id: 'user\_lv01'
* device\_id: 'dev\_lv01'
* platform: 'web'
* page\_url: '[https://example.com/products](https://example.com/products)'
* referrer: '[https://example.com/home](https://example.com/home)'
* app\_version: '1.3.0'
* ip\_address: '192.168.100.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_lv01'
* user\_data.email: '[reem@example.com](mailto:reem@example.com)'
* user\_data.phone: '+97332100100'
* user\_data.name: 'Reem Bader'
* user\_data.country: 'BH'
* user\_data.city: 'Manama'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'BHD'
* custom\_data.order\_id: ''
* custom\_data.items: \[
  {'id': 'product-001', 'name': 'Product A'},
  {'id': 'product-002', 'name': 'Product B'}
  ]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: 'cart\_lv01'
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'WooCommerce'
* custom\_data.event\_version: '1.0'

---

## Login Event

### Base Fields

* event\_name: 'Login'
* timestamp: '2025-06-06T13:00:00Z'
* session\_id: 'sess\_login01'
* user\_id: 'user\_login01'
* device\_id: 'dev\_login01'
* platform: 'web'
* page\_url: '[https://example.com/dashboard](https://example.com/dashboard)'
* referrer: '[https://example.com/login](https://example.com/login)'
* app\_version: '1.0.0'
* ip\_address: '10.5.0.1'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_login01'
* user\_data.email: '[tamer@example.com](mailto:tamer@example.com)'
* user\_data.phone: '+962771234567'
* user\_data.name: 'Tamer Rami'
* user\_data.country: 'JO'
* user\_data.city: 'Zarqa'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'JOD'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'session-login', 'name': 'Login Session'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'auth\_system'
* custom\_data.integration\_partner: 'FirebaseAuth'
* custom\_data.event\_version: '1.0'

---

## PageView Event

### Base Fields

* event\_name: 'PageView'
* timestamp: '2025-06-06T13:05:00Z'
* session\_id: 'sess\_pv01'
* user\_id: 'user\_pv01'
* device\_id: 'dev\_pv01'
* platform: 'web'
* page\_url: '[https://example.com/about-us](https://example.com/about-us)'
* referrer: '[https://example.com/home](https://example.com/home)'
* app\_version: '1.0.0'
* ip\_address: '192.168.10.10'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_pv01'
* user\_data.email: '[hassan@example.com](mailto:hassan@example.com)'
* user\_data.phone: '+218923456789'
* user\_data.name: 'Hassan Khalifa'
* user\_data.country: 'LY'
* user\_data.city: 'Tripoli'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'LYD'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'page-001', 'name': 'About Us Page'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'WordPress'
* custom\_data.event\_version: '1.0'

---

## Search Event

### Base Fields

* event\_name: 'Search'
* timestamp: '2025-06-06T13:10:00Z'
* session\_id: 'sess\_search01'
* user\_id: 'user\_search01'
* device\_id: 'dev\_search01'
* platform: 'web'
* page\_url: '[https://example.com/search?q=analytics](https://example.com/search?q=analytics)'
* referrer: '[https://example.com/home](https://example.com/home)'
* app\_version: '1.0.0'
* ip\_address: '192.168.10.20'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_search01'
* user\_data.email: '[yara@example.com](mailto:yara@example.com)'
* user\_data.phone: '+21699887766'
* user\_data.name: 'Yara Hamdi'
* user\_data.country: 'TN'
* user\_data.city: 'Tunis'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'TND'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'search-001', 'name': 'Query: analytics'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'Algolia'
* custom\_data.event\_version: '1.0'

---

## SignUp Event

### Base Fields

* event\_name: 'SignUp'
* timestamp: '2025-06-06T13:15:00Z'
* session\_id: 'sess\_signup01'
* user\_id: 'user\_signup01'
* device\_id: 'dev\_signup01'
* platform: 'web'
* page\_url: '[https://example.com/signup-success](https://example.com/signup-success)'
* referrer: '[https://example.com/signup](https://example.com/signup)'
* app\_version: '1.0.0'
* ip\_address: '172.16.20.5'
* user\_agent: 'Mozilla/5.0'
* language: 'en-US'

### user\_data Fields

* user\_data.id: 'user\_signup01'
* user\_data.email: '[layla@example.com](mailto:layla@example.com)'
* user\_data.phone: '+963991234567'
* user\_data.name: 'Layla Majid'
* user\_data.country: 'SY'
* user\_data.city: 'Damascus'

### custom\_data Fields

* custom\_data.value: 0
* custom\_data.currency: 'SYP'
* custom\_data.order\_id: ''
* custom\_data.items: \[{'id': 'signup-001', 'name': 'New Account Signup'}]
* custom\_data.payment\_method: ''
* custom\_data.shipping\_method: ''
* custom\_data.cart\_id: ''
* custom\_data.coupon\_code: ''
* custom\_data.event\_source: 'website'
* custom\_data.integration\_partner: 'CustomForm'
* custom\_data.event\_version: '1.0'

---
