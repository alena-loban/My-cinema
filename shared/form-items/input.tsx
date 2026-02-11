import { Input, InputProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import LabelComponent from './label';
import { TLabel } from './types';

type WrapperClassName = { wrapperClassName?: string };
type Input = {
  main: {
    label?: TLabel;
    afterInput?: ReactNode;
  } & InputProps;
};
type Props = Input &
  WrapperClassName &
  Omit<UseControllerProps<any>, 'control'>;

const FormInput: FC<Props> = ({ main, ...props }) => {
  const { control, trigger } = useFormContext();
  const {
    label,
    className: classProps,
    autoComplete,
    disabled,
    variant,
    afterInput,
    ...rest
  } = main;

  const {
    field,
    fieldState: { error },
  } = useController({ ...props, control });

  const errorField = { errorText: error?.message, hasError: error };

  return (
    <div>
      {label && (
        <LabelComponent
          name={field.name}
          label={label}
          isError={!!errorField?.hasError}
        />
      )}
      <div>
        <Input
          data-test-value={`${field.value}-${label}`}
          data-testid="input"
          allowClear={true}
          autoComplete={autoComplete ?? 'off'}
          //   className={classNames(
          //     style.input,
          //     errorField.hasError && style.inputError,
          //     classProps
          //   )}
          disabled={disabled}
          variant={variant ? variant : 'borderless'}
          {...rest}
          {...props}
          {...field}
        />
        {afterInput}
      </div>

      {/* {errorField.hasError && (
        <div className={style.errorMessage}>{errorField.errorText}</div>
      )} */}
      {errorField.hasError && <div>{errorField.errorText}</div>}
    </div>
  );
};

export default FormInput;
