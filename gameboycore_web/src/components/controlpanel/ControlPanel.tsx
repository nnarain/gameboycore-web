import * as React from 'react';

import {Button, Grid, Segment} from 'semantic-ui-react';

import { GameboyCoreJS } from 'gameboycore';

interface IProps {
    gbjs: GameboyCoreJS | null;
    core: GameboyCoreJS['GameboyCore'] | null;
}

class ControlPanel extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);

        this.openFile = this.openFile.bind(this);
    }

    public render() {
        return (
            <Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Button icon="play" />
                        </Grid.Column>
                        <Grid.Column>
                            <input type="file" onChange={this.openFile}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }

    private openFile(event: React.ChangeEvent<HTMLInputElement>): void {
        const selectedFile = event.target.files![0];
        console.log("Selected file %s", selectedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
            const buffer = reader.result as ArrayBuffer;

            if (buffer != null) {
                if (this.props.gbjs != null && this.props.core != null) {
                    console.log("Attempting to load ROM file, %s", selectedFile);
                    const loadSuccess = this.props.gbjs.loadFromArrayBuffer(this.props.core, buffer, buffer.byteLength);

                    if (loadSuccess) {
                        console.log("Successfully loaded ROM file, %s", selectedFile);
                    }
                    else {
                        console.log("Failed to load ROM file, %s", selectedFile);
                    }
                }
            }
        }

        reader.readAsArrayBuffer(selectedFile);
    }
}

export default ControlPanel;
