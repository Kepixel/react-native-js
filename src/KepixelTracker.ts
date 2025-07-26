// @ts-nocheck
/**
 * Represents a Kepixel Tracker for tracking user interactions.
 *
 * @class
 * @param {Object} userOptions - User configuration options for Kepixel tracking.
 * @param {string} userOptions.appId - The Kepixel app ID.
 * @param {string} [userOptions.userId] - The user ID for tracking.
 * @param {boolean} [userOptions.log=false] - Indicates if logging is enabled.
 */
import {
    AddPaymentInfoEvent,
    AddToCartEvent,
    AddToWishlistEvent,
    AppInstallEvent,
    AppOpenEvent,
    CompleteRegistrationEvent,
    ContactEvent,
    CustomEventEvent,
    DownloadEvent,
    InitiateCheckoutEvent,
    ListViewEvent,
    LoginEvent,
    PageViewEvent,
    PurchaseEvent,
    SearchEvent,
    SignUpEvent,
    ViewContentEvent,
} from '../DTO/index.js';

interface TrackerOptions {
    appId: string;
    userId?: string;
    log?: boolean;
}

class KepixelTracker {
    trackerUrl!: string;
    appId!: string;
    encodedAppId!: string;
    userId?: string;
    log: boolean = false;

    constructor(userOptions: TrackerOptions) {
        if (!userOptions.appId) {
            throw new Error('appId is required for Kepixel tracking.');
        }

        this.initialize(userOptions);
    }

    /**
     * Validates user_data object to ensure it has at least one required property.
     *
     * @param {Object} user_data - The user data object to validate.
     * @returns {boolean} True if the user_data is valid, false otherwise.
     * @private
     */
    _validateUserData(user_data) {
        if (!user_data || typeof user_data !== 'object') {
            return false;
        }

        // Check if user_data has at least one of the required properties
        return !!(user_data.email || user_data.phone || user_data.name || user_data.id);
    }

    /**
     * Validates an item object to ensure it has all required properties.
     *
     * @param {Object} item - The item object to validate.
     * @returns {boolean} True if the item is valid, false otherwise.
     * @private
     */
    _validateItem(item) {
        if (!item || typeof item !== 'object') {
            return false;
        }

        // Check if item has all required properties
        return !!(
            item.id !== undefined &&
            item.name !== undefined &&
            item.price !== undefined &&
            item.quantity !== undefined
        );
    }

    /**
     * Validates an array of items to ensure each item has all required properties.
     *
     * @param {Array} items - The array of items to validate.
     * @returns {boolean} True if all items are valid, false otherwise.
     * @private
     */
    _validateItems(items) {
        if (!Array.isArray(items)) {
            return false;
        }

        if (items.length === 0) {
            return true; // Empty array is valid
        }

        // Check if all items are valid
        return items.every(item => this._validateItem(item));
    }

    /**
     * Initializes the KepixelTracker with user options.
     *
     * @param {Object} options - Initialization options.
     * @param {string} options.appId - The Kepixel app ID.
     * @param {string} [options.userId] - The user ID for tracking.
     * @param {boolean} [options.log=false] - Indicates if logging is enabled.
     */
    initialize({appId, userId, log = false}) {
        this.log = log;

        this.trackerUrl = "https://edge.kepixel.com";
        this.appId = appId;
        this.encodedAppId = btoa(appId);

        if (userId) {
            this.userId = userId;
        }

        log &&
        console.log('Kepixel tracking is enabled for:', {
            trackerUrl: this.trackerUrl,
            appId: this.appId,
            userId: this.userId
        });
    }

    setUserId(userId) {
        this.userId = userId;
    }

