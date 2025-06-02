import * as React from 'react';
import { DOCS_AREA } from '../suite-numerique-docs-integration/constants';
import { ButtonIcon } from './button-icon/component';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';

interface GenericComponentLinkShareProps {
  link: string;
  user: CurrentUserData;
  switchGenericContentArea: () => void;
  hocuspocusProvider: HocuspocusProvider;
  renderArea: DOCS_AREA;
}

function GenericComponentLinkShare(props: GenericComponentLinkShareProps): React.ReactElement {
  const {
    link,
    user,
    switchGenericContentArea,
    renderArea,
    hocuspocusProvider,
  } = props;

  const editor = useCreateBlockNote({
    collaboration: {
      provider: hocuspocusProvider,
      fragment: hocuspocusProvider.document.getXmlFragment('doc'),
      user: {
        name: user.name,
        color: '#ff0000',
      },
    },
    resolveUsers: async (userIds) => userIds.map((userId) => ({
      id: userId,
      username: user.name,
      avatarUrl: 'https://placehold.co/100x100',
    })),
  });

  const changeAreaButtonStyle: React.CSSProperties = {
    zIndex: 1000,
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 4,
    transition: 'background-color 0.2s',
  };

  let tooltipButton;
  if (renderArea === DOCS_AREA.SIDEKICK_AREA) {
    tooltipButton = 'Pin in main area';
    changeAreaButtonStyle.top = 8;
    changeAreaButtonStyle.right = 8;
  } else {
    tooltipButton = 'Send back to sidebar';
    changeAreaButtonStyle.bottom = 8;
    changeAreaButtonStyle.left = 8;
  }
  return (
    <div
      style={{
        background: 'white',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <button
        onClick={switchGenericContentArea}
        type="button"
        title={tooltipButton}
        style={changeAreaButtonStyle}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <ButtonIcon
          size={18}
          currentArea={renderArea}
        />
      </button>
      <BlockNoteView
        editor={editor}
        theme="light"
      />
    </div>
  );
}

export default GenericComponentLinkShare;
