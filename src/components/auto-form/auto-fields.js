import CheckboxListField from "./components/CheckboxListField";
import RadioListField from "./components/RadioListField";
import TextField from "./components/TextField";
import LabeledCheckbox from "./components/LabeledCheckbox";
import Autocomplete from './components/Autocomplete';

export const autoFieldList = {
  textField: 'textField',
  labeledCheckbox: 'labeledCheckbox',
  checkboxList: 'checkboxList',
  radiosList: 'radioList',
  autocomplete: 'autocomplete'
}

export let autoFieldComponents = {
  [autoFieldList.textField]: TextField,
  [autoFieldList.labeledCheckbox]: LabeledCheckbox,
  [autoFieldList.checkboxList]: CheckboxListField,
  [autoFieldList.radiosList]: RadioListField,
  [autoFieldList.autocomplete]: Autocomplete
};