    /**
     * Sends an identify call to the server.
     *
     * @param {Object} data - The identify payload.
     * @returns {Promise} A Promise that resolves when the identify call is complete.
     * @private
     */
    async identifyUser(data) {
        if (!data) return;

        const fetchObj = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.encodedAppId}`,
            },
            body: JSON.stringify(data)
        };

        return fetch(`${this.trackerUrl}/v1/identify`, fetchObj)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                this.log && console.log('Kepixel identify call sent:', this.trackerUrl, fetchObj);

                return response;
            })
            .catch((error) => {
                this.log && console.log('Kepixel identify call failed:', this.trackerUrl, fetchObj);

                console.warn('Kepixel identify error:', error);

                return error;
            });
    }

    setAppId(appId) {
        this.appId = appId;
        this.encodedAppId = btoa(appId);
    }

    /**
     * Tracks app start as an action with a prefixed 'App' category.
     *
     * @param {Object} [options={}] - Tracking options.
     * @param {Object} [options.user_data={}] - Optional data for tracking different user info.
     * @returns {Promise} A Promise that resolves when the tracking is complete.
     *
     */
    trackAppStart({user_data = {}} = {}) {
        return this.trackAction({name: 'App / start', userInfo: user_data});
    }

    /**
     * Tracks a screen view as an action with the prefixed 'Screen' category.
     *
     * This method is used to record user interactions with screens or pages in your application.
     *
     * @param {Object} options - Options for tracking the screen view.
     * @param {string} options.name - The title of the screen being tracked. Use slashes (/) to set one or
     several categories for this screen. For example, 'Help / Feedback' will create the Action 'Feedback' in the
     category 'Help'.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'name' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the screen view tracking is complete.
     *
     * @example
     * // Tracking a screen view without user information
     * trackScreenView({name: 'Home'});
     *
     * @example
     * // Tracking a screen view with additional user information
     * trackScreenView({name: 'Product Details', user_data: {uid: '123456'}});
     */
    trackScreenView({name, user_data = {}}) {
        if (!name) {
            throw new Error('Error: The "name" parameter is required for tracking a screen view.');
        }

        return this.trackAction({name: `Screen / ${name}`, userInfo: user_data});
    }


    /**
     * Tracks a custom action.
     *
     * This method is used to record user interactions with specific actions in your application.
     *
     * @param {Object} options - Options for tracking the action.
     * @param {string} options.name - The title of the action being tracked. Use slashes (/) to set one or
     several categories for this action. For example, 'Help / Feedback' will create the Action 'Feedback' in the
     category 'Help'.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'name' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the action tracking is complete.
     *
     * @example
     * // Tracking a custom action without user information
     * trackAction({name: 'ButtonClick'});
     *
     * @example
     * // Tracking a custom action with additional user information
     * trackAction({name: 'AddToCart', user_data: {uid: '123456'}});
     *
     */
    trackAction({name, user_data = {}}) {
        if (!name) {
            throw new Error('Error: The "name" parameter is required for tracking an action.');
        }

        return this.track({action_name: name, userInfo: user_data});
    }

    /**
     * Tracks a custom event.
     *
     * This method is used to record specific events in your application, providing insights into user
     interactions.
     *
     * @param {Object} options - Options for tracking the event.
     * @param {string} options.category - The event category. Must not be empty. (e.g., Videos, Music, Games...)
     * @param {string} options.action - The event action. Must not be empty. (e.g., Play, Pause, Duration, Add
     Playlist, Downloaded, Clicked...)
     * @param {string} [options.name] - The event name. (e.g., a Movie name, or Song name, or File name...)
     * @param {number | float} [options.value] - The event value. Must be a float or integer value (numeric), not
     a string.
     * @param {string} [options.campaign] - The event related campaign.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'category' or 'action' parameters are not provided.
     * @returns {Promise} A Promise that resolves when the event tracking is complete.
     *
     * @example
     * // Tracking a basic event without additional information
     * trackEvent({category: 'Videos', action: 'Play'});
     *
     * @example
     * // Tracking an event with a name and user information
     * trackEvent({category: 'Music', action: 'Pause', name: 'FavoriteSong', user_data: {uid: '123456'}});
     *
     */
    trackEvent({category, action, name, value, campaign, user_data = {}, source, custom_data}) {
        if (!category) {
            throw new Error('Error: The "category" parameter is required for tracking an event.');
        }
        if (!action) {
            throw new Error('Error: The "action" parameter is required for tracking an event.');
        }

        return this.track({
            e_c: category,
            e_a: action,
            e_n: name,
            e_v: value,
            mtm_campaign: campaign,
            userInfo: user_data,
            ...user_data,
            source,
            custom_data
        });
    }

    /**
     * Tracks clicks on outgoing links.
     *
     * This method is used to record user interactions when clicking on external links, providing insights into
     user navigation patterns.
     *
     * @param {Object} options - Options for tracking the link click.
     * @param {string} options.link - An external URL the user has opened. Used for tracking outlink clicks.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'link' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the link click tracking is complete.
     *
     * @example
     * // Tracking a link click without additional information
     * trackLink({link: 'https://external-site.com'});
     *
     * @example
     * // Tracking a link click with user information
     * trackLink({link: 'https://external-site.com', user_data: {userId: '123456', userRole: 'visitor'}});
     *
     */
    trackLink({link, user_data = {}}) {
        if (!link) {
            throw new Error('Error: The "link" parameter is required for tracking a link click.');
        }

        return this.track({
            link, url: link, userInfo: user_data,
            ...user_data
        });
    }


    /**
     * Tracks file downloads.
     *
     * This method is used to record user interactions when downloading files, providing insights into user
     engagement with downloadable content.
     *
     * @param {Object} [options={}] - Options for tracking the download.
     * @param {string} options.download - URL of a file the user has downloaded. Used for tracking downloads.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'download' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the download tracking is complete.
     *
     * @example
     * // Tracking a file download without additional information
     * trackDownload({download: 'https://example.com/files/document.pdf'});
     *
     * @example
     * // Tracking a file download with user information
     * trackDownload({download: 'https://example.com/files/image.png', user_data: {uid: '123456'}});
     */
    trackDownload(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new DownloadEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a purchase event.
     *
     * This method is used to record user purchase events in your application.
     *
     * @param {Object} [options={}] - Options for tracking the purchase.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the purchase tracking is complete.
     *
     * @example
     * // Tracking a purchase
     * trackPurchase({user_data: {value: 100, currency: 'USD', order_id: 'order123'}});
     */
    trackPurchase(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;

        // Validate items if present
        if (rest.items && !this._validateItems(rest.items)) {
            console.warn('Invalid items array. Each item should have id, name, price, and quantity properties.');
        }

        const event = new PurchaseEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items,
                order_id: event.order_id,
                description: event.description
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks an add to cart event.
     *
     * This method is used to record when users add items to their cart.
     *
     * @param {Object} [options={}] - Options for tracking the add to cart event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the add to cart tracking is complete.
     *
     * @example
     * // Tracking an add to cart event
     * trackAddToCart({user_data: {value: 50, currency: 'USD', content_ids: ['prod123']}});
     */
    trackAddToCart(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;

        // Validate items if present
        if (rest.items && !this._validateItems(rest.items)) {
            console.warn('Invalid items array. Each item should have id, name, price, and quantity properties.');
        }

        const event = new AddToCartEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items,
                description: event.description
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a lead event.
     *
     * This method is used to record when users express interest in your product or service.
     *
     * @param {Object} [options={}] - Options for tracking the lead event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the lead tracking is complete.
     *
     * @example
     * // Tracking a lead event
     }

     /**
     * Tracks a view content event.
     *
     * This method is used to record when users view specific content.
     *
     * @param {Object} [options={}] - Options for tracking the view content event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the view content tracking is complete.
     *
     * @example
     * // Tracking a view content event
     * trackViewContent({user_data: {content_ids: ['prod123'], content_type: 'product'}});
     */
    trackViewContent(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new ViewContentEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                id: event.id,
                name: event.name,
                currency: event.currency,
                type: event.type,
                value: event.value
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a complete registration event.
     *
     * This method is used to record when users complete a registration process.
     *
     * @param {Object} [options={}] - Options for tracking the complete registration event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the complete registration tracking is complete.
     *
     * @example
     * // Tracking a complete registration event
     * trackCompleteRegistration({user_data: {content_name: 'Account Creation'}});
     */
    trackCompleteRegistration(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new CompleteRegistrationEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a search event.
     *
     * This method is used to record when users perform a search.
     *
     * @param {Object} [options={}] - Options for tracking the search event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the search tracking is complete.
     *
     * @example
     * // Tracking a search event
     * trackSearch({user_data: {search_string: 'shoes'}});
     */
    trackSearch(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new SearchEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                search_string: event.search_string
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks an initiate checkout event.
     *
     * This method is used to record when users begin the checkout process.
     *
     * @param {Object} [options={}] - Options for tracking the initiate checkout event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the initiate checkout tracking is complete.
     *
     * @example
     * // Tracking an initiate checkout event
     * trackInitiateCheckout({user_data: {value: 100, currency: 'USD', content_ids: ['prod123']}});
     */
    trackInitiateCheckout(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;

        // Validate items if present
        if (rest.items && !this._validateItems(rest.items)) {
            console.warn('Invalid items array. Each item should have id, name, price, and quantity properties.');
        }

        const event = new InitiateCheckoutEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks an add payment info event.
     *
     * This method is used to record when users add payment information.
     *
     * @param {Object} [options={}] - Options for tracking the add payment info event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the add payment info tracking is complete.
     *
     * @example
     * // Tracking an add payment info event
     * trackAddPaymentInfo({user_data: {value: 100, currency: 'USD'}});
     */
    trackAddPaymentInfo(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;

        // Validate items if present
        if (rest.items && !this._validateItems(rest.items)) {
            console.warn('Invalid items array. Each item should have id, name, price, and quantity properties.');
        }

        const event = new AddPaymentInfoEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a sign up event.
     *
     * This method is used to record when users sign up for a service.
     *
     * @param {Object} [options={}] - Options for tracking the sign up event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the sign up tracking is complete.
     *
     * @example
     * // Tracking a sign up event
     * trackSignUp({user_data: {content_name: 'Newsletter Signup'}});
     */
    trackSignUp(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new SignUpEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }


    /**
     * Tracks a page view event.
     *
     * This method is used to record when users view a page.
     *
     * @param {Object} [options={}] - Options for tracking the page view event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the page view tracking is complete.
     *
     * @example
     * // Tracking a page view event
     * trackPageView({user_data: {page_url: 'https://example.com/home'}});
     */
    trackPageView(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new PageViewEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                id: event.id,
                name: event.name,
                category: event.category,
                type: event.type
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a list view event.
     *
     * This method is used to record when users view a list of items.
     *
     * @param {Object} [options={}] - Options for tracking the list view event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the list view tracking is complete.
     *
     * @example
     * // Tracking a list view event
     * trackListView({user_data: {content_ids: ['prod123', 'prod456']}});
     */
    trackListView(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new ListViewEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                id: event.id,
                name: event.name,
                category: event.category,
                type: event.type
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks an add to wishlist event.
     *
     * This method is used to record when users add items to their wishlist.
     *
     * @param {Object} [options={}] - Options for tracking the add to wishlist event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the add to wishlist tracking is complete.
     *
     * @example
     * // Tracking an add to wishlist event
     * trackAddToWishlist({user_data: {content_ids: ['prod123']}});
     */
    trackAddToWishlist(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;

        // Validate items if present
        if (rest.items && !this._validateItems(rest.items)) {
            console.warn('Invalid items array. Each item should have id, name, price, and quantity properties.');
        }

        const event = new AddToWishlistEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                items: event.items
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks an app open event.
     *
     * This method is used to record when users open the app.
     *
     * @param {Object} [options={}] - Options for tracking the app open event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the app open tracking is complete.
     *
     * @example
     * // Tracking an app open event
     * trackAppOpen({user_data: {app_version: '1.0.0'}});
     */
    trackAppOpen(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new AppOpenEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks an app install event.
     *
     * This method is used to record when users install the app.
     *
     * @param {Object} [options={}] - Options for tracking the app install event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the app install tracking is complete.
     *
     * @example
     * // Tracking an app install event
     * trackAppInstall({user_data: {device_model: 'iPhone 13'}});
     */
    trackAppInstall(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new AppInstallEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a contact event.
     *
     * This method is used to record when users make contact.
     *
     * @param {Object} [options={}] - Options for tracking the contact event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the contact tracking is complete.
     *
     * @example
     * // Tracking a contact event
     * trackContact({user_data: {contact_method: 'email'}});
     */
    trackContact(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new ContactEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a schedule event.
     *
     * This method is used to record when users schedule something.
     *
     * Tracks a start trial event.
     *
     * This method is used to record when users start a trial.
     *
     * @param {Object} [options={}] - Options for tracking the start trial event.

     /**
     * Tracks a submit application event.
     *
     * This method is used to record when users submit an application.
     *
     * @param {Object} [options={}] - Options for tracking the submit application event.

     /**
     * Tracks a send conversion event.
     *
     * This method is used to record conversion events.
     *
     * @param {Object} [options={}] - Options for tracking the send conversion event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     /**
     * Tracks a conversion adjustment event.
     *
     * This method is used to record conversion adjustment events.
     *
     * @param {Object} [options={}] - Options for tracking the conversion adjustment event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     /**
     * Tracks a login event.
     *
     * This method is used to record when users log in.
     *
     * @param {Object} [options={}] - Options for tracking the login event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the login tracking is complete.
     *
     * @example
     * // Tracking a login event
     * trackLogin({user_data: {method: 'email'}});
     */
    trackLogin(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new LoginEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a tutorial begin event.
     *
     * This method is used to record when users begin a tutorial.
     *
     * @param {Object} [options={}] - Options for tracking the tutorial begin event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     /**
     * Tracks a join group event.
     *
     * This method is used to record when users join a group.
     *
     * @param {Object} [options={}] - Options for tracking the join group event.

     /**
     * Tracks a qualified lead event.
     *
     * This method is used to record qualified lead events.
     *
     * @param {Object} [options={}] - Options for tracking the qualified lead event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     /**
     * Tracks a custom event.
     *
     * This method is used to record custom events.
     *
     * @param {Object} [options={}] - Options for tracking the custom event.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @returns {Promise} A Promise that resolves when the custom event tracking is complete.
     *
     * @example
     * // Tracking a custom event
     * trackCustomEvent({user_data: {custom_param: 'value'}});
     */
    trackCustomEvent(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new CustomEventEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: {
                event_name: event.event_name,
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            },
            value: null,
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Tracks a goal conversion.
     *
     * This method is used to manually trigger a goal conversion.
     *
     * @param {Object} options - Options for tracking the goal conversion.
     * @param {number} options.goalId - The ID of the goal to track.
     * @param {number} [options.revenue] - Optional revenue associated with the goal conversion.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @param {Object} [options.custom_data={}] - Optional custom data for the goal conversion.
     * @returns {Promise} A Promise that resolves when the goal tracking is complete.
     *
     * @example
     * // Tracking a goal conversion without revenue
     * trackGoal({goalId: 1});
     *
     * @example
     * // Tracking a goal conversion with revenue
     * trackGoal({goalId: 1, revenue: 10.50});
     */
    trackGoal({goalId, revenue, user_data = {}, custom_data = {}}) {
        if (!goalId && goalId !== 0) {
            throw new Error('Error: The "goalId" parameter is required for tracking a goal conversion.');
        }

        return this.track({
            idgoal: goalId,
            revenue: revenue,
            userInfo: user_data,
            ...user_data,
            custom_data
        });
    }

    /**
     * Sets the current page view as a product or category page view.
     * Must be called before trackPageView.
     *
     * @param {string | boolean} productSKU - Product SKU or false for category view.
     * @param {string | boolean} productName - Product name or false for category view.
     * @param {string | Array} categoryName - Product category or array of up to 5 categories.
     * @param {number} [price] - Product price.
     * @returns {void}
     *
     * @example
     * // Track a product view
     * setEcommerceView("SKU123", "Awesome Product", ["Category1", "Category2"], 29.99);
     * _paq.push(['trackPageView']);
     *
     * @example
     * // Track a category view
     * setEcommerceView(false, false, "Electronics");
     * _paq.push(['trackPageView']);
     */
    setEcommerceView(productSKU, productName, categoryName, price) {
        this._ecommerceView = {
            productSKU,
            productName,
            categoryName,
            price
        };
    }

    /**
     * Adds an item to the internal ecommerce cart for tracking.
     * Must be called before trackEcommerceCartUpdate or trackEcommerceOrder.
     *
     * @param {string} productSKU - Product SKU.
     * @param {string} [productName] - Product name.
     * @param {string | Array} [categoryName] - Product category or array of up to 5 categories.
     * @param {number} [price] - Product price.
     * @param {number} [quantity=1] - Product quantity.
     * @returns {void}
     *
     * @example
     * // Add an item to the cart
     * addEcommerceItem("SKU123", "Awesome Product", ["Category1", "Category2"], 29.99, 2);
     */
    addEcommerceItem(productSKU, productName, categoryName, price, quantity = 1) {
        // Validate required parameters
        if (!productSKU) {
            console.warn('Product SKU is required for addEcommerceItem');
            return;
        }

        if (!this._ecommerceItems) {
            this._ecommerceItems = [];
        }

        this._ecommerceItems.push({
            productSKU,
            productName,
            categoryName,
            price,
            quantity
        });
    }

    /**
     * Removes all items from the internal ecommerce cart.
     *
     * @returns {void}
     *
     * @example
     * // Clear the cart
     * clearEcommerceCart();
     */
    clearEcommerceCart() {
        this._ecommerceItems = [];
    }

    /**
     * Tracks a shopping cart update.
     * Call this after adding items with addEcommerceItem.
     *
     * @param {number} grandTotal - The grand total of the cart.
     * @returns {Promise} A Promise that resolves when the cart update tracking is complete.
     *
     * @example
     * // Track a cart update
     * trackEcommerceCartUpdate(69.97);
     */
    trackEcommerceCartUpdate(grandTotal) {
        if (!this._ecommerceItems || this._ecommerceItems.length === 0) {
            console.warn('No ecommerce items have been added. Call addEcommerceItem before trackEcommerceCartUpdate.');
        } else {
            // Validate each item in the ecommerce cart
            const invalidItems = this._ecommerceItems.filter(item => !item.productSKU);
            if (invalidItems.length > 0) {
                console.warn('Some items in the ecommerce cart are missing required properties (productSKU).');
            }
        }

        return this.track({
            ecommerce_cart_update: 1,
            revenue: grandTotal,
            ec_items: JSON.stringify(this._ecommerceItems || [])
        });
    }

    /**
     * Tracks an e-commerce order.
     * Call this after adding items with addEcommerceItem.
     *
     * @param {string} orderId - Order ID.
     * @param {number} grandTotal - Grand total.
     * @param {number} [subTotal] - Subtotal.
     * @param {number} [tax] - Tax.
     * @param {number} [shipping] - Shipping.
     * @param {number} [discount] - Discount.
     * @returns {Promise} A Promise that resolves when the order tracking is complete.
     *
     * @example
     * // Track an order
     * trackEcommerceOrder("ORDER123", 69.97, 59.98, 5.00, 4.99, 0);
     */
    trackEcommerceOrder(orderId, grandTotal, subTotal, tax, shipping, discount) {
        if (!orderId) {
            throw new Error('Error: The "orderId" parameter is required for tracking an ecommerce order.');
        }

        if (!this._ecommerceItems || this._ecommerceItems.length === 0) {
            console.warn('No ecommerce items have been added. Call addEcommerceItem before trackEcommerceOrder.');
        } else {
            // Validate each item in the ecommerce cart
            const invalidItems = this._ecommerceItems.filter(item => !item.productSKU);
            if (invalidItems.length > 0) {
                console.warn('Some items in the ecommerce cart are missing required properties (productSKU).');
            }
        }

        return this.track({
            ecommerce_order: 1,
            order_id: orderId,
            revenue: grandTotal,
            subtotal: subTotal,
            tax: tax,
            shipping: shipping,
            discount: discount,
            ec_items: JSON.stringify(this._ecommerceItems || [])
        });
    }

    /**
     * Enables the heart beat timer to accurately measure the time spent on the page.
     *
     * @param {number} [activeTime=15] - Minimum active time in seconds before sending heart beat.
     * @returns {void}
     *
     * @example
     * // Enable heart beat timer with default settings
     * enableHeartBeatTimer();
     *
     * @example
     * // Enable heart beat timer with custom active time
     * enableHeartBeatTimer(30);
     */
    enableHeartBeatTimer(activeTime = 15) {
        this._heartBeatTimer = {
            enabled: true,
            activeTime: activeTime,
            timer: null,
            lastActive: Date.now()
        };

        // Set up event listeners for visibility change and user activity
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', this._handleVisibilityChange.bind(this));
            document.addEventListener('mousemove', this._updateLastActive.bind(this));
            document.addEventListener('keydown', this._updateLastActive.bind(this));
            document.addEventListener('scroll', this._updateLastActive.bind(this));
            document.addEventListener('click', this._updateLastActive.bind(this));
        }

        // Start the timer
        this._startHeartBeatTimer();
    }

    /**
     * Disables the heart beat timer.
     *
     * @returns {void}
     *
     * @example
     * // Disable heart beat timer
     * disableHeartBeatTimer();
     */
    disableHeartBeatTimer() {
        if (this._heartBeatTimer) {
            this._heartBeatTimer.enabled = false;

            // Clear the timer
            if (this._heartBeatTimer.timer) {
                clearInterval(this._heartBeatTimer.timer);
                this._heartBeatTimer.timer = null;
            }

            // Remove event listeners
            if (typeof document !== 'undefined') {
                document.removeEventListener('visibilitychange', this._handleVisibilityChange.bind(this));
                document.removeEventListener('mousemove', this._updateLastActive.bind(this));
                document.removeEventListener('keydown', this._updateLastActive.bind(this));
                document.removeEventListener('scroll', this._updateLastActive.bind(this));
                document.removeEventListener('click', this._updateLastActive.bind(this));
            }
        }
    }

    /**
     * Starts the heart beat timer.
     *
     * @private
     */
    _startHeartBeatTimer() {
        if (this._heartBeatTimer && this._heartBeatTimer.enabled) {
            // Clear any existing timer
            if (this._heartBeatTimer.timer) {
                clearInterval(this._heartBeatTimer.timer);
            }

            // Set up a new timer
            this._heartBeatTimer.timer = setInterval(() => {
                this._checkHeartBeat();
            }, 5000); // Check every 5 seconds
        }
    }

    /**
     * Checks if a heart beat should be sent.
     *
     * @private
     */
    _checkHeartBeat() {
        if (this._heartBeatTimer && this._heartBeatTimer.enabled) {
            const now = Date.now();
            const activeTime = (now - this._heartBeatTimer.lastActive) / 1000; // Convert to seconds

            // If the page is visible and the user has been active for the minimum time
            if (typeof document !== 'undefined' &&
                document.visibilityState === 'visible' &&
                activeTime >= this._heartBeatTimer.activeTime) {

                // Send a heart beat
                this.track({
                    ping: 1
                });

                // Reset the last active time
                this._heartBeatTimer.lastActive = now;
            }
        }
    }

    /**
     * Handles visibility change events.
     *
     * @private
     */
    _handleVisibilityChange() {
        if (typeof document !== 'undefined') {
            if (document.visibilityState === 'visible') {
                // Page is visible, update last active time
                this._updateLastActive();
            } else {
                // Page is hidden, send a heart beat if active for minimum time
                this._checkHeartBeat();
            }
        }
    }

    /**
     * Updates the last active time.
     *
     * @private
     */
    _updateLastActive() {
        if (this._heartBeatTimer) {
            this._heartBeatTimer.lastActive = Date.now();
        }
    }

    /**
     * Enables automatic link tracking.
     *
     * @param {boolean} [trackContent=false] - Whether to track content within links.
     * @returns {void}
     *
     * @example
     * // Enable link tracking
     * enableLinkTracking();
     */
    enableLinkTracking(trackContent = false) {
        this._linkTracking = {
            enabled: true,
            trackContent: trackContent
        };

        // Set up event listeners for link clicks
        if (typeof document !== 'undefined') {
            document.addEventListener('click', this._handleLinkClick.bind(this));
        }
    }

    /**
     * Disables automatic link tracking.
     *
     * @returns {void}
     *
     * @example
     * // Disable link tracking
     * disableLinkTracking();
     */
    disableLinkTracking() {
        if (this._linkTracking) {
            this._linkTracking.enabled = false;

            // Remove event listeners
            if (typeof document !== 'undefined') {
                document.removeEventListener('click', this._handleLinkClick.bind(this));
            }
        }
    }

    /**
     * Handles link click events.
     *
     * @private
     * @param {Event} event - The click event.
     */
    _handleLinkClick(event) {
        if (this._linkTracking && this._linkTracking.enabled) {
            // Find the closest link element
            let target = event.target;
            while (target && target.tagName !== 'A') {
                target = target.parentNode;
            }

            // If a link was found
            if (target && target.tagName === 'A') {
                const href = target.getAttribute('href');
                if (href) {
                    // Check if it's an external link
                    const isExternal = this._isExternalLink(href);

                    // Check if it's a download link
                    const isDownload = target.hasAttribute('download') || this._isDownloadLink(href);

                    if (isExternal) {
                        // Track outbound link
                        this.trackLink({
                            link: href,
                            user_data: {}
                        });
                    } else if (isDownload) {
                        // Track download
                        this.trackDownload({
                            download: href,
                            user_data: {}
                        });
                    }
                }
            }
        }
    }

    /**
     * Checks if a URL is an external link.
     *
     * @private
     * @param {string} url - The URL to check.
     * @returns {boolean} True if the URL is an external link, false otherwise.
     */
    _isExternalLink(url) {
        if (typeof window === 'undefined') return false;

        // If the URL starts with http:// or https:// and doesn't contain the current hostname
        if ((url.startsWith('http://') || url.startsWith('https://')) &&
            url.indexOf(window.location.hostname) === -1) {
            return true;
        }

        return false;
    }

    /**
     * Checks if a URL is a download link.
     *
     * @private
     * @param {string} url - The URL to check.
     * @returns {boolean} True if the URL is a download link, false otherwise.
     */
    _isDownloadLink(url) {
        // Common file extensions for downloads
        const downloadExtensions = [
            // Documents
            'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp',
            // Archives
            'zip', 'rar', 'tar', 'gz', '7z',
            // Media
            'mp3', 'mp4', 'avi', 'mov', 'wmv', 'flv', 'wav',
            // Images
            'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp',
            // Other
            'txt', 'csv', 'json', 'xml'
        ];

        // Check if the URL ends with one of the download extensions
        for (const ext of downloadExtensions) {
            if (url.endsWith('.' + ext) || url.includes('.' + ext + '?')) {
                return true;
            }
        }

        return false;
    }

    /**
     * Sends the tracking data to Kepixel.
     *
     * @param {Object} data - The tracking data.
     * @returns {Promise} A Promise that resolves when the tracking data is sent.
     */
    async track(data) {
        if (!data) return;

        // take a possibly given language and delete it from the data object, as we need to pass it in
        // the headers instead of body params. otherwise it would overwrite the 'Accept-Language' value.
        const lang = data.lang;
        delete data.lang;

        // Validate user_data if present
        if (data.userInfo && !this._validateUserData(data.userInfo)) {
            console.warn('Invalid user_data. It should have at least one of these properties: email, phone, name, id');
        }

        // Check if userId is not set and user_data has email, phone, or id
        if (!this.userId && data.userInfo) {
            if (data.userInfo.email) {
                this.setUserId(data.userInfo.email);
            } else if (data.userInfo.phone) {
                this.setUserId(data.userInfo.phone);
            } else if (data.userInfo.id) {
                this.setUserId(data.userInfo.id);
            }
        }

        // Call identifyUser before processing data.e_n
        // Generate a dynamic timestamp in ISO 8601 format (yyyy-MM-ddTHH:mm:ss.SSSZ)
        const currentTimestamp = new Date().toISOString();

        const identifyPayload = {
            userId: this.userId,
            context: {
                traits: {
                    ...data.userInfo
                },
                library: {
                    name: "http"
                }
            },
            timestamp: currentTimestamp
        };

        // Call identifyUser and don't wait for the response to continue processing
        await this.identifyUser(identifyPayload);

        if (data.e_c) {
            // map event category to Kepixel's event name
            const eventCategoryMap = {
                'product_clicked': 'Product Clicked',
                'product_viewed': 'Product Viewed',
                'product_added': 'Product Added',
                'product_removed': 'Product Removed',
                'cart_viewed': 'Cart Viewed',
                'checkout_started': 'Checkout Started',
                'checkout_step_viewed': 'Checkout Step Viewed',
                'checkout_step_completed': 'Checkout Step Completed',
                'payment_info_entered': 'Payment Info Entered',
                'order_updated': 'Order Updated',
                'order_completed': 'Order Completed',
                'order_refunded': 'Order Refunded',
                'order_cancelled': 'Order Cancelled',
                'coupon_entered': 'Coupon Entered',
                'coupon_applied': 'Coupon Applied',
                'coupon_denied': 'Coupon Denied',
                'coupon_removed': 'Coupon Removed',
                'products_searched': 'Products Searched',
                'product_list_viewed': 'Product List Viewed',
                'product_list_filtered': 'Product List Filtered',
                'product_added_to_wishlist': 'Product Added to Wishlist',
                'product_removed_from_wishlist': 'Product Removed from Wishlist',
                'wishlist_product_added_to_cart': 'Wishlist Product Added to Cart',
                'product_shared': 'Product Shared',
                'cart_shared': 'Cart Shared',
                'promotion_viewed': 'Promotion Viewed',
                'promotion_clicked': 'Promotion Clicked',
                'product_reviewed': 'Product Reviewed',
                'page_loaded': 'Page Loaded',

                'add_to_cart': 'Product Added',
                'search': 'Products Searched',
                'list_view': 'Product List Viewed',
                'view_content': 'Product Viewed',
                'initiate_checkout': 'Checkout Started',
                'add_to_wishlist': 'Product Added to Wishlist',
                'purchase': 'Order Completed',
                'add_payment_info': 'Payment Info Entered',


                'sign_up': 'Sign Up',
                'complete_registration': 'Sign Up',
                'login': 'Login',
                'app_install': 'App Install',
                'download': 'Download',
                'app_open': 'App Open',
                'contact': 'Contact',
                'page_view': 'Page Viewed',
            };

            // Get the event name from the map or use the category as fallback
            const eventName = eventCategoryMap[data.e_c] ?? data.e_c;

            if (!eventName) {
                console.warn('KepixelTracker: Invalid event category:', data.e_c);
                return;
            }
            let bodyObj = {
                "userId": this.userId,
                "event": eventName,
                "properties": e.e_n,
                "traits": {
                    ...data.userInfo
                },
                "context": {
                    "library": {
                        "name": "http"
                    }
                },
                "timestamp": currentTimestamp
            }
            const fetchObj = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.encodedAppId}`,
                },
                body: JSON.stringify(bodyObj)
            };

            return fetch(`${this.trackerUrl}/v1/track`, fetchObj)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }

                    this.log && console.log('Kepixel identify call sent:', this.trackerUrl, fetchObj);

                    return response;
                })
                .catch((error) => {
                    this.log && console.log('Kepixel track call failed:', this.trackerUrl, fetchObj);

                    console.warn('Kepixel track error:', error);

                    return error;
                });
        }

        let body = {
            appid: this.appId,
            rec: 1,
            apiv: 1,
            ...(this.userId ? {uid: this.userId} : {}),
            send_image: 0,
            ...data
        };

        const encodedData = Object.entries(body)
            .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
            .join('&');

        const fetchObj = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Language': "en",
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: encodedData
        };
        let url = new URLSearchParams({
            send_image: 0,
            appid: this.appId,
            rec: 1,
            apiv: 1,
        }).toString()

        return fetch(`${this.trackerUrl}?${url}`, fetchObj)
            .then((response) => {
                console.log("RESPONSE TRACK", response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                this.log && console.log('Kepixel tracking is sent:', this.trackerUrl, fetchObj);

                return response;
            })
            .catch((error) => {
                console.log("ERROR TRACK", error);
                if (error?.response) {
                    console.log("ERROR TRACK res", error?.response);
                }
                console.log(" this.trackerUrl TRACK", this.trackerUrl);
                console.log(" fetchObj TRACK", fetchObj);

                this.log && console.log('Kepixel tracking is not sent:', this.trackerUrl, fetchObj);

                console.warn('Kepixel tracking error:', error);

                return error;
            });
    }
}

export default KepixelTracker;
