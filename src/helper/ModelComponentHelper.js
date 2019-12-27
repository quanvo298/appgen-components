import { isEmpty, isNotEmpty } from 'utils/CollectionUtils';
import {
  ELEMENT_PROPERTIES,
  UIELEMENT_NAMES,
  getPropertyValue,
  getPropertyByName,
} from './UIComponentHelper';
import { getEntityId } from './ModelHelper';

export const IGNORE_PROPERTIES_FROM_UI_TO_MODEL = [
  ELEMENT_PROPERTIES.PARENT_COMPONENT,
  ELEMENT_PROPERTIES.PARENT_COMPONENT_ID,
  ELEMENT_PROPERTIES.ENTITY_PROPERTY,
  ELEMENT_PROPERTIES.COMPONENT_PROPERTY,
];

export const convertLayoutToLayoutModel = (selectedProject, componentBuilderItem) => {
  const { childs = [], properties = [] } = componentBuilderItem;
  const positions = [];
  childs.forEach(child => {
    positions.push({
      position: getPropertyValue(ELEMENT_PROPERTIES.POSITION, child.properties),
      widthSize: getPropertyValue(ELEMENT_PROPERTIES.ROW_WIDTH_SIZE, child.properties, 12),
    });
  });
  const uiLayoutModel = {
    projectId: selectedProject.id,
    rows: getPropertyValue(ELEMENT_PROPERTIES.ROWS, properties),
    positions,
  };
  return uiLayoutModel;
};

export const convertUIElementFormToComponentModel = (selectedProject, uiElementForm) => {
  const { uicomponent = {} } = uiElementForm;
  const { properties: uiElementFormProperties } = uicomponent;
  const entityProperty = getPropertyValue(
    ELEMENT_PROPERTIES.ENTITY_PROPERTY,
    uiElementFormProperties
  );
  const uiComponentModel = {
    name: UIELEMENT_NAMES.ELEMENT_FORM,
    title: UIELEMENT_NAMES.ELEMENT_FORM,
    symbolicName: null,
    projectId: selectedProject.id,
    properties: [],
  };
  if (!entityProperty) {
    return uiComponentModel;
  }
  const uiComponentModelProperties = [
    { name: ELEMENT_PROPERTIES.ENTITY_PROPERTY, value: entityProperty._id },
  ];
  uiElementFormProperties.forEach(uiElementFormProperty => {
    if (!IGNORE_PROPERTIES_FROM_UI_TO_MODEL.includes(uiElementFormProperty.name)) {
      uiComponentModelProperties.push({ ...uiElementFormProperty });
    }
  });
  uiComponentModel.properties = uiComponentModelProperties;
  return uiComponentModel;
};

export const convertUIElementComponentToComponentModel = (selectedProject, uiElementComponent) => {
  const { uicomponent = {} } = uiElementComponent;
  const { properties: uiElementComponentProperties = [], componentType } = uicomponent;
  const componentProperty = uicomponent[ELEMENT_PROPERTIES.COMPONENT_PROPERTY];

  const uiComponentModel = {
    name: UIELEMENT_NAMES.ELEMENT_COMPONENT,
    title: UIELEMENT_NAMES.ELEMENT_COMPONENT,
    symbolicName: null,
    projectId: selectedProject.id,
    componentType,
    properties: [],
  };
  let uiComponentModelProperties = [];
  if (componentProperty) {
    uiComponentModelProperties = [
      { name: ELEMENT_PROPERTIES.REF_COMPONENT, value: getEntityId(componentProperty) },
    ];
  }
  uiElementComponentProperties.forEach(uiElementProperty => {
    if (!IGNORE_PROPERTIES_FROM_UI_TO_MODEL.includes(uiElementProperty.name)) {
      uiComponentModelProperties.push({ ...uiElementProperty });
    }
  });

  uiComponentModel.properties = uiComponentModelProperties;
  return uiComponentModel;
};

