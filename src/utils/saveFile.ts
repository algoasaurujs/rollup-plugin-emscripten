import { TransformPluginContext } from 'rollup';
import { createHash } from 'crypto';

const saveFile = (context: TransformPluginContext, wasm: Buffer): string => {
  const hash = createHash('sha256');
  // generate a unique hash for the wasm code using the SHA-256 algorithm
  hash.update(wasm);
  const hashName = hash.digest('hex').substring(0, 15) + '.wasm';
  context.emitFile({
    fileName: hashName,
    source: wasm,
    type: 'asset',
  });
  return hashName;
};

export default saveFile;
