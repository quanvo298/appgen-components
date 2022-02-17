import { getConfigModule } from '../utils/loadModules';

export const getEditorsConfig = () => {
  const { editors } = getConfigModule();
  return editors || {};
};

export const getEditorComponent = componentType => {
  const editorExtend = getEditorsConfig()[componentType];
  return editorExtend && editorExtend.component;
};
