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
} from '../DTO';

class KepixelTracker {
    constructor(userOptions) {
        if (!userOptions.appId) {
            throw new Error('appId is required for Kepixel tracking.');
        }

        this.initialize(userOptions);
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

    setAppId(appId) {
        this.appId = appId;
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
     * @param {string} options.name - The title of the screen being tracked. Use slashes (/) to set one or several categories for this screen. For example, 'Help / Feedback' will create the Action 'Feedback' in the category 'Help'.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'name' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the screen view tracking is complete.
     *
     * @example
     * // Tracking a screen view without user information
     * trackScreenView({ name: 'Home' });
     *
     * @example
     * // Tracking a screen view with additional user information
     * trackScreenView({ name: 'Product Details', user_data: { uid: '123456' } });
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
     * @param {string} options.name - The title of the action being tracked. Use slashes (/) to set one or several categories for this action. For example, 'Help / Feedback' will create the Action 'Feedback' in the category 'Help'.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'name' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the action tracking is complete.
     *
     * @example
     * // Tracking a custom action without user information
     * trackAction({ name: 'ButtonClick' });
     *
     * @example
     * // Tracking a custom action with additional user information
     * trackAction({ name: 'AddToCart', user_data: { uid: '123456'} });
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
     * This method is used to record specific events in your application, providing insights into user interactions.
     *
     * @param {Object} options - Options for tracking the event.
     * @param {string} options.category - The event category. Must not be empty. (e.g., Videos, Music, Games...)
     * @param {string} options.action - The event action. Must not be empty. (e.g., Play, Pause, Duration, Add Playlist, Downloaded, Clicked...)
     * @param {string} [options.name] - The event name. (e.g., a Movie name, or Song name, or File name...)
     * @param {number|float} [options.value] - The event value. Must be a float or integer value (numeric), not a string.
     * @param {string} [options.campaign] - The event related campaign.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'category' or 'action' parameters are not provided.
     * @returns {Promise} A Promise that resolves when the event tracking is complete.
     *
     * @example
     * // Tracking a basic event without additional information
     * trackEvent({ category: 'Videos', action: 'Play' });
     *
     * @example
     * // Tracking an event with a name and user information
     * trackEvent({ category: 'Music', action: 'Pause', name: 'FavoriteSong', user_data: { uid: '123456'} });
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
     * This method is used to record user interactions when clicking on external links, providing insights into user navigation patterns.
     *
     * @param {Object} options - Options for tracking the link click.
     * @param {string} options.link - An external URL the user has opened. Used for tracking outlink clicks.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'link' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the link click tracking is complete.
     *
     * @example
     * // Tracking a link click without additional information
     * trackLink({ link: 'https://external-site.com' });
     *
     * @example
     * // Tracking a link click with user information
     * trackLink({ link: 'https://external-site.com', user_data: { userId: '123456', userRole: 'visitor' } });
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
     * This method is used to record user interactions when downloading files, providing insights into user engagement with downloadable content.
     *
     * @param {Object} [options={}] - Options for tracking the download.
     * @param {string} options.download - URL of a file the user has downloaded. Used for tracking downloads.
     * @param {Object} [options.user_data={}] - Optional data used for tracking different user information.
     * @throws {Error} Throws an error if the 'download' parameter is not provided.
     * @returns {Promise} A Promise that resolves when the download tracking is complete.
     *
     * @example
     * // Tracking a file download without additional information
     * trackDownload({ download: 'https://example.com/files/document.pdf' });
     *
     * @example
     * // Tracking a file download with user information
     * trackDownload({ download: 'https://example.com/files/image.png', user_data: { uid: '123456' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackPurchase({ user_data: { value: 100, currency: 'USD', order_id: 'order123' } });
     */
    trackPurchase(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new PurchaseEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items,
                order_id: event.order_id,
                description: event.description
            }),
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
     * trackAddToCart({ user_data: { value: 50, currency: 'USD', content_ids: ['prod123'] } });
     */
    trackAddToCart(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new AddToCartEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items,
                description: event.description
            }),
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
     * trackViewContent({ user_data: { content_ids: ['prod123'], content_type: 'product' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                id: event.id,
                name: event.name,
                currency: event.currency,
                type: event.type,
                value: event.value
            }),
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
     * trackCompleteRegistration({ user_data: { content_name: 'Account Creation' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackSearch({ user_data: { search_string: 'shoes' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                search_string: event.search_string
            }),
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
     * trackInitiateCheckout({ user_data: { value: 100, currency: 'USD', content_ids: ['prod123'] } });
     */
    trackInitiateCheckout(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new InitiateCheckoutEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items
            }),
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
     * trackAddPaymentInfo({ user_data: { value: 100, currency: 'USD' } });
     */
    trackAddPaymentInfo(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new AddPaymentInfoEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                value: event.value,
                currency: event.currency,
                items: event.items
            }),
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
     * trackSignUp({ user_data: { content_name: 'Newsletter Signup' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackPageView({ user_data: { page_url: 'https://example.com/home' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                id: event.id,
                name: event.name,
                category: event.category,
                type: event.type
            }),
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
     * trackListView({ user_data: { content_ids: ['prod123', 'prod456'] } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                id: event.id,
                name: event.name,
                category: event.category,
                type: event.type
            }),
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
     * trackAddToWishlist({ user_data: { content_ids: ['prod123'] } });
     */
    trackAddToWishlist(options = {}) {
        const {user_data, source, campaign, custom_data, ...rest} = options;
        const event = new AddToWishlistEvent({
            ...rest,
            source,
            user_data: user_data,
            custom_data
        });
        return this.trackEvent({
            category: event.event_name,
            action: event.event_name,
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data,
                items: event.items
            }),
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
     * trackAppOpen({ user_data: { app_version: '1.0.0' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackAppInstall({ user_data: { device_model: 'iPhone 13' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackContact({ user_data: { contact_method: 'email' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackLogin({ user_data: { method: 'email' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
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
     * trackCustomEvent({ user_data: { custom_param: 'value' } });
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
            name: event.event_name,
            value: JSON.stringify({
                campaign: campaign,
                user_data: user_data,
                source: source,
                custom_data: custom_data
            }),
            campaign: campaign,
            user_data: user_data,
            source: source,
            custom_data: custom_data
        });
    }

    /**
     * Sends the tracking data to Kepixel.
     *
     * @param {Object} data - The tracking data.
     * @returns {Promise} A Promise that resolves when the tracking data is sent.
     */
    track(data) {
        if (!data) return;

        // take a possibly given language and delete it from the data object, as we need to pass it in
        // the headers instead of body params. otherwise it would overwrite the 'Accept-Language' value.
        const lang = data.lang;
        delete data.lang;

        const fetchObj = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Language': "en",
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                appid: this.appId,
                rec: 1,
                apiv: 1,
                ...(this.userId ? {uid: this.userId} : {}),
                send_image: 0,
                ...data
            }).toString()
        };
        return fetch(this.trackerUrl, fetchObj)
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
