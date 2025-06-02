import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BbbPluginSdk,
  GenericContentMainArea,
  PluginApi,
  GenericContentSidekickArea,
  GraphqlResponseWrapper,
  CurrentUserData,
} from 'bigbluebutton-html-plugin-sdk';
import { HocuspocusProvider } from '@hocuspocus/provider';

import GenericComponentLinkShare from '../generic-component/component';

import { SuiteNumeriqueDocsIntegrationProps } from './types';
import { DOCS_AREA, REGEX } from './constants';

function SuiteNumeriqueDocsIntegration(
  { pluginUuid: uuid, pluginBaseUrl }: SuiteNumeriqueDocsIntegrationProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const [documentUrl, setDocumentUrl] = useState('');
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const { data: user }: GraphqlResponseWrapper<CurrentUserData> = pluginApi.useCurrentUser();

  const renderDocsInArea = (
    area: DOCS_AREA,
    open: boolean,
    currentUser: CurrentUserData,
    provider: HocuspocusProvider,
  ) => {
    if (area === DOCS_AREA.MAIN_AREA) {
      pluginApi.setGenericContentItems([]);
      pluginApi.setGenericContentItems([
        new GenericContentMainArea({
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <GenericComponentLinkShare
                link={documentUrl}
                renderArea={DOCS_AREA.MAIN_AREA}
                hocuspocusProvider={provider}
                user={currentUser}
                switchGenericContentArea={
                  () => renderDocsInArea(DOCS_AREA.SIDEKICK_AREA, true, currentUser, provider)
                }
              />,
            );
            return root;
          },
        }),
      ]);
    } else {
      pluginApi.setGenericContentItems([]);
      pluginApi.setGenericContentItems([
        new GenericContentSidekickArea({
          name: 'Docs',
          section: 'Document',
          buttonIcon: 'file',
          open,
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <GenericComponentLinkShare
                link={documentUrl}
                hocuspocusProvider={provider}
                renderArea={DOCS_AREA.SIDEKICK_AREA}
                user={currentUser}
                switchGenericContentArea={
                  () => renderDocsInArea(DOCS_AREA.MAIN_AREA, false, currentUser, provider)
                }
              />,
            );
            return root;
          },
        }),
      ]);
    }
  };

  useEffect(() => {
    const docsDocumentFromPluginUrl = pluginBaseUrl.search.replace('?docsUrl=', '');
    if (docsDocumentFromPluginUrl) {
      setDocumentUrl(docsDocumentFromPluginUrl);
    }
  }, []);

  useEffect(() => {
    if (documentUrl.match(REGEX) && user) {
      // Hardcoded settings for demo purposes
      const USER_ID = user.extId;
      const USER_ROLE: 'COMMENT-ONLY' | 'READ-WRITE' = 'READ-WRITE';
      const DOCUMENT_ID = 'mydoc123';
      const TOKEN = `${USER_ID}__${USER_ROLE}`;

      const provider = new HocuspocusProvider({
        url: 'wss://bbb30.bbb.imdt.dev/hocuspocus/hocuspocus',
        token: TOKEN,
        name: DOCUMENT_ID,
      });
      renderDocsInArea(DOCS_AREA.SIDEKICK_AREA, false, user, provider);
    } else {
      pluginApi.setGenericContentItems([]);
    }
  }, [documentUrl, user]);
  return null;
}

export default SuiteNumeriqueDocsIntegration;
