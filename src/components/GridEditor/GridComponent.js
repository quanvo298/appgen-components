import React from 'react';
import { useForm } from '../Form/hocs/FormProvider';
import { useGridCtx } from '../Table/hooks/GridProvider';
import { GridEvents } from '../Table/TableEditable';
import {
  createFieldCellChangedEvent,
  createFieldCellDefinitionIntegration,
  createFieldEventEmitter,
  fieldCellChanged,
} from '../../helper/FormHelper';
import GridEditor from './GridEditor';

const GridComponent = props => {
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

  const reduceCellDefs = ({ rowData, rowIndex }) => {
    const cellDefsFunctionName = createFieldCellDefinitionIntegration(name);
    const reduceCellDefsFunction = getFormIntegrations()[cellDefsFunctionName];
    if (reduceCellDefsFunction != null) {
      return reduceCellDefsFunction({ rowData, rowIndex });
    }
    return null;
  };

  onEventEmitters({
    [createFieldEventEmitter(name, 'updateCellsDef')]: payload =>
      emitEvent('updateCellsDef', payload),
    [createFieldEventEmitter(name, 'validate')]: () => emitEvent('validate'),
  });

  addIntegrations({
    reduceCellDefs,
  });

  return <GridEditor {...props} onChange={handleChange} />;
};

export default GridComponent;
