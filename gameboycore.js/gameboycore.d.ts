declare module "gameboycore" {
    export interface Pixel {
        r: number;
        g: number;
        b: number;
    }

    export interface GameboyCore {
        new(): GameboyCore;
        loadROM(handle: number, length: number): void;
        setScanlineCallback(callback: (scanline: Pixel[], line: number) => void): void;
        setVBlankCallback(callback: () => void): void;
        emulateFrame(): void;
        release(): void;
    }

    export interface GameboyCoreJS {
        GameboyCore: GameboyCore;
        Pixel: Pixel,

        loadFromArrayBuffer(core: GameboyCore, buffer: ArrayBuffer, length: number): boolean;
    }

    export default function Module(emscriptenArgs: any): GameboyCoreJS;
}
