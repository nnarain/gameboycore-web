import * as React from 'react';

import {Input, Segment} from 'semantic-ui-react';

import { GameboyCoreJS } from 'gameboycore';

interface IProps {
    gbjs: GameboyCoreJS | null;
    core: GameboyCoreJS['GameboyCore'] | null;
    onLoad: () => void;
}

class ControlPanel extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);

        this.keyEventHandler = this.keyEventHandler.bind(this);
        this.openFile = this.openFile.bind(this);
    }

    public render() {
        return (
            <Segment>
                <Input focus type={"file"} placeholder={"ROM"} onChange={this.openFile} />
            </Segment>
        );
    }

    public componentDidMount() {
        document.addEventListener('keydown', this.keyEventHandler);
        document.addEventListener('keyup', this.keyEventHandler);
    }

    private keyEventHandler (event: KeyboardEvent): void {
        console.log(event);
    }

    private openFile(event: React.ChangeEvent<HTMLInputElement>): void {
        const fileList: FileList | null = event.target.files;

        if (fileList != null && fileList.length === 1) {
            const selectedFile = fileList[0];
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
                            this.props.onLoad();
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
}

export default ControlPanel;
