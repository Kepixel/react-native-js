import { ReactNode } from 'react';

// UserData type
export interface UserDataParams {
  email?: string;
  phone?: string;
  name?: string;
  id?: string;
  [key: string]: any;
}

export class UserData {
  email?: string;
  phone?: string;
  name?: string;
  id?: string;
  [key: string]: any;

  constructor(params?: UserDataParams);
}

// Base Event type
export interface EventBaseParams {
  source?: string;
  user_data?: UserData | UserDataParams;
  custom_data?: Record<string, any>;
}

export class EventBase {
  source?: string;
  user_data?: UserData;
  custom_data?: Record<string, any>;

  constructor(params?: EventBaseParams);
}

// Item type for e-commerce events
export interface Item {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  variant?: string;
  [key: string]: any;
}

// Specific Event types
export interface AddPaymentInfoEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class AddPaymentInfoEvent extends EventBase {
  event_name: string;
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params?: AddPaymentInfoEventParams);
}

export interface AddToCartEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class AddToCartEvent extends EventBase {
  event_name: string;
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params?: AddToCartEventParams);
}

export interface AddToWishlistEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class AddToWishlistEvent extends EventBase {
  event_name: string;
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params?: AddToWishlistEventParams);
}

export interface AppInstallEventParams extends EventBaseParams {
  app_name?: string;
  app_version?: string;
}

export class AppInstallEvent extends EventBase {
  event_name: string;
  app_name?: string;
  app_version?: string;

  constructor(params?: AppInstallEventParams);
}

export interface AppOpenEventParams extends EventBaseParams {
  app_name?: string;
  app_version?: string;
}

export class AppOpenEvent extends EventBase {
  event_name: string;
  app_name?: string;
  app_version?: string;

  constructor(params?: AppOpenEventParams);
}

export interface CompleteRegistrationEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  method?: string;
}

export class CompleteRegistrationEvent extends EventBase {
  event_name: string;
  value?: number;
  currency?: string;
  method?: string;

  constructor(params?: CompleteRegistrationEventParams);
}

export interface ContactEventParams extends EventBaseParams {
  method?: string;
}

export class ContactEvent extends EventBase {
  event_name: string;
  method?: string;

  constructor(params?: ContactEventParams);
}

export interface CustomEventEventParams extends EventBaseParams {
  event_name: string;
  [key: string]: any;
}

export class CustomEventEvent extends EventBase {
  event_name: string;

  constructor(params?: CustomEventEventParams);
}

export interface DownloadEventParams extends EventBaseParams {
  content_type?: string;
  content_id?: string;
}

export class DownloadEvent extends EventBase {
  event_name: string;
  content_type?: string;
  content_id?: string;

  constructor(params?: DownloadEventParams);
}

export interface InitiateCheckoutEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class InitiateCheckoutEvent extends EventBase {
  event_name: string;
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params?: InitiateCheckoutEventParams);
}

export interface ListViewEventParams extends EventBaseParams {
  item_list_id?: string;
  item_list_name?: string;
  items?: Item[];
}

export class ListViewEvent extends EventBase {
  event_name: string;
  item_list_id?: string;
  item_list_name?: string;
  items?: Item[];

  constructor(params?: ListViewEventParams);
}

export interface LoginEventParams extends EventBaseParams {
  method?: string;
}

export class LoginEvent extends EventBase {
  event_name: string;
  method?: string;

  constructor(params?: LoginEventParams);
}

export interface PageViewEventParams extends EventBaseParams {
  page_title?: string;
  page_location?: string;
  page_path?: string;
}

export class PageViewEvent extends EventBase {
  event_name: string;
  page_title?: string;
  page_location?: string;
  page_path?: string;

  constructor(params?: PageViewEventParams);
}

export interface PurchaseEventParams extends EventBaseParams {
  transaction_id?: string;
  value?: number;
  currency?: string;
  tax?: number;
  shipping?: number;
  items?: Item[];
}

export class PurchaseEvent extends EventBase {
  event_name: string;
  transaction_id?: string;
  value?: number;
  currency?: string;
  tax?: number;
  shipping?: number;
  items?: Item[];

