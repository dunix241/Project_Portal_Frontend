import CheckboxListField from "./components/CheckboxListField";
import RadioListField from "./components/RadioListField";
import TextField from "./components/TextField";
import LabeledCheckbox from "./components/LabeledCheckbox";
import Autocomplete from './components/Autocomplete';
import DateRangePicker from './components/DateRangePicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import DateTimeRangeField from './components/DateTimeRangeField';
import RichTextEditor from './components/RichTextEditor';
import Checkbox from './components/Checkbox';

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
};