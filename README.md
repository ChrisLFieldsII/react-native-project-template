# React Native Project Structure Template

This template is useful for starting out w/ a scalable react native project.

## Dependencies

- [React Navigation](https://reactnavigation.org/): routing and navigation
- [zustand](https://github.com/pmndrs/zustand): local state management
- [react-query](https://github.com/tanstack/query): Hooks for fetching, caching and updating asynchronous data in React
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#installation): icons
- [storybook](https://storybook.js.org/): component driven development ftw!

## File Naming Conventions

Some files use a `<filename>.<type>.<extension>` format to help devs know exactly what the file is for. Similar to how Storybook uses `.stories` to recognize a story and testing frameworks like jest uses `.test` to know which files are tests.

- `.utils` - these files house utility functions
- `.types` - these files house type definitions
- `.api` - these files house async functions that retrieve data from apis
- `.state` - houses logic for local state w/ zustand (or whichever state management solution you choose)

## Source code

### Modules

The source code is composed of `modules`, just like the rest of the JS ecosystem!

Modules consist of:

- components
- screens
- utilities (aka utils)
- hooks
- types
- state
- api
- constants
- etc!

At the root of each module is an `index.ts` file that exports the modules contents.

> So what is a `module`? A module encapsulates all of the complex functionality for a domain in the app like cart, home, account, search, orders, etc and exports it with a nice simple/easy to use API to plug-and-play in the app. The reason to develop an app in modules is you can focus on building the blocks in isolation that will eventually come together to build a beautiful app. This helps create cleaner, more maintainable code.

This template is composed of a few modules to get you started. You may need to remove/add according to your requirements.

- `common` - This module contains common code that is shared across the whole project and other modules. Think your components like `buttons`, `text`, etc. Any generic utilities or types, etc. Your main `api` instance.
  - the `common` module already exports some of the `react-native` components. We wrap and re-export them to control their look throughout the app in one place! If we imports these components like `View, Text, Button, etc` directly from `react-native` everywhere, it will make it hard to do things like implement dark mode or change the font later.
- `navigation` - This module pulls together all apps different screens to build a `Navigator`
- `env` - This module contains code to configure app environments. `react-native-dotenv` is used to load env vars from `.env` file.
  - We use one `.env` file w/ prefixes for each env type (dev|stage|prod) to support changing env vars in app dynamically.
