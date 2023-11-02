import classNames from 'classnames';
import { ListIcon } from 'common/assets';
import { ActionIcon } from 'components/elements/button';
import Image from 'next/image';
import * as React from 'react';

import { headerStyles } from './style.css';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header(props: HeaderProps) {
  const { className, setIsNavOpen, isNavOpen, ...rest } = props;
  return (
    <header {...rest} className={classNames(headerStyles.container, className)}>
      <div className={headerStyles.leftContainer}>
        <div>
          <ActionIcon
            children={(size) => <ListIcon size={size} />}
            variant="transparent"
            onClick={() => setIsNavOpen((prev) => !prev)}
          />
        </div>
        <div className={headerStyles.logoContainer}>
          <Image src="/admin/static/images/logo.svg" fill alt="logo" />
        </div>
      </div>
    </header>
  );
}
