import * as React from 'react';

import * as $ from 'jquery';

import {GameboyCoreJS} from 'gameboycore';

import * as imagemanip from 'ts/imagemanip';

const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;

interface IProps {
    core: GameboyCoreJS['GameboyCore'] | null;
}

class Display extends React.Component<IProps, {}> {
    private imageData = new ImageData(SCREEN_WIDTH, SCREEN_HEIGHT);

    constructor(props: any) {
        super(props);

        if (this.props.core != null) {
            this.props.core.setScanlineCallback(this.scanlineCallback);
            this.props.core.setVBlankCallback(this.vblankCallback);
        }
    }

    public render() {
        return (
            <canvas id={"display"} width={800} height={600}>Canvas not supported</canvas>
        );
    }

    private scanlineCallback(scanline: Array<GameboyCoreJS['Pixel']>, line: number) {
        console.log('Scanline callback');
        scanline.forEach((pixel: GameboyCoreJS["Pixel"], x: number) =>{
            imagemanip.putPixel(this.imageData, pixel, x, line);
        });
    }

    private vblankCallback() {
        console.log("Vblank callback");
        // Get the canvas context
        const canvas = $("display")[0] as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx != null) {
            // Create a new canvas
            const newCanvas = $("<canvas>")
                .attr("width", this.imageData.width)
                .attr("height", this.imageData.height)[0] as HTMLCanvasElement;

            // Put the display data into the new canvas
            newCanvas.getContext('2d')!.putImageData(this.imageData, 0, 0);

            ctx.scale(canvas.width / newCanvas.width, canvas.height / newCanvas.height);
            ctx.drawImage(newCanvas, 0, 0);
        }
    }
}

export default Display;
