# React Native Project Structure Template

This template is useful for starting out w/ a scalable react native project.

## Dependencies

- [React Navigation](https://reactnavigation.org/): routing and navigation
- [zustand](https://github.com/pmndrs/zustand): local state management
- [react-query](https://github.com/tanstack/query): Hooks for fetching, caching and updating asynchronous data in React

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
