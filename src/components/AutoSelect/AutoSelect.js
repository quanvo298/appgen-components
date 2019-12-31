import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { withAutoSuggestStyles } from 'utils/withBasicStyles';

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class AutoSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: undefined,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { single: valueFromState } = state;
    const { value: valueFromProps } = props;
    if (valueFromState !== valueFromProps && valueFromProps) {
      return {
        single: valueFromProps,
      };
    }
    return null;
  }

  handleChange = () => selectedItem => {
    const target = {
      target: { value: selectedItem && selectedItem.value, selectedItem, editor: this },
    };
    this.props.onChange(target);
  };

  convertToOptions = () => {
    const { component = {} } = this.props;
    const { data } = component;
    const options = [];
    if (data) {
      data.forEach(element => {
        options.push({
          value: element[component.valueAtt || 'value'],
          label: element[component.labelAtt || 'label'],
        });
      });
    }
    return options;
  };

  getSelectedOption = options => {
    const { single: singleValue } = this.state;
    return options && options.find(({ value }) => value === singleValue);
  };

  getSelectStyle = () => {
    const { theme } = this.props;
    return {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
  };

  render() {
    const { classes } = this.props;
    const options = this.convertToOptions();
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={this.getSelectStyle()}
            options={options}
            components={components}
            value={this.getSelectedOption(options)}
            onChange={this.handleChange('single')}
            placeholder="Search element (start with a)"
            isClearable
          />
        </NoSsr>
      </div>
    );
  }
}

export default withAutoSuggestStyles(AutoSelect, { withTheme: true });
