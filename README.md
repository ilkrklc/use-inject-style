# useInjectStyle ![GitHub](https://img.shields.io/github/license/ilkrklc/use-inject-style) ![npm version](https://img.shields.io/npm/v/use-inject-style) ![npm](https://img.shields.io/npm/dw/use-inject-style) ![npm bundle size](https://img.shields.io/bundlephobia/min/use-inject-style)

## Description

`useInjectStyle` is a React hook that allows you to inject a style sheet on demand. This can be particularly useful when you want to conditionally apply styles based on certain state or props in your React component.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Syntax](#syntax)
- [Contributing](#contributing)
- [Pull Request Guidelines](#pull-request-guidelines)
- [License](#license)

## Installation

To install `useInjectStyle` using npm, run the following command:

```bash
npm i use-inject-style
```

## Usage

```javascript
import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useInjectStyle } from 'use-inject-style';

const App = () => {
  const { inject, extract, remove } = useInjectStyle('test-styles');

  return (
    <div>
      <button type="button" onClick={() => inject(`h1 { font-size: 20px; }`)}>
        Inject
      </button>
      <button type="button" onClick={() => extract(`h1 { font-size: 20px; }`)}>
        Extract
      </button>
      <button type="button" onClick={() => remove()}>
        Remove
      </button>
      <h1>Injecting style is awesome!!!</h1>
    </div>
  );
};
render(<App />, document.getElementById('root'));
```

## Syntax

### { inject, extract, remove } = useInjectStyle(elementId)

`inject`
A function to inject a css style rule to stylesheet

`extract`
A function to extract a css style rule to stylesheet

`remove`
Clean-up function to remove injected css stylesheet

`elementId`
Injected style dom element identifier

## Contributing

We welcome contributions to `useInjectStyle`! Please review [code of conduct](.github/CODE_OF_CONDUCT.md) and [contributing guide](.github/CONTRIBUTING.md) so that you can understand what actions will and will not be tolerated.

### Pull Request Guidelines

- The `main` branch is just a snapshot of the latest stable release. All development should be done in development branches. **Do not submit PRs against the `main` branch.**
- Work in the `src` folder and **DO NOT** check-in `dist` in the commits.
- It's OK to have multiple small commits as you work on the PR
- If adding a new feature add accompanying test case.
- If fixing bug,
  - Add accompanying test case if applicable.
  - Provide a detailed description of the bug in the PR.
  - If you are resolving an opened issue add issue number in your PR title.

## License

`useInjectStyle` is [MIT licensed](./LICENSE).
