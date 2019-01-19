import * as React from 'react';

import {Button, Grid, Segment} from 'semantic-ui-react';

class ControlPanel extends React.Component {
    constructor(props: any) {
        super(props);
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
                            <input type="file"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default ControlPanel;
