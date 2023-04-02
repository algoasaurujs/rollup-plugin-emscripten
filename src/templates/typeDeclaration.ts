import fs from 'fs';
import path from 'path';
import { OutputMode } from '../types';

const typeDeclaration = (rootPath: string, mode: OutputMode) => {
  const typeFile = path.join(rootPath, 'emscripten.d.ts');
  if (mode === 'sync') {
    fs.writeFile(
      typeFile,
      `
      type LoaderResult<Exports> = import('@algoasaurujs/wasm-loader').LoaderResult<Exports>;

      declare module '*.c' {
        function loader<Exports = any, Imports = any>(importObject?: Imports): LoaderResult<Exports>;
        export = loader;
      }

      declare module '*.cpp' {
        function loader<Exports = any, Imports = any>(importObject?: Imports): LoaderResult<Exports>;
        export = loader;
      }
      `,
      err => {
        console.log(err);
      }
    );
  } else {
    fs.writeFile(
      typeFile,
      `
        type LoaderResult<Exports> = import('@algoasaurujs/wasm-loader').LoaderResult<Exports>;

        declare module '*.c' {
          function loader<Exports = any, Imports = any>(importObject?: Imports): Promise<LoaderResult<Exports>>;
          export = loader;
        }

        declare module '*.cpp' {
          function loader<Exports = any, Imports = any>(importObject?: Imports): Promise<LoaderResult<Exports>>;
          export = loader;
        }
        `,
      err => {
        console.log(err);
      }
    );
  }
};

export default typeDeclaration;
