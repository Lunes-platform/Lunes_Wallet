import React from "react";
import NumberFormat from "react-number-format";

export const DateMask = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.formattedValue,
          },
        });
      }}
      format="##/##/####"
      mask={['d', 'd', 'm', 'm', 'y', 'y', 'y', 'y']}
    />
  );
}

export const CpfMask = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      format="###.###.###-##"
    />
  );
}

export const CnpjMask = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      format="##.###.###/####-##"
    />
  );
}

export const MoneyBrlMask = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: parseFloat(values.value),
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
    />
  );
}
