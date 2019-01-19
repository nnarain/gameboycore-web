
import {GameboyCoreJS} from 'gameboycore';

export function putPixel(imagedata: ImageData, pixel: GameboyCoreJS['Pixel'], x: number, y: number) {
    const w = imagedata.width;
    const i = (y * w) + x;

    imagedata.data[i + 0] = pixel.r;
    imagedata.data[i + 1] = pixel.g;
    imagedata.data[i + 2] = pixel.b;
    imagedata.data[i + 3] = 255;
}
