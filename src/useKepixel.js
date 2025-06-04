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
            trackLead: (params) => instance.trackLead && instance.trackLead(params),
            trackViewContent: (params) => instance.trackViewContent && instance.trackViewContent(params),
            trackCompleteRegistration: (params) => instance.trackCompleteRegistration && instance.trackCompleteRegistration(params),
            trackSearch: (params) => instance.trackSearch && instance.trackSearch(params),
            trackInitiateCheckout: (params) => instance.trackInitiateCheckout && instance.trackInitiateCheckout(params),
            trackAddPaymentInfo: (params) => instance.trackAddPaymentInfo && instance.trackAddPaymentInfo(params),
            trackSignUp: (params) => instance.trackSignUp && instance.trackSignUp(params),
            trackStartCheckout: (params) => instance.trackStartCheckout && instance.trackStartCheckout(params),
            trackPageView: (params) => instance.trackPageView && instance.trackPageView(params),
            trackListView: (params) => instance.trackListView && instance.trackListView(params),
            trackAddToWishlist: (params) => instance.trackAddToWishlist && instance.trackAddToWishlist(params),
            trackAppOpen: (params) => instance.trackAppOpen && instance.trackAppOpen(params),
            trackAppInstall: (params) => instance.trackAppInstall && instance.trackAppInstall(params),
            trackContact: (params) => instance.trackContact && instance.trackContact(params),
            trackCustomizeProduct: (params) => instance.trackCustomizeProduct && instance.trackCustomizeProduct(params),
            trackDonate: (params) => instance.trackDonate && instance.trackDonate(params),
            trackFindLocation: (params) => instance.trackFindLocation && instance.trackFindLocation(params),
            trackSchedule: (params) => instance.trackSchedule && instance.trackSchedule(params),
            trackStartTrial: (params) => instance.trackStartTrial && instance.trackStartTrial(params),
            trackSubmitApplication: (params) => instance.trackSubmitApplication && instance.trackSubmitApplication(params),
            trackSubscribe: (params) => instance.trackSubscribe && instance.trackSubscribe(params),
            trackInstall: (params) => instance.trackInstall && instance.trackInstall(params),
            trackSendConversion: (params) => instance.trackSendConversion && instance.trackSendConversion(params),
            trackConversionAdjustment: (params) => instance.trackConversionAdjustment && instance.trackConversionAdjustment(params),
            trackLogin: (params) => instance.trackLogin && instance.trackLogin(params),
            trackTutorialBegin: (params) => instance.trackTutorialBegin && instance.trackTutorialBegin(params),
            trackJoinGroup: (params) => instance.trackJoinGroup && instance.trackJoinGroup(params),
            trackQualifiedLead: (params) => instance.trackQualifiedLead && instance.trackQualifiedLead(params),
            trackCustomEvent: (params) => instance.trackCustomEvent && instance.trackCustomEvent(params),
            setUserId: (userId) => instance.setUserId && instance.setUserId(userId),
            setAppId: (appId) => instance.setAppId && instance.setAppId(appId),
        }),
        [instance]
    );
};

export default useKepixel;
