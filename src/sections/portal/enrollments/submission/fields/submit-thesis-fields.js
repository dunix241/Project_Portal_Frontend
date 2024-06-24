import { autoFieldList } from '../../../../../components/auto-form/auto-fields';

export const submitThesisFields = [
  {
    name: 'file',
    component: autoFieldList.dropzone,
    rules: {required: 'Please upload your thesis'}
  },
]