import { Button } from 'components/elements/button';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import { NavigationContextMenuPoint } from './navigation';
import { navigationStyle } from './style.css';

interface Props {
  contextMenuPoint: NavigationContextMenuPoint;
  setContextMenuPoint: React.Dispatch<
    React.SetStateAction<NavigationContextMenuPoint>
  >;
  onCloseAllTabs: () => void;
  onCloseOtherTabs: (key: string) => void;
  onCloseTab: (key?: string | undefined) => void;
}
enum ContextMenuOptionEnum {
  closeAll,
  closeOther,
  close,
}
interface ItemType {
  label: string;
  type: ContextMenuOptionEnum;
}

export default function NavigationContextMenu(props: Props) {
  const { t } = useTranslation();
  const {
    contextMenuPoint: point,
    setContextMenuPoint: setPoint,
    onCloseAllTabs,
    onCloseOtherTabs,
    onCloseTab,
  } = props;

  const OPTIONS = React.useMemo<ItemType[]>(() => {
    return [
      {
        type: ContextMenuOptionEnum.close,
        label: t('navigation:close_tab'),
      },
      {
        type: ContextMenuOptionEnum.closeOther,
        label: t('navigation:close_other_tabs'),
      },
      {
        type: ContextMenuOptionEnum.closeAll,
        label: t('navigation:close_all_tabs'),
      },
    ];
  }, [t]);

  const handleItemSelect = React.useCallback(
    (props: {
      item: ItemType;
      event?:
        | React.SyntheticEvent<HTMLElement, Event>
        | KeyboardEvent
        | undefined;
    }) => {
      switch (props.item.type) {
        case ContextMenuOptionEnum.close:
          onCloseTab(point?.key);
          break;
        case ContextMenuOptionEnum.closeAll:
          onCloseAllTabs();
          break;
        case ContextMenuOptionEnum.closeOther:
          onCloseOtherTabs(point?.key || '');
          break;
      }
    },
    [onCloseAllTabs, onCloseOtherTabs, onCloseTab, point?.key],
  );

  const handleContextMenuUnderlying = React.useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      await setPoint(undefined);

      const ev = new MouseEvent('contextmenu', {
        clientX: e.pageX,
        clientY: e.pageY,
        bubbles: true,
      });
      const el = document.elementFromPoint(e.pageX, e.pageY);
      el?.dispatchEvent(ev);
    },
    [setPoint],
  );
  if (!point) return null;
  return (
    <div
      className={navigationStyle.overlayContainer}
      onClick={() => setPoint(undefined)}
      onContextMenu={handleContextMenuUnderlying}
    >
      <div
        style={{
          position: 'absolute',
          top: point.y,
          left: point.x,
        }}
        className={navigationStyle.popover}
      >
        {/** TODO: FIND SUITABLE MENU DROPDOWN */}
        {/* <StatefulMenu items={OPTIONS} onItemSelect={handleItemSelect} /> */}
        {OPTIONS.map((item) => (
          <Button
            variant="tertiary"
            onClick={(event) => handleItemSelect({ item, event })}
            className={navigationStyle.actionButton}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
