import { Select, SelectProps, Skeleton } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import { TLabel } from './types';
import LabelComponent from './label';
import styles from './styles.module.scss';
const { Option } = Select;

export type SelectComponentProps = {
  main: {
    label?: TLabel;
    handler?: (option?: any) => void;
    wrapperClassName?: string;
    errorClassName?: string;
  } & SelectProps;
} & Omit<UseControllerProps<any>, 'control'>;

const SelectComponent: FC<SelectComponentProps> = ({ main, ...props }) => {
  const { control, setValue, trigger } = useFormContext();
  const {
    className: classProps,
    wrapperClassName,
    disabled,
    options = [],
    label,
    mode,
    handler,
    errorClassName,
    ...rest
  } = main;

  const {
    field: { value, name, onChange: _, ...restField },
    fieldState: { error },
  } = useController({ ...props, control });

  const onChangeSelect = async (
    value: string | string[] | number | number[],
    options: any
  ) => {
    if (handler) {
      handler(options);
    }

    const newValue = (() => {
      if (mode === 'multiple') {
        return Array.isArray(value) && value.length === 0 ? null : value;
      }
      return value || null;
    })();

    setValue(name, newValue, { shouldDirty: true });

    await trigger(name);
  };
  const errorField = { errorText: error?.message, hasError: !!error };
  const isHasValue = Array.isArray(value) ? !!value.length : !!value;
  const checkIsInitial = rest.loading && isHasValue && options.length === 0;

  return (
    <div
      className={classNames(
        { hasError: errorField?.hasError },
        styles.selectContainer,
        wrapperClassName
      )}
    >
      {label && (
        <LabelComponent
          name={name}
          label={label}
          isError={errorField.hasError}
        />
      )}
      {checkIsInitial ? (
        <Skeleton.Input active={rest.loading} />
      ) : (
        <Select
          className={classNames(classProps, styles.select)}
          placeholder={main.placeholder}
          id={name}
          showAction={['focus', 'click']}
          status={errorField.hasError ? 'error' : ''}
          value={value ?? []}
          onChange={onChangeSelect}
          mode={mode}
          getPopupContainer={trigger => trigger.parentNode}
          maxTagCount={disabled ? undefined : 'responsive'}
          {...rest}
          {...restField}
          disabled={disabled}
          options={options}
        />
      )}

      <div
        className={classNames(styles.errorMsg, errorClassName, {
          hasError: errorField?.hasError,
        })}
      >
        {errorField.errorText && <span>{errorField.errorText}</span>}
      </div>
      <div>{errorField.errorText && <span>{errorField.errorText}</span>}</div>
    </div>
  );
};

export default SelectComponent;
