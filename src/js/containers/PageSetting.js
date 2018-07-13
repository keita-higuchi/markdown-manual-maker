import React from 'react'

import {observer, inject} from "mobx-react";

import {Dialog, DialogTitle, DialogContentText} from '@material-ui/core';
import {Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, withStyles} from '@material-ui/core';

const styles = theme => ({
  root: {
      display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

@inject("event") @observer
class PageSetting extends React.Component {

    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
        this.props.event.closePageSetingModal();
    }

    render() {

        const classes = this.props.classes;

        return <Dialog
            open={this.props.store.pageSettingModal.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">PDF Settings</DialogTitle>

                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">Page Size</FormLabel>
                    <RadioGroup
                        aria-label="size"
                        name="size"
                        value={this.props.store.pdfPageSize}
                        onChange={(e) => {this.props.event.changePdfSetting(e, 'size')}}
                    >
                        <FormControlLabel value="A4" control={<Radio />} label="A4" />
                        <FormControlLabel value="B5" control={<Radio />} label="B5" />
                    </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">Orientation</FormLabel>
                    <RadioGroup
                        aria-label="Orientation"
                        name="Orientation"
                        value={this.props.store.pdfOrientation}
                        onChange={(e) => {this.props.event.changePdfSetting(e, 'orientation')}}
                    >
                        <FormControlLabel value="Portrait" control={<Radio />} label="Portrait" />
                        <FormControlLabel value="Landscape" control={<Radio />} label="Landscape" />
                    </RadioGroup>
                </FormControl>

            </Dialog>
    }

}

export default withStyles(styles)(PageSetting);

