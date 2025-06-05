import {useContext, useMemo} from 'react';

import {KepixelContext} from './KepixelProvider';

const useKepixel = () => {
    const instance = useContext(KepixelContext);

    return useMemo(
        () => ({
            trackAppStart: (params) => instance.trackAppStart && instance.trackAppStart(params),
            trackScreenView: (params) => instance.trackScreenView && instance.trackScreenView(params),
            trackAction: (params) => instance.trackAction && instance.trackAction(params),
            trackEvent: (params) => instance.trackEvent && instance.trackEvent(params),
            trackLink: (params) => instance.trackLink && instance.trackLink(params),
            trackDownload: (params) => instance.trackDownload && instance.trackDownload(params),
            trackPurchase: (params) => instance.trackPurchase && instance.trackPurchase(params),
            trackAddToCart: (params) => instance.trackAddToCart && instance.trackAddToCart(params),
            trackViewContent: (params) => instance.trackViewContent && instance.trackViewContent(params),
            trackCompleteRegistration: (params) => instance.trackCompleteRegistration && instance.trackCompleteRegistration(params),
            trackSearch: (params) => instance.trackSearch && instance.trackSearch(params),
            trackInitiateCheckout: (params) => instance.trackInitiateCheckout && instance.trackInitiateCheckout(params),
            trackAddPaymentInfo: (params) => instance.trackAddPaymentInfo && instance.trackAddPaymentInfo(params),
            trackSignUp: (params) => instance.trackSignUp && instance.trackSignUp(params),
            trackPageView: (params) => instance.trackPageView && instance.trackPageView(params),
            trackListView: (params) => instance.trackListView && instance.trackListView(params),
            trackAddToWishlist: (params) => instance.trackAddToWishlist && instance.trackAddToWishlist(params),
            trackAppOpen: (params) => instance.trackAppOpen && instance.trackAppOpen(params),
            trackAppInstall: (params) => instance.trackAppInstall && instance.trackAppInstall(params),
            trackContact: (params) => instance.trackContact && instance.trackContact(params),
            trackLogin: (params) => instance.trackLogin && instance.trackLogin(params),
            trackCustomEvent: (params) => instance.trackCustomEvent && instance.trackCustomEvent(params),
            setUserId: (userId) => instance.setUserId && instance.setUserId(userId),
            setAppId: (appId) => instance.setAppId && instance.setAppId(appId),
        }),
        [instance]
    );
};

export default useKepixel;
