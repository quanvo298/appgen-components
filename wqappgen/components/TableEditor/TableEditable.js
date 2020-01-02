"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var _LocalProvider = require("../../utils/LocalProvider");

var _TableEditorHelper = require("../../helper/TableEditorHelper");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _BasicButton = _interopRequireDefault(require("../Button/BasicButton"));

var _CollectionUtils = require("../../utils/CollectionUtils");

var _BasicFormHelper = require("../../helper/BasicFormHelper");

var _Head = _interopRequireDefault(require("./Head"));

var _TableRow = _interopRequireDefault(require("./TableRow"));

var ButtonsBox = function ButtonsBox(_ref) {
  var disabledNew = _ref.disabledNew,
      onAddNewRow = _ref.onAddNewRow;
  var polyglot = (0, _LocalProvider.usePolyglot)();
  return _react.default.createElement(_Wrapper.default, {
    my: 2,
    textAlign: "end"
  }, !disabledNew && _react.default.createElement(_BasicButton.default, {
    size: "small",
    onClick: onAddNewRow
  }, polyglot.t('btn.new')));
};

var TableEditable =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TableEditable, _Component);

  function TableEditable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TableEditable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TableEditable).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addRowRef", function (elementFormRef, rowIndexed) {
      if (elementFormRef) {
        _this.rowRefs[rowIndexed] = elementFormRef;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "validate", function () {
      var columns = _this.props.columns;
      var gridData = _this.state.gridData;

      if (gridData) {
        var _validate = (0, _TableEditorHelper.validate)(gridData, columns),
            hasError = _validate.hasError,
            errors = _validate.errors;

        if (hasError) {
          (0, _TableEditorHelper.processErrors)(_this.rowRefs, errors);
        }

        return hasError;
      }

      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDeleteRow", function (rowData, rowIndex) {
      var gridData = _this.state.gridData;

      if (gridData) {
        _this.rowRefs.splice(rowIndex, 1);

        gridData.splice(rowIndex, 1);

        _this.setState({
          gridData: gridData,
          setFromState: true
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onAddNewRow", function () {
      var gridData = _this.state.gridData;

      if (!gridData) {
        gridData = [];
      }

      var columns = _this.props.columns;
      var initialValues = (0, _BasicFormHelper.processInitialValues)(columns);
      gridData.push(initialValues);

      _this.setState({
        gridData: gridData,
        setFromState: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSelectedRow", function (row, rowIndex) {
      var onSelectedRow = _this.props.onSelectedRow;

      if (onSelectedRow) {
        onSelectedRow(row, rowIndex);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "changeCellDefition", function (cellName, rowIndexed, newCellDefinition) {
      var rowRef = _this.rowRefs[rowIndexed];
      rowRef.changeCellDefition(cellName, newCellDefinition);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleInputChange", function (cellName, value, rowIndexed) {
      var gridData = _this.state.gridData;
      var _this$props = _this.props,
          onCellChange = _this$props.onCellChange,
          onChange = _this$props.onChange,
          componentName = _this$props.componentName;
      var rowData = gridData[rowIndexed];
      var event = {
        target: {
          value: gridData,
          ref: (0, _assertThisInitialized2.default)(_this)
        }
      };
      rowData[cellName] = value;

      if (onCellChange) {
        onCellChange({
          propertyName: componentName,
          cellName: cellName,
          cellValue: value,
          rowIndexed: rowIndexed,
          gridData: gridData,
          event: event
        });
      }

      if (onChange) {
        onChange(event);
      }
    });
    _this.rowRefs = [];
    _this.state = {
      gridData: undefined,
      setFromState: false
    };
    return _this;
  }

  (0, _createClass2.default)(TableEditable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var gridData = this.state.gridData;
      var _this$props2 = this.props,
          columns = _this$props2.columns,
          classes = _this$props2.classes,
          mode = _this$props2.mode,
          disabledNew = _this$props2.disabledNew,
          disabledDeleted = _this$props2.disabledDeleted,
          onFormatCellValue = _this$props2.onFormatCellValue;
      return _react.default.createElement(_Wrapper.default, null, _react.default.createElement(_Table.default, {
        className: classes.table
      }, _react.default.createElement(_Head.default, {
        columns: columns,
        classes: classes,
        mode: mode
      }), (0, _CollectionUtils.isNotEmpty)(gridData) && _react.default.createElement(_TableBody.default, null, gridData.map(function (row, rowIndex) {
        return _react.default.createElement(_TableRow.default, {
          mode: mode,
          columns: columns,
          key: rowIndex,
          rowData: row,
          rowIndex: rowIndex,
          classes: classes,
          onFormatCellValue: onFormatCellValue,
          onInputChange: _this2.handleInputChange,
          disabledDeleted: disabledDeleted,
          onDeleteRow: _this2.onDeleteRow,
          onSelectedRow: _this2.onSelectedRow,
          ref: function ref(_ref2) {
            _this2.addRowRef(_ref2, rowIndex);
          }
        });
      }))), _react.default.createElement(ButtonsBox, {
        disabledNew: disabledNew,
        onAddNewRow: this.onAddNewRow
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var gridDataFromState = state.gridData,
          setFromState = state.setFromState;
      var gridDataFromProps = props.gridData;
      var shouldBeUpdated = setFromState || gridDataFromState !== gridDataFromProps;

      if (shouldBeUpdated) {
        var gridData = setFromState ? gridDataFromState : gridDataFromProps;
        return {
          gridData: gridData,
          setFromState: false
        };
      }

      return null;
    }
  }]);
  return TableEditable;
}(_react.Component);

var _default = (0, _withBasicStyles.withTableStyles)(TableEditable);

exports.default = _default;