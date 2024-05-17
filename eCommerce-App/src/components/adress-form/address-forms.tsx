import Checkbox from '../../utils/checkbox/checkbox';
import SelectInput from '../select-input/select-input';
import FormInput from '../form-input/form-input';
import styles from './adress-forms.module.css';
import { AdressFormProps } from '../../types/registration-form/registration-int';

function AdressForm({
  fieldLegend,
  adressInputs,
  selectInput,
  onChange,
  values,
}: AdressFormProps) {
  let checkbox;
  if (fieldLegend === 'Shipping Address') {
    checkbox = (
      <>
        <Checkbox id="shipping-adress-check" label="Set default address" />
        <Checkbox id="set-as-billing-check" label="Set as billing address" />
      </>
    );
  } else {
    checkbox = (
      <Checkbox id="shipping-adress-check" label="Set default address" />
    );
  }
  return (
    <fieldset className={styles.fieldsetBlock}>
      <legend>{fieldLegend}</legend>
      <SelectInput {...selectInput} onChange={(e) => onChange(e)} />
      {adressInputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            onChange={(e) => {
              onChange(e);
            }}
            value={values[input.name as keyof typeof values]}
          />
        );
      })}
      {checkbox}
    </fieldset>
  );
}

export default AdressForm;
