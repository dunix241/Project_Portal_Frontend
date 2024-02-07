import _extends from "@babel/runtime/helpers/esm/extends";
export var splitDateRangeSections = function splitDateRangeSections(sections) {
  var startDateSections = [];
  var endDateSections = [];
  sections.forEach(function (section) {
    if (section.dateName === 'start') {
      startDateSections.push(section);
    } else {
      endDateSections.push(section);
    }
  });
  return {
    startDate: startDateSections,
    endDate: endDateSections
  };
};
export var removeLastSeparator = function removeLastSeparator(dateSections) {
  return dateSections.map(function (section, sectionIndex) {
    if (sectionIndex === dateSections.length - 1) {
      return _extends({}, section, {
        separator: null
      });
    }
    return section;
  });
};