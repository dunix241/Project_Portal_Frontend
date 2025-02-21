import { Stack } from '@mui/material';
import Field from './Field';
import { ReactNode } from 'react';

type AutoFormProps = Partial<{
  methods: any,
  formState: Partial<{
    fields: Partial<{
      name: string,
      component: string,
      hidden: () => boolean | boolean,
    }>[],
    Component: ReactNode,
    formValues: object
  }>
}>

const Autoform = (props: AutoFormProps) => {
  const { methods, formState } = props;
  return <>
    {formState.Component && <formState.Component/>}
    <Stack spacing={2}>
      {formState.fields?.map((field, index) => {
        return field.hidden && (_.isFunction(field.hidden) ? field.hidden?.(methods.watch()) : field.hidden === true)
          ? null
          : <Field key={index} {...field} defaultValue={formState.formValues[field.name]}/>;
      })}
    </Stack>
  </>;
};

export default Autoform