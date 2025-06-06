# Kepixel SDK Unified Event Structure

This document defines the unified schema and required parameters for each event type tracked by the Kepixel SDK across all platforms.

## ViewContent Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## AddToCart Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## Purchase Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## Download Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## AddPaymentInfo Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## AddToWishlist Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## AppInstall Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## AppOpen Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## CompleteRegistration Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## Contact Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## CustomEvent Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## InitiateCheckout Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## ListView Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## Login Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## PageView Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## Search Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---

## SignUp Event

### Base Fields

- `event_name`
- `timestamp`
- `session_id`
- `user_id`
- `device_id`
- `platform`
- `page_url`
- `referrer`
- `app_version`
- `ip_address`
- `user_agent`
- `language`

### user_data Fields

- `user_data.id`
- `user_data.email`
- `user_data.phone`
- `user_data.name`
- `user_data.country`
- `user_data.city`

### custom_data Fields

- `custom_data.value`
- `custom_data.currency`
- `custom_data.order_id`
- `custom_data.items`
- `custom_data.payment_method`
- `custom_data.shipping_method`
- `custom_data.cart_id`
- `custom_data.coupon_code`
- `custom_data.event_source`
- `custom_data.integration_partner`
- `custom_data.event_version`

---
