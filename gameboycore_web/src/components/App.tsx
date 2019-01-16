import * as React from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';

import {GameboyCoreJS} from 'gameboycore';
import gameboy_wasm from 'gameboycore/dist/gameboycore.wasm';

interface IAppState {
    core: GameboyCoreJS["GameboyCore"] | null;
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {core: null};
    }

    public render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <canvas width="800" height="600">Canvas not supported</canvas>
                </Grid>
            </Grid>
        );
    }

    public componentDidMount() {
        this.initializeGameboyCoreRuntime();
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
