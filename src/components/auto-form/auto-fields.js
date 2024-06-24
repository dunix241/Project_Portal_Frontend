import CheckboxListField from "./components/CheckboxListField";
import RadioListField from "./components/RadioListField";
import TextField from "./components/TextField";
import LabeledCheckbox from "./components/LabeledCheckbox";
import Autocomplete from './components/Autocomplete';
import DateRangePicker from './components/DateRangePicker';
import DateTimeRangeField from './components/DateTimeRangeField';
import RichTextEditor from './components/RichTextEditor';
import Checkbox from './components/Checkbox';
import DateTimePicker from './components/DateTimePicker';
import Dropzone from './components/Dropzone';

export const autoFieldList = {
  textField: 'textField',
  labeledCheckbox: 'labeledCheckbox',
  checkboxList: 'checkboxList',
  radiosList: 'radioList',
  autocomplete: 'autocomplete',
  dateRangePicker: 'dateRangePicker',
  dateTimePicker: 'dateTimePicker',
  dateTimeRangeField: 'dateTimeRangeField',
  richTextEditor: 'richTextEditor',
  checkbox: 'checkbox',
  dropzone: 'dropzone',
}

export let autoFieldComponents = {
  [autoFieldList.textField]: TextField,
  [autoFieldList.labeledCheckbox]: LabeledCheckbox,
  [autoFieldList.checkboxList]: CheckboxListField,
  [autoFieldList.radiosList]: RadioListField,
  [autoFieldList.autocomplete]: Autocomplete,
  [autoFieldList.dateRangePicker]: DateRangePicker,
  [autoFieldList.dateTimePicker]: DateTimePicker,
  [autoFieldList.dateTimeRangeField]: DateTimeRangeField,
  [autoFieldList.richTextEditor]: RichTextEditor,
  [autoFieldList.checkbox]: Checkbox,
  [autoFieldList.dropzone]: Dropzone,
};