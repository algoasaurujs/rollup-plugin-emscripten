export const nodejsSyncFile = (filename: string) => {
  return `
    import { loadNodejsSync } from "@algoasaurujs/wasm-loader";
    import { join } from "path";

    const filePath = join(__dirname, "${filename}")
    const loader = (importObject) => {
        return loadNodejsSync({filename: "file://" + filePath, importObject});
    };

    export default loader;
    `;
};

export const nodejsSyncBase64 = (wasm: Buffer) => {
  const base64 = wasm.toString('base64');

  return `
    import { loadNodejsSync } from "@algoasaurujs/wasm-loader";

    const loader = (importObject) => {
        return loadNodejsSync({filename: "data:application/wasm;base64,${base64}", importObject});
    };

    export default loader;
  `;
};

export const nodejsAsyncFile = (filename: string) => {
  return `
    import { loadNodejsAsync } from "@algoasaurujs/wasm-loader";
    import { join } from "path";

    const filePath = join(__dirname, "${filename}")
    const loader = (importObject) => {
        return loadNodejsAsync({filename: "file://" + filePath, importObject});
    };

    export default loader;
    `;
};

export const nodejsAsyncBase64 = (wasm: Buffer) => {
  const base64 = wasm.toString('base64');

  return `
      import { loadNodejsAsync } from "@algoasaurujs/wasm-loader";
  
      const loader = (importObject) => {
          return loadNodejsAsync({filename: "data:application/wasm;base64,${base64}", importObject});
      };
  
      export default loader;
    `;
};
