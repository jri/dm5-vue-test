export default {
  "infobits.type.infobit": {
    name: "Infobit",
    icon: "info-circle",
    titleLabel: "Infobit Title",
    detailDefs: [
      {
        prop: "text",
        label: "Notes",
        dataType: "HTML"
      }
    ]
  },
  "infobits.type.person": {
    name: "Person",
    icon: "user",
    titleLabel: "Person Name",
    detailDefs: [
      {
        prop: "birthDate",
        label: "Year of birth",
        dataType: "Number"
      },
      {
        prop: "birthPlace",
        label: "Place of birth",
        dataType: "Text"
      },
      {
        prop: "text",
        label: "Notes",
        dataType: "HTML"
      }
    ]
  },
  "infobits.type.question": {
    name: "Question",
    icon: "question-circle",
    titleLabel: "Question",
    detailDefs: [
      {
        prop: "text",
        label: "Notes",
        dataType: "HTML"
      }
    ]
  },
  "infobits.type.structural_element": {
    name: "Structural Element",
    icon: "map-signs",
    titleLabel: "Structural Element",
    detailDefs: [
      {
        prop: "text",
        label: "Notes",
        dataType: "HTML"
      }
    ]
  }
}
