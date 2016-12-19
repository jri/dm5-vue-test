export default {
  "infobits.type.infobit": {
    name: "Infobit",
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