  constructor(params?: PurchaseEventParams);
}

export interface SearchEventParams extends EventBaseParams {
  search_term?: string;
}

export class SearchEvent extends EventBase {
  event_name: string;
  search_term?: string;

  constructor(params?: SearchEventParams);
}

export interface SignUpEventParams extends EventBaseParams {
  method?: string;
}

export class SignUpEvent extends EventBase {
  event_name: string;
  method?: string;

  constructor(params?: SignUpEventParams);
}

export interface ViewContentEventParams extends EventBaseParams {
  content_type?: string;
  content_id?: string;
  items?: Item[];
  value?: number;
  currency?: string;
}

export class ViewContentEvent extends EventBase {
  event_name: string;
  content_type?: string;
  content_id?: string;
  items?: Item[];
  value?: number;
  currency?: string;

  constructor(params?: ViewContentEventParams);
}

// KepixelTracker options
export interface KepixelTrackerOptions {
  appId: string;
  userId?: string;
  log?: boolean;
}

// KepixelTracker class
export default class KepixelTracker {
  constructor(userOptions: KepixelTrackerOptions);

  // Initialization
  initialize(options: KepixelTrackerOptions): Promise<void>;

  // Basic tracking methods
  trackAppStart(params?: any): void;
  trackScreenView(params?: any): void;
  trackAction(params?: any): void;
  trackEvent(params?: any): void;
  trackLink(params?: any): void;
  trackDownload(params?: DownloadEventParams): void;

  // E-commerce tracking methods
  trackPurchase(params?: PurchaseEventParams): void;
  trackAddToCart(params?: AddToCartEventParams): void;
  trackViewContent(params?: ViewContentEventParams): void;
  trackCompleteRegistration(params?: CompleteRegistrationEventParams): void;
  trackSearch(params?: SearchEventParams): void;
  trackInitiateCheckout(params?: InitiateCheckoutEventParams): void;
  trackAddPaymentInfo(params?: AddPaymentInfoEventParams): void;
  trackSignUp(params?: SignUpEventParams): void;
  trackPageView(params?: PageViewEventParams): void;
  trackListView(params?: ListViewEventParams): void;
  trackAddToWishlist(params?: AddToWishlistEventParams): void;
  trackAppOpen(params?: AppOpenEventParams): void;
  trackAppInstall(params?: AppInstallEventParams): void;
  trackContact(params?: ContactEventParams): void;
  trackLogin(params?: LoginEventParams): void;
  trackCustomEvent(params?: CustomEventEventParams): void;

  // Goal tracking
  trackGoal(params?: any): void;

  // Advanced e-commerce tracking
  setEcommerceView(productSKU?: string, productName?: string, categoryName?: string, price?: number): void;
  addEcommerceItem(productSKU?: string, productName?: string, categoryName?: string, price?: number, quantity?: number): void;
  clearEcommerceCart(): void;
  trackEcommerceCartUpdate(grandTotal?: number): void;
  trackEcommerceOrder(orderId?: string, grandTotal?: number, subTotal?: number, tax?: number, shipping?: number, discount?: number): void;

  // Heart beat timer
  enableHeartBeatTimer(activeTime?: number): void;
  disableHeartBeatTimer(): void;

  // Link tracking
  enableLinkTracking(trackContent?: boolean): void;
  disableLinkTracking(): void;

  // Configuration methods
  setUserId(userId: string): void;
  setAppId(appId: string): void;
  putDeviceToken(androidToken?: string, iOSToken?: string): void;
  setAdvertisingId(androidId?: string, iOSId?: string): void;
}

// React Context
export type KepixelContextValue = KepixelTracker;

export const KepixelContext: React.Context<KepixelContextValue | null>;

// React Provider
export interface KepixelProviderProps {
  instance: KepixelTracker;
  children: ReactNode;
}

export function KepixelProvider(props: KepixelProviderProps): JSX.Element;

// React Hook
export type UseKepixelReturn = KepixelContextValue;

export function useKepixel(): UseKepixelReturn;
