declare module "gameboycore" {
    export interface GameboyCore {
        new(): GameboyCore;
        emulateFrame(): void;
    }

    export interface GameboyCoreJS {
        GameboyCore: GameboyCore;
    }

    export default function Module(emscriptenArgs: any): GameboyCoreJS;
}
