import {Checkbox, FormControlLabel} from "@mui/material";

export default function LabeledCheckbox({classes, label, checked, onChange, ...other}) {
    return (
        <FormControlLabel
            label={label}
            classes={classes}
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    {...other}
                />
            }
        />
    )
}