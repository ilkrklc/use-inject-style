# useInjectStyle

A react hook to inject style sheet on demand.

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

Please review [code of conduct](.github/CODE_OF_CONDUCT.md) and [contributing guide](.github/CONTRIBUTING.md) so that you can understand what actions will and will not be tolerated.

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

Divisor is [MIT licensed](./LICENSE).
