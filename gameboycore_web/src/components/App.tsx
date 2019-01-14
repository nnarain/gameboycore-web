import * as React from 'react';
import './App.css';

import gameboy_wasm from 'gameboycore/dist/gameboycore.wasm';

import {GameboyCoreJS} from 'gameboycore';

interface IAppState {
    results: number;
    core: GameboyCoreJS["GameboyCore"];
    module: any;
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {results: 0, core: null, module: null};
    }
    public render() {
        return (
            <p>{this.state.results}</p>
        );
    }

    public componentDidMount() {
        import('gameboycore').then(gb => {
            if (gb != null) {
                this.setState({results: 1});
                gb.default({
                    locateFile: (filename: string, dir: string): string => {
                        if (filename === 'gameboycore.wasm') {
                            return gameboy_wasm;
                        }
                        else {
                            return "";
                        }
                    },
                    onRuntimeInitialized: () => {
                        console.log('GameboyCoreJS Initialized');
                    }
                })
            }
            else {
                this.setState({results: 2});
            }
        });
    }

}

export default App;
