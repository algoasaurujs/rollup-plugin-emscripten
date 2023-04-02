type LoaderResult<Exports> = import('@algoasaurujs/wasm-loader').LoaderResult<
  Exports
>;

declare module '*.c' {
  function loader<Exports = any, Imports = any>(
    importObject?: Imports
  ): LoaderResult<Exports>;
  export = loader;
}
