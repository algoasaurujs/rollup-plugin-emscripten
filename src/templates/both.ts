export const bothSyncBase64 = (wasm: Buffer) => {
  const base64 = wasm.toString('base64');

  return `
    import { loadSync } from "@algoasaurujs/wasm-loader";
    
    const loader = (importObject) => {
        return loadSync({filename: "data:application/wasm;base64,${base64}", importObject});
    };
    
    export default loader;
      `;
};

export const bothAsyncBase64 = (wasm: Buffer) => {
  const base64 = wasm.toString('base64');

  return `
      import { loadAsync } from "@algoasaurujs/wasm-loader";
      
      const loader = (importObject) => {
          return loadAsync({filename: "data:application/wasm;base64,${base64}", importObject});
      };
      
      export default loader;
    `;
};
