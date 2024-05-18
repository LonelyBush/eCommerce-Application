import { ChangeEvent } from 'react';
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
  onCheckboxChange,
  checkedDefault,
  onDefaultCheckboxChange,
  checked,
  values,
  fieldName,
}: AdressFormProps) {
  let checkbox;

  const onChangePostalCodeFormat = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const getPreviousSiblingContent =
      e.currentTarget.parentElement?.previousElementSibling?.textContent;
    if (getPreviousSiblingContent === 'Shipping Address') {
      if (e.currentTarget.name === 'country') {
        const getPostalCode = document.getElementsByName('postalCode');
        if (e.currentTarget.value === 'US') {
          getPostalCode[0].setAttribute('pattern', '^\\d{5}(-\\d{4})?$');
        } else if (e.currentTarget.value === 'UK') {
          getPostalCode[0].setAttribute('pattern', '^\\d{5}$');
        } else if (e.currentTarget.value === 'RU') {
          getPostalCode[0].setAttribute('pattern', '^\\d{6}$');
        }
      }
    }
    if (getPreviousSiblingContent === 'Billing Address' || checked === true) {
      if (e.currentTarget.name === 'country') {
        const getPostalCode = document.getElementsByName('postalCode');
        if (e.currentTarget.value === 'US') {
          getPostalCode[1].setAttribute('pattern', '^\\d{5}(-\\d{4})?$');
        } else if (e.currentTarget.value === 'UK') {
          getPostalCode[1].setAttribute('pattern', '^\\d{5}$');
        } else if (e.currentTarget.value === 'RU') {
          getPostalCode[1].setAttribute('pattern', '^\\d{6}$');
        }
      }
    }
  };

  const postalCodeCheckboxChange = () => {
    const getShipSelect = document.getElementsByName('country');
    const getPostalCode = document.getElementsByName('postalCode');
    if (getShipSelect[0] instanceof HTMLSelectElement) {
      if (getShipSelect[0].value === 'US') {
        getPostalCode[1].setAttribute('pattern', '^\\d{5}(-\\d{4})?$');
      } else if (getShipSelect[0].value === 'UK') {
        getPostalCode[1].setAttribute('pattern', '^\\d{5}$');
      } else if (getShipSelect[0].value === 'RU') {
        getPostalCode[1].setAttribute('pattern', '^\\d{6}$');
      }
    }
  };

  if (fieldLegend === 'Shipping Address') {
    checkbox = (
      <>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            postalCodeCheckboxChange();
            onCheckboxChange(e);
          }}
          id="set-as-billing-check"
          label="Set as billing address"
        />
        <Checkbox
          checked={checkedDefault}
          onChange={onDefaultCheckboxChange}
          id={`default-${fieldName}-check`}
          label="Set as default address"
        />
      </>
    );
  } else {
    checkbox = (
      <Checkbox
        checked={checkedDefault}
        onChange={onDefaultCheckboxChange}
        id={`default-${fieldName}-check`}
        label="Set as default address"
      />
    );
  }
  return (
    <fieldset name={fieldName} className={styles.fieldsetBlock}>
      <legend>{fieldLegend}</legend>
      <SelectInput
        {...selectInput}
        onChangeSelect={(e) => {
          onChangePostalCodeFormat(e);
          onChange(e);
        }}
        value={values[selectInput.name as keyof typeof values]}
      />
      {adressInputs.map((input) => {
        return (
          <FormInput
            key={input.id}
            {...input}
            onChangeInput={(e) => {
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
