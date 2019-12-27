export const DataTypeOptions = [
  {label: "String", value :"String"},
  {label: "Integer", value :"Integer"},
  {label: "Long", value :"Long"},
  {label: "Float", value :"Float"},
  {label: "Double", value :"Double"},
  {label: "Boolean", value :"Boolean"},
  {label: "Date", value :"Date"},
  {label: "DateTime", value :"DateTime"},
  {label: "Entity", value :"Entity"},
  {label: "ChoiceList", value :"ChoiceList"}
]

export const TrueOrFalseOptions = [
  {label: "True", value :"true"},
  {label: "False", value :"false"}
]

export const AssociationEnity = [
  {value: "ONETOONE", label :"One - One"},
  {value: "ONETOMANY_AGGREGATION", label :"One - Many (Aggregation)"},
  {value: "ONETOMANY_COMPOSITION", label :"One - Many (Composition)"},
  {value: "MANYTOMANY", label :"Many - Many"},
  {value: "MANYTOONE_AGGREGATION", label :"Many - One (Aggregation)"},
]


export const AssociationChoiceList = [
  {value: "ONETOONE", label :"One - One"},
  {value: "ONETOMANY_COMPOSITION", label :"One - Many (Composition)"},
]

export const HTTPMethodType = [
  {label: "GET", value :"GET"},
  {label: "POST", value :"POST"},
  {label: "PUT", value :"PUT"},
  {label: "DELETE", value :"DELETE"}
]

export const GridWidthSize = [
  {label: "3", value :"3"},
  {label: "6", value :"6"},
  {label: "9", value :"9"},
  {label: "12", value :"12"}
]

export const DeploymentModeOptions = [
  {label: "Full - BackEnd + FrontEnd", value :"full"},
  {label: "Full - BackEnd", value :"full_be"},
  {label: "Full - FrontEnd", value :"full_fe"},
]