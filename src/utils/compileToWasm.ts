import fs from 'fs';
import { execSync } from 'child_process';

export async function compileToWasm(code: string, extension: string) {
  try {
    // Write the C code to a temporary file
    const cFilePath = `temp.${extension}`;
    fs.writeFileSync(cFilePath, code);

    // Use emcc to compile the C code to WebAssembly
    const wasmFilePath = 'temp.wasm';
    const command = `emcc ${cFilePath} -s SIDE_MODULE=2 -O3 -o ${wasmFilePath}`;
    execSync(command);

    // Read the resulting WebAssembly code from the file
    const wasmCode = fs.readFileSync(wasmFilePath);

    // Remove the temporary files
    fs.unlinkSync(cFilePath);
    fs.unlinkSync(wasmFilePath);

    return wasmCode;
  } catch (error) {
    throw new Error(`Compilation failed: ${error}`);
  }
}
