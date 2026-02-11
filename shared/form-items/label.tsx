import classNames from 'classnames';
import styles from './styles.module.scss';
import { TLabel } from './types';

type Props = {
  name: string;
  label: TLabel;
  isError?: boolean;
};

const LabelComponent = ({ name, label, isError }: Props) => {
  if (typeof label === 'object') {
    if (label !== null && 'text' in label) {
      return (
        <label
          htmlFor={name}
          className={classNames(styles.label, { hasError: isError })}
        >
          {label.text}
          {label.required && <span className={'required'}>*</span>}
        </label>
      );
    } else {
      return <label htmlFor={name}>{label}</label>;
    }
  }
  return (
    <label
      htmlFor={name}
      className={classNames(styles.label, { hasError: isError })}
    >
      {label}
    </label>
  );
};

export default LabelComponent;
