
# React Browser Window Hooks Package

## Author

[Connect with me on LinkedIn](https://www.linkedin.com/in/ahmed-nasser-931490212/)

## Overview

This package provides a powerful collection of custom React hooks specifically designed for managing various browser window-related states in your React applications. Whether you need to track the scroll position, monitor window focus, or handle media queries, this package offers a comprehensive set of tools to enhance your development process.

## Installation

Install the package using npm or yarn:

```bash
npm install use-window-hooks
```

or

```bash
yarn add use-window-hooks
```

## Usage

To get started with this package, simply import the hooks you need into your React components.


## Available Hooks

### 1. `useUrlHistory`

**Purpose**: Manage and track the history of URLs visited within the application using sessionStorage.

**Parameters and Return Values:**
- **`history`**: An array of strings representing the URLs visited.
- **`previousPath`**: A string representing the previous URL path.
- **`clearUrlHistory`**: A function to clear the stored URL history.
- **`getUrlHistory`**: A function to retrieve the current history array.

**Example Usage:**

to track and store the URL history, you should call `useUrlHistory` in your layout component or app wrapper. This will initialize and store the history throughout the app lifecycle.

### Example Setup:

```typescript
import { useUrlHistory } from 'use-window-hooks';

const AppLayout = ({ children }) => {
  // Initialize URL history tracking
  const { history, previousPath } = useUrlHistory();

  return (
    <div>
      <header>Your Header</header>
      <main>{children}</main>
      <footer>Your Footer</footer>
    </div>
  );
};

export default AppLayout;
```

### Example App Wrapper:

```typescript
import AppLayout from './AppLayout';

const App = () => {
  return (
    <AppLayout>
      {/* Your app routes and components */}
    </AppLayout>
  );
};

export default App;
```
then import `useHistory` in any component to get the url history

```typescript
import { useUrlHistory } from 'use-window-hooks';

const MyComponent = () => {
  const { history, previousPath, clearUrlHistory, getUrlHistory } = useUrlHistory();

  return (
    <div>
      <p>Current History: {history.join(', ')}</p>
      <p>Previous Path: {previousPath}</p>
      <button onClick={clearUrlHistory}>Clear History</button>
      <button onClick={() => console.log(getUrlHistory())}>Get History</button>
    </div>
  );
};
```

### 2. `useMediaQuery`

**Purpose**: Track and respond to media queries, such as screen sizes, in real-time.

**Parameters and Return Values:**
- **`queries`**: An object where each key is a descriptive name for the query, and each value is a media query string.
- **`results`**: An object where each key corresponds to the name of the query and the value is a boolean indicating if the query matches.
- **`matchQuery`**: A function that takes a new media query object and returns a similar results object.

**Example Usage:**

```typescript
import { useMediaQuery } from 'use-window-hooks';

const MyComponent = () => {
  const { results, matchQuery } = useMediaQuery({
    isSmallScreen: '(max-width: 600px)',
    isMediumScreen: '(max-width: 800px)',
  });

  const newResults = matchQuery({
    isLargeScreen: '(min-width: 1200px)',
  });

  return (
    <div>
      <p>Is Small Screen: {results.isSmallScreen ? 'Yes' : 'No'}</p>
      <p>Is Medium Screen: {results.isMediumScreen ? 'Yes' : 'No'}</p>
      <p>Is Large Screen: {newResults.isLargeScreen ? 'Yes' : 'No'}</p>
    </div>
  );
};
```

### 3. `useOnScreen`

**Purpose**: Track the visibility of an element or a list of elements on the screen, including if they were ever visible.

**Parameters and Return Values:**
- **`ref`**: A React ref object for a single element or a list of elements.
- **`options`**: An optional object for specifying the `rootMargin`.
- **`visibilityStates`**: An array or map of objects indicating whether each element is currently visible and if it has ever been visible.

**Example Usage (Single Element):**

```typescript
import React, { useRef } from 'react';
import { useOnScreen } from 'use-window-hooks';

const MySingleComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const visibilityStates = useOnScreen(ref, { rootMargin: '-50px' });
  const visibilityState = visibilityStates.get('default')!;

  return (
    <div>
        {visibilityState?.hasBeenVisible
          ? 'This element has been visible at least once.'
          : 'This element has not been visible yet.'}
      <div style={{ height: '100vh' }}>Scroll down to see the element</div>
    
      <div
        ref={ref}
        style={{
          height: '100px',
          backgroundColor: visibilityState?.isIntersecting ? 'green' : 'red',
        }}
      >
        {visibilityState?.isIntersecting ? 'In View' : 'Out of View'}
      </div>
      <div style={{ height: '100vh' }}>Scroll more to trigger out of view</div>
      <div>
        {visibilityState?.hasBeenVisible
          ? 'This element has been visible at least once.'
          : 'This element has not been visible yet.'}
      </div>
    </div>
  );
};

export default MySingleComponent;
```

**Example Usage (List of Elements with Unique IDs):**

```typescript
import React, { useRef } from 'react';
import { useOnScreen } from 'use-window-hooks';

const MyListComponent: React.FC = () => {
  const refMap = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const visibilityStates = useOnScreen(refMap, { rootMargin: '-50px' });

  const items = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
    { id: 'item-5', content: 'Item 5' },
  ];

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {visibilityStates.get(item.id)?.hasBeenVisible
            ? `${item.content} has been visible at least once.`
            : `${item.content} has not been visible yet.`}
        </div>
      ))}
      <div style={{ height: '100vh' }}>Scroll down to see the elements</div>
      
      {items.map((item) => (
        <div
          key={item.id}
          data-id={item.id}
          ref={(el) => {
            refMap.current.set(item.id, el);
          }}
          style={{
            height: '100px',
            backgroundColor: visibilityStates.get(item.id)?.isIntersecting ? 'green' : 'red',
            margin: '10px 0',
          }}
        >
          {visibilityStates.get(item.id)?.isIntersecting
            ? `${item.content} In View`
            : `${item.content} Out of View`}
        </div>
      ))}
      <div style={{ height: '100vh' }}>Scroll more to trigger out of view</div>
      {items.map((item) => (
        <div key={item.id}>
          {visibilityStates.get(item.id)?.hasBeenVisible
            ? `${item.content} has been visible at least once.`
            : `${item.content} has not been visible yet.`}
        </div>
      ))}
    </div>
  );
};

export default MyListComponent;
```

### 4. `useMousePosition`

**Purpose**: Track the mouse's position on the screen in real-time.

**Example Usage:**

```typescript
import { useMousePosition } from 'use-window-hooks';

const MyComponent = () => {
  const { x, y } = useMousePosition();

  return (
    <div>
      Mouse Position: ({x}, {y})
    </div>
  );
};
```

### 5. `useWindowFocus`

**Purpose**: Detect whether the browser window is currently focused.

**Example Usage:**

```typescript
import { useWindowFocus } from 'use-window-hooks';

const MyComponent = () => {
  const isWindowFocused = useWindowFocus();

  return <div>Window is {isWindowFocused ? 'focused' : 'not focused'}</div>;
};
```

### 6. `useIsMounted`

**Purpose**: Track whether a component is mounted to avoid performing state updates on unmounted components.

**Example Usage:**

```typescript
import { useIsMounted } from 'use-window-hooks';

const MyComponent = () => {
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      // Perform actions only if the component is mounted
    }
  }, [isMounted]);

  return <div>Component Content</div>;
};
```

### 7. `useIsFirstRender`

**Purpose**: Detect if the current render is the first render of the component.

**Example Usage:**

```typescript
import { useIsFirstRender } from 'use-window-hooks';

const MyComponent = () => {
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) {
      // Execute code only on the first render
    }
  }, []);

  return <div>Component Content</div>;
};
```

### 8. `useWindowScroll`

**Purpose**: Track the scroll position of the browser window.

**Example Usage:**

```typescript
import { useWindowScroll } from 'use-window-hooks';

const MyComponent = () => {
  const { x, y } = useWindowScroll();

  return (
    <div>
      Scroll Position: ({x}, {y})
    </div>
  );
};
```

### 9. `useWindowUrl`

**Purpose**: Retrieve the current browser window URL.

**Example Usage:**

```typescript
import { useWindowUrl } from 'use-window-hooks';

const MyComponent = () => {
  const url = useWindowUrl();

  return <div>Current URL: {url?.href}</div>;
};
```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This package is licensed under the MIT License.
