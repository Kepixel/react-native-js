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
            trackSiteSearch: (params) => instance.trackSiteSearch && instance.trackSiteSearch(params),
            trackLink: (params) => instance.trackLink && instance.trackLink(params),
            trackDownload: (params) => instance.trackDownload && instance.trackDownload(params),
            setUserId: (userId) => instance.setUserId && instance.setUserId(userId),
            setAppId: (appId) => instance.setAppId && instance.setAppId(appId),
        }),
        [instance]
    );
};

export default useKepixel;
