// https://github.com/facebook/react/blob/10a7a5b5ced683125d68584a78084faac3197846/packages/react-reconciler/src/ReactFiberLazyComponent.js

export function readLazyComponentType<T>(lazyComponent: LazyComponent<T>): T {
  const status = lazyComponent._status
  const result = lazyComponent._result
  switch (status) {
    case Resolved: {
      const Component: T = result
      return Component
    }
    case Rejected: {
      const error: mixed = result
      throw error
    }
    case Pending: {
      const thenable: Thenable<T, mixed> = result
      throw thenable
    }
    default: {
      lazyComponent._status = Pending
      const ctor = lazyComponent._ctor
      const thenable = ctor()
      thenable.then(
        moduleObject => {
          if (lazyComponent._status === Pending) {
            const defaultExport = moduleObject.default
            if (__DEV__) {
              if (defaultExport === undefined) {
                warning(
                  false,
                  'lazy: Expected the result of a dynamic import() call. ' +
                    'Instead received: %s\n\nYour code should look like: \n  ' +
                    "const MyComponent = lazy(() => import('./MyComponent'))",
                  moduleObject,
                )
              }
            }
            lazyComponent._status = Resolved
            lazyComponent._result = defaultExport
          }
        },
        error => {
          if (lazyComponent._status === Pending) {
            lazyComponent._status = Rejected
            lazyComponent._result = error
          }
        },
      )
      // Handle synchronous thenables.
      switch (lazyComponent._status) {
        case Resolved:
          return lazyComponent._result
        case Rejected:
          throw lazyComponent._result
      }
      lazyComponent._result = thenable
      throw thenable
    }
  }
}
