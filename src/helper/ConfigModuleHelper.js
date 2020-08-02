import { configModule } from '../utils/loadModules';

export const getEditorsConfig = () => (configModule.config && configModule.config.editors) || {};

export const getEditorComponent = componentType => {
  const editorExtend = getEditorsConfig()[componentType];
  return editorExtend && editorExtend.component;
};
