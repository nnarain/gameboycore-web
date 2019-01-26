import * as React from 'react';
import './App.css';

import ControlPanel from './controlpanel/ControlPanel';
import Display from './display/Display';

import {Grid} from 'semantic-ui-react';

import {GameboyCoreJS} from 'gameboycore';
import gameboy_wasm from 'gameboycore/dist/gameboycore.wasm';

interface IAppState {
    gbjs: GameboyCoreJS | null;
    core: GameboyCoreJS["GameboyCore"] | null;
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {core: null, gbjs: null};

        this.animate = this.animate.bind(this);
        this.onGameboyCoreLoadROM = this.onGameboyCoreLoadROM.bind(this);
    }

    public render() {
        return (
            <Grid columns={3} divided >
                <Grid.Row>
                    <Grid.Column>
                        <p>Catalouge</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <Display core={this.state.core} />
                        </Grid.Row>
                        <Grid.Row>
                            <ControlPanel core={this.state.core} gbjs={this.state.gbjs} onLoad={this.onGameboyCoreLoadROM}/>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <p>Empty</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    public componentDidMount() {
        this.initializeGameboyCoreRuntime();
    }

    private animate() {
        if (this.state.core != null) {
            this.state.core.emulateFrame();
        }
        requestAnimationFrame(this.animate);
    }


    private onGameboyCoreLoadROM() {
        console.log("ROM was loaded into GameboyCore");
        console.log("Forcing re-render to pass core into display and control panel...");
        this.forceUpdate();

        // start animation loop
        this.animate();
    }

    private initializeGameboyCoreRuntime() {
        import('gameboycore').then(gb => {
            if (gb != null) {
                const runtime = gb.default({
                    locateFile: (filename: string, dir: string): string => {
                        if (filename === 'gameboycore.wasm') {
                            return gameboy_wasm;
                        }
                        else {
                            return "";
                        }
                    },
                    onRuntimeInitialized: () => {
                        console.log('GameboyCoreJS runtime has been initialized');
                        this.initializeCore(runtime);
                    }
                });

                this.setState({gbjs: runtime});
            }
        });
    }

    private initializeCore(runtime: GameboyCoreJS) {
        const core = new runtime.GameboyCore();
        if (core != null) {
            console.log('GameboyCore has been instantiated');
        }
        else {
            console.log('Failed to instanitate GameboyCore object');
        }
        this.setState({core});
    }

}

export default App;
