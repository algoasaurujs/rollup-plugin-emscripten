import { PluginImpl } from 'rollup';
import { compileToWasm } from './utils/compileToWasm';
import { OutputConfig, OutputMode } from './types';
import saveFile from './utils/saveFile';
import {
  nodejsAsyncBase64,
  nodejsAsyncFile,
  nodejsSyncBase64,
  nodejsSyncFile,
} from './templates/nodejs';
import {
  browserAsyncBase64,
  browserAsyncFile,
  browserSyncBase64,
  browserSyncFile,
} from './templates/browser';
import { bothAsyncBase64, bothSyncBase64 } from './templates/both';
import path from 'path';
import typeDeclaration from './templates/typeDeclaration';

interface Options {
  baseDirectory: string;
  target: 'node' | 'browser' | 'both';
  mode: OutputMode;
  output: OutputConfig;
}

export const emscriptenLoader: PluginImpl<Partial<Options>> = options => {
  const settings: Options = {
    baseDirectory:'./src',
    target: 'both',
    mode: 'sync',
    output: 'base64',
    ...options,
  };

  return {
    name: 'rollup-plugin-emscripten', // this name will show up in warnings and errors
    buildStart() {
      const root = path.join(path.resolve(process.cwd()), settings.baseDirectory);
      typeDeclaration(root, settings.mode);
    },
    async transform(code, id) {
      const fileExtension = id
        .split('.')
        .at(-1)
        ?.toLowerCase();
      if (fileExtension === 'c' || fileExtension === 'cpp') {
        const { target, mode, output } = settings;
        const isWatchMode = this.meta.watchMode;
        const wasm = await compileToWasm(code, fileExtension);

        if (isWatchMode) {
          if (mode === 'sync') {
            return bothSyncBase64(wasm);
          } else {
            return bothAsyncBase64(wasm);
          }
        } else {
          if (output === 'file') {
            const filename = saveFile(this, wasm);
            if (mode === 'sync') {
              if (target === 'browser') {
                return browserSyncFile(filename);
              } else if (target === 'node') {
                return nodejsSyncFile(filename);
              } else {
                return bothSyncBase64(wasm);
              }
            } else {
              if (target === 'browser') {
                return browserAsyncFile(filename);
              } else if (target === 'node') {
                return nodejsAsyncFile(filename);
              } else {
                return bothAsyncBase64(wasm);
              }
            }
          } else {
            if (mode === 'sync') {
              if (target === 'browser') {
                return browserSyncBase64(wasm);
              } else if (target === 'node') {
                return nodejsSyncBase64(wasm);
              } else {
                return bothSyncBase64(wasm);
              }
            } else {
              if (target === 'browser') {
                return browserAsyncBase64(wasm);
              } else if (target === 'node') {
                return nodejsAsyncBase64(wasm);
              } else {
                return bothAsyncBase64(wasm);
              }
            }
          }
        }
      }
      return null;
    },
  };
};
