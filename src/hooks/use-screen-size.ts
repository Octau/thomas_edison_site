import { useEffect, useState } from 'react';

const getScreenSize = {
  isXSmall: false,
  isSmall: false,
  isMedium: false,
  isLarge: false,
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const xSmallMedia = window?.matchMedia('(max-width: 599.99px)');
      const smallMedia = window?.matchMedia(
        '(min-width: 600px) and (max-width: 959.99px)',
      );
      const mediumMedia = window?.matchMedia(
        '(min-width: 960px) and (max-width: 1279.99px)',
      );
      const largeMedia = window?.matchMedia('(min-width: 1280px)');
      const onSizeChanged = () => {
        setScreenSize({
          isXSmall: xSmallMedia.matches,
          isSmall: smallMedia.matches,
          isMedium: mediumMedia.matches,
          isLarge: largeMedia.matches,
        });
      };

      window.addEventListener('resize', onSizeChanged);

      return () => {
        window.removeEventListener('resize', onSizeChanged);
      };
    }
  }, []);

  return screenSize;
};
