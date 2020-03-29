import React from 'react';
import {Grid} from "@material-ui/core";

const AnotherPage = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    Some page content. Feel free to place whatever you want here
                </Grid>
            </Grid>
        </div>
    );
};

export default AnotherPage;
