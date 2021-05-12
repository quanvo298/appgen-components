import React from 'react';
import { useForm } from '../Form/hocs/FormProvider';
import { useGridCtx } from '../Table/hooks/GridProvider';
import { GridEvents } from '../Table/TableEditable';
import {
  createFieldCellChangedEvent,
  createFieldGridRowDefIntegration,
  createFieldEventEmitter,
  fieldCellChanged,
} from '../../helper/FormHelper';
import Grid from './Grid';

const GridEditor = props => {
  const { name, onChange } = props;
  const { getFormEvents, onEventEmitters, getFormIntegrations } = useForm({});
  const { emitEvent, addIntegrations } = useGridCtx();

  const handleChange = event => {
    if (event) {
      const { target = {} } = event;
      const { payload = {}, value } = target;
      const { sourceEvent, body = {} } = payload;
      if (sourceEvent === GridEvents.CellChange) {
        const { cellName, cellValue, rowIndex } = body;
        const functionName = createFieldCellChangedEvent(name);
        const callback = getFormEvents()[functionName];
        fieldCellChanged({ fieldName: name, cellName, cellValue, rowIndex })(callback);
      }
      onChange({ value, event });
      return;
    }
    onChange({ value: null, event });
  };

  const reduceRowDef = ({ rowData, rowIndex }) => {
    const rowDefFunctionName = createFieldGridRowDefIntegration(name);
    const reduceRowDefFunction = getFormIntegrations()[rowDefFunctionName];
    if (reduceRowDefFunction != null) {
      return reduceRowDefFunction({ rowData, rowIndex });
    }
    return null;
  };

  onEventEmitters({
    [createFieldEventEmitter(name, 'updateCellsDef')]: payload =>
      emitEvent('updateCellsDef', payload),
    [createFieldEventEmitter(name, 'validate')]: () => emitEvent('validate'),
  });

  addIntegrations({
    reduceRowDef,
  });

  return <Grid {...props} onChange={handleChange} />;
};

export default GridEditor;
