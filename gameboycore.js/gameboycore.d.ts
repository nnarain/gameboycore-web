declare module "gameboycore" {
    export interface GameboyCore {
        emulateFrame(): void;
    }

    export interface GameboyCoreJS {
        GameboyCore: GameboyCore | null;
    }

    export default function Module(emscriptenArgs: any): GameboyCoreJS;
}
