import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Dragoturkey - #1 E-trade Marketplace';
    }
  }, [title]);
};

export default useDocumentTitle;
