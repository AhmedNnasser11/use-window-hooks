
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

### 3. `useMousePosition`

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

### 4. `useWindowFocus`

**Purpose**: Detect whether the browser window is currently focused.

**Example Usage:**

```typescript
import { useWindowFocus } from 'use-window-hooks';

const MyComponent = () => {
  const isWindowFocused = useWindowFocus();

  return <div>Window is {isWindowFocused ? 'focused' : 'not focused'}</div>;
};
```

### 5. `useIsMounted`

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

### 6. `useIsFirstRender`

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

### 7. `useWindowScroll`

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

### 8. `useWindowUrl`

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
