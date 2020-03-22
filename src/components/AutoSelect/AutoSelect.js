import React, { Component } from 'react';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import { isArray } from 'util';
import { withAutoSuggestStyles } from '../../utils/withBasicStyles';
import Control from './Control';
import NoOptionsMessage from './NoOptionsMessage';
import { Menu, Option } from './Option';
import { SingleValue, ValueContainer, MultiValue } from './Value';

const Placeholder = ({ selectProps, innerProps, children }) => (
  <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
    {children}
  </Typography>
);

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

const convertToOptions = ({ component = {} }) => {
  const { data = [] } = component;
  return data.reduce((jsonArray, element) => {
    jsonArray.push({
      value: element[component.valueAtt || 'value'],
      label: element[component.labelAtt || 'label'],
    });
    return jsonArray;
  }, []);
};

class AutoSelect extends Component {
  constructor(props) {
    super(props);
    this.select = React.createRef();
    this.state = {
      autoSelectValue: undefined,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { autoSelectValue: valueFromState } = state;
    const { value: valueFromProps } = props;
    if (valueFromState !== valueFromProps) {
      return {
        autoSelectValue: valueFromProps,
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { autoSelectValue } = this.state;
    const { current } = this.select;
    if (!autoSelectValue && current && current.select && current.select.hasValue()) {
      current.select.clearValue();
    }
  }

  handleChange = selectedItem => {
    const { multi } = this.props;
    let targetValue = null;
    if (multi) {
      targetValue = isArray(selectedItem) ? selectedItem.map(item => item.value) : [];
    } else if (selectedItem) {
      targetValue = selectedItem.value;
    }
    const target = {
      target: { value: targetValue, selectedItem, editor: this },
    };
    this.props.onChange(target);
  };

  getSelectedOption = options => {
    const { autoSelectValue } = this.state;
    const { multi } = this.props;
    if (multi && autoSelectValue) {
      return options && options.filter(({ value }) => autoSelectValue.includes(value));
    }
    return options && options.find(({ value }) => value === autoSelectValue);
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
    const { classes, multi = false } = this.props;
    const options = convertToOptions(this.props);
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            ref={this.select}
            isMulti={multi}
            classes={classes}
            styles={this.getSelectStyle()}
            options={options}
            components={components}
            value={this.getSelectedOption(options)}
            onChange={this.handleChange}
            placeholder="Search element (start with a)"
            isClearable
          />
        </NoSsr>
      </div>
    );
  }
}

export default withAutoSuggestStyles(AutoSelect, { withTheme: true });
