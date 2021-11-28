import * as React from 'react';

const useInsertSpacer = (children: React.ReactNode) => {
  if (Array.isArray(children)) {
    // insert spacer between each child
    return children.reduce((acc, child, index) => {
      if (index !== 0) {
        // todo: add Spacer component
        acc.push(React.createElement('div', { key: `spacer-${index}` }, ' '));
      }
      acc.push(child);
      return acc;
    }, []);
  }

  return children;
};

export default useInsertSpacer;
