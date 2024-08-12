
# Custom React Hook Package

## Overview

This package provides a custom React hook for managing element references and history states within your React applications. The hooks are built using TypeScript, ensuring type safety and reusability across projects.

## Installation

To install the package, use npm or yarn:

```bash
npm install your-package-name
```

or

```bash
yarn add your-package-name
```

## Usage

### Example: Using the `useElement` Hook

This hook allows you to easily manage references to DOM elements and check if they are mounted.

```typescript
import React, { useEffect } from 'react';
import { useElement } from 'your-package-name';

const MyComponent = () => {
  const { elementRef, elementData } = useElement<HTMLDivElement>();

  useEffect(() => {
    if (elementData) {
      console.log('Element is mounted:', elementData.current);
    } else {
      console.log('Element is not mounted.');
    }
  }, [elementData]);

  return <div ref={elementRef}>Hello World</div>;
};

export default MyComponent;
```

### Example: Using the `useUrlHistory` Hook

This hook tracks URL changes and maintains a history of visited paths.

```typescript
import React from 'react';
import { useUrlHistory } from 'your-package-name';

const MyComponent = () => {
  const { history, previousPath, clearUrlHistory } = useUrlHistory();

  return (
    <div>
      <p>Current History: {history.join(', ')}</p>
      <p>Previous Path: {previousPath}</p>
      <button onClick={clearUrlHistory}>Clear History</button>
    </div>
  );
};

export default MyComponent;
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This package is licensed under the MIT License.
