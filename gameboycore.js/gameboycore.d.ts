declare module "gameboycore" {
    export interface Pixel {
        r: number;
        g: number;
        b: number;
    }

    export interface EmscriptenEnum {
        value: number;
    }

    export interface GBKey {
        UP: EmscriptenEnum,
        DOWN: EmscriptenEnum,
        LEFT: EmscriptenEnum,
        RIGHT: EmscriptenEnum,
        A: EmscriptenEnum,
        B: EmscriptenEnum,
        START: EmscriptenEnum,
        SELECT: EmscriptenEnum
    }

    export interface GameboyCore {
        new(): GameboyCore;
        loadROM(handle: number, length: number): void;
        setScanlineCallback(callback: (scanline: Pixel[], line: number) => void): void;
        setVBlankCallback(callback: () => void): void;
        setAudioSampleCallback(callback: (s1: number, s2: number) => void): void;
        emulateFrame(): void;
        input(key: GBKey, pressed: boolean): void;
        release(): void;
    }

    export interface GameboyCoreJS {
        GameboyCore: GameboyCore;
        Pixel: Pixel;
        GBKey: GBKey;

        loadFromArrayBuffer(core: GameboyCore, buffer: ArrayBuffer, length: number): boolean;
    }

    export default function Module(emscriptenArgs: any): GameboyCoreJS;
}
