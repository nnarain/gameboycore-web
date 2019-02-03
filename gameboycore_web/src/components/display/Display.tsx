import * as React from 'react';

import * as $ from 'jquery';

import {GameboyCoreJS} from 'gameboycore';

import * as imagemanip from 'ts/imagemanip';

const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;


interface IProps {
    core: GameboyCoreJS['GameboyCore'] | null;
}

class Display extends React.Component<IProps, {}> {
    private imageData = new ImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
    private audioSamples: number[] = [];
    private audioContext: AudioContext = new AudioContext();

    constructor(props: any) {
        super(props);

        this.intializeCoreCallbacks = this.intializeCoreCallbacks.bind(this);
        this.scanlineCallback = this.scanlineCallback.bind(this);
        this.vblankCallback = this.vblankCallback.bind(this);
        this.audioSampleCallback = this.audioSampleCallback.bind(this);
    }

    public render() {
        this.intializeCoreCallbacks();
        return (
            <div id="display_parent">
                <canvas id={"display"} width={"auto"} height={"100%"}>Canvas not supported</canvas>
            </div>
        );
    }

    public componentWillMount() {
        console.log($("#display").width());
    }

    public componentDidMount() {
        const w = $("#display_parent").width() as number;
        const h = w / ASPECT_RATIO;

        $("#display").width(w);
        $("#display").height(h);
    }

    private scanlineCallback(scanline: Array<GameboyCoreJS['Pixel']>, line: number) {
        scanline.forEach((pixel: GameboyCoreJS["Pixel"], x: number) =>{
            imagemanip.putPixel(this.imageData, pixel, x, line);
        });
    }

    private vblankCallback() {
        // Get the canvas context
        const canvas = $("#display")[0] as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx != null) {
            // Create a new canvas
            const newCanvas = $("<canvas>")
                .attr("width", this.imageData.width)
                .attr("height", this.imageData.height)[0] as HTMLCanvasElement;

            // Put the display data into the new canvas
            newCanvas.getContext('2d')!.putImageData(this.imageData, 0, 0);

            ctx.drawImage(newCanvas, 0, 0, newCanvas.width, newCanvas.height, 0, 0, canvas.width, canvas.height);
        }

        if (this.audioSamples.length >= 2) {
            this.handleAudio();
        }
    }

    private audioSampleCallback(s1: number, s2: number) {
        this.audioSamples.push(s1);
        this.audioSamples.push(s2);
    }

    private handleAudio() {
        const audioBuffer = this.createAudioBuffer(this.audioSamples);
        const audioSource = this.createAudioSource(audioBuffer);

        audioSource.start();

        this.audioSamples = [];
    }

    private createAudioBuffer(buffer: number[]) {
        const audioBuffer = this.audioContext.createBuffer(2, buffer.length, this.audioContext.sampleRate);
        const channel1 = audioBuffer.getChannelData(0);
        const channel2 = audioBuffer.getChannelData(1);

        // copy audio data into buffer
        for (let i = 0; i < buffer.length - 1; i += 2) {
            channel1[i + 0] = buffer[i + 0];
            channel2[i + 1] = buffer[i + 1];
        }

        return audioBuffer;
    }

    private createAudioSource(audioBuffer: AudioBuffer) {
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;

        source.connect(this.audioContext.destination);

        return source;
    }

    private intializeCoreCallbacks() {
        if (this.props.core != null) {
            console.log("Setting display callbacks");
            this.props.core.setScanlineCallback(this.scanlineCallback);
            this.props.core.setVBlankCallback(this.vblankCallback);
            this.props.core.setAudioSampleCallback(this.audioSampleCallback);
        }
    }
}

export default Display;