export const adjustLayoutIndex = (child, layouts) => {
  const childComponentData = child.componentData || child;
  const childLayouts = childComponentData.layouts;
  const childChilds = childComponentData.childs;
  if (isNotEmpty(childLayouts)) {
    const rangeIndex = layouts.length;
    layouts.push(...childLayouts);
    childComponentData[ELEMENT_PROPERTIES.LAYOUT_INDEX] = +rangeIndex;
    childChilds.forEach(elementChild => {
      const currentLayoutIndex = elementChild[ELEMENT_PROPERTIES.LAYOUT_INDEX];
      if (currentLayoutIndex >= 0) {
        elementChild[ELEMENT_PROPERTIES.LAYOUT_INDEX] = currentLayoutIndex + rangeIndex;
      }
    });
  }
};
export const convertLayoutChildsToComponentModels = (
  selectedProject,
  componentBuilderItem,
  layouts
) => {
  const uiComponentModels = [];
  const { childs = [] } = componentBuilderItem;
  childs.forEach(child => {
    const { uicomponent = {}, properties } = child;
    const { childs: uiComponentChilds = [] } = uicomponent;
    const parentPosition = getPropertyValue(ELEMENT_PROPERTIES.POSITION, properties);
    let uiComponentLayout = null;
    if (uiComponentChilds.length > 1) {
      uiComponentLayout = convertLayoutToLayoutModel(selectedProject, uicomponent);
      layouts.push(uiComponentLayout);
    }

    uiComponentChilds.forEach(uiComponentChild => {
      let uiComponentModel = { properties: [] };
      const { uicomponent: uicomponentFromChild } = uiComponentChild;
      if (uicomponentFromChild.name === UIELEMENT_NAMES.ELEMENT_FORM) {
        uiComponentModel = convertUIElementFormToComponentModel(selectedProject, uiComponentChild);
      } else if (uicomponentFromChild.name === UIELEMENT_NAMES.ELEMENT_COMPONENT) {
        uiComponentModel = convertUIElementComponentToComponentModel(
          selectedProject,
          uiComponentChild
        );
      }
      const { properties: uiComponentModelProperties } = uiComponentModel;
      uiComponentModelProperties.push({
        name: ELEMENT_PROPERTIES.PARENT_POSITION,
        value: parentPosition,
      });
      if (uiComponentLayout) {
        const position = getPropertyValue(ELEMENT_PROPERTIES.POSITION, uiComponentChild.properties);
        uiComponentModel[ELEMENT_PROPERTIES.LAYOUT_INDEX] = layouts.length - 1;
        uiComponentModelProperties.push({ name: ELEMENT_PROPERTIES.POSITION, value: position });
      }
      uiComponentModels.push(uiComponentModel);
    });
  });
  return uiComponentModels;
};

export const convertComponentBuilderItemToComponentModel = (
  componentName,
  selectedProject,
  componentBuilderItem,
  updatedItem,
  layouts
) => {
  const { properties } = componentBuilderItem;
  const { id, title, symbolicName } = updatedItem;
  const uiComponentModel = {
    id,
    name: componentName,
    title,
    symbolicName,
    projectId: selectedProject.id,
    properties,
  };

  let uiLayoutModels = layouts;
  if (isEmpty(layouts)) {
    uiLayoutModels = [];
    uiLayoutModels.push(convertLayoutToLayoutModel(selectedProject, componentBuilderItem));
    uiComponentModel.layouts = uiLayoutModels;
  }

  uiComponentModel.layoutIndex = uiLayoutModels.length - 1;

  const { entity } = componentBuilderItem;
  if (entity && !getPropertyByName(ELEMENT_PROPERTIES.ENTITY, properties)) {
    properties.push({ name: ELEMENT_PROPERTIES.ENTITY, value: entity._id });
  }

  uiComponentModel.childs = convertLayoutChildsToComponentModels(
    selectedProject,
    componentBuilderItem,
    uiLayoutModels
  );
  return uiComponentModel;
};
