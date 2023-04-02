export const browserSyncFile = (filename: string) => {
  return `
    import { loadBrowserSync } from "@algoasaurujs/wasm-loader";

    const loader = (importObject) => {
        return loadBrowserSync({filename: "./${filename}", importObject});
    };
  
    export default loader;
    `;
};

export const browserSyncBase64 = (wasm: Buffer) => {
  const base64 = wasm.toString('base64');

  return `
    import { loadBrowserSync } from "@algoasaurujs/wasm-loader";
  
    const loader = (importObject) => {
        return loadBrowserSync({filename: "data:application/wasm;base64,${base64}", importObject});
    };
  
    export default loader;
    `;
};

export const browserAsyncFile = (filename: string) => {
  return `
    import { loadBrowserAsync } from "@algoasaurujs/wasm-loader";

    const loader = (importObject) => {
        return loadBrowserAsync({filename: "./${filename}", importObject});
    };
  
    export default loader;
    `;
};

export const browserAsyncBase64 = (wasm: Buffer) => {
  const base64 = wasm.toString('base64');

  return `
    import { loadBrowserAsync } from "@algoasaurujs/wasm-loader";
    
    const loader = (importObject) => {
        return loadBrowserAsync({filename: "data:application/wasm;base64,${base64}", importObject});
    };
    
    export default loader;
    `;
};
