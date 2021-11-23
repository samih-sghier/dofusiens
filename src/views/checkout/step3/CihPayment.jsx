/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormikContext } from 'formik';
import React from 'react';

const CihPayment = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div className={`checkout-fieldset-collapse ${values.type === 'CIH' ? 'is-selected-payment' : ''}`}>
      <div className="checkout-field margin-0">
        <div className="checkout-checkbox-field">
          <input
            checked={values.type === 'CIH'}
            id="modeCih"
            name="type"
            onChange={(e) => {
              if (e.target.checked) {
                setValues({ ...values, type: 'CIH' });
              }
            }}
            type="radio"
          />
          <label
            className="d-flex w-100"
            htmlFor="modeCih"
          >
            <div className="d-flex-grow-1 margin-left-s">
              <h4 className="margin-0">CIH</h4>
              <span className="text-subtle d-block margin-top-s">
                Pay easily, fast and secure with CIH Bank.
              </span>
            </div>
            <div className="payment-img payment-img-cih" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CihPayment;