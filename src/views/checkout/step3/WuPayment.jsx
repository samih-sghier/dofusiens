/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormikContext } from 'formik';
import React from 'react';

const WuPayment = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div className={`checkout-fieldset-collapse ${values.type === 'Wester Union' ? 'is-selected-payment' : ''}`}>
      <div className="checkout-field margin-0">
        <div className="checkout-checkbox-field">
          <input
            checked={values.type === 'Wester Union'}
            id="modeWu"
            name="type"
            onChange={(e) => {
              if (e.target.checked) {
                setValues({ ...values, type: 'Wester Union' });
              }
            }}
            type="radio"
          />
          <label
            className="d-flex w-100"
            htmlFor="modeWu"
          >
            <div className="d-flex-grow-1 margin-left-s">
              <h4 className="margin-0">Wester Union</h4>
              <span className="text-subtle d-block margin-top-s">
                Pay easily, fast and secure with Wester Union.
              </span>
            </div>
            <div className="payment-img-wu" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default WuPayment;