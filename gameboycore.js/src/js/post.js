/**
 * Load a GameboyCore instance with the specified buffer
 */
function loadFromArrayBuffer(core, buffer, length) {
    var ptr = Module._malloc(length);
    Module.HEAPU8.set(new Uint8Array(buffer), ptr);
    var result = core.loadROM(ptr, length);
    Module._free(ptr);

    return result;
}

Module['loadFromArrayBuffer'] = loadFromArrayBuffer;
