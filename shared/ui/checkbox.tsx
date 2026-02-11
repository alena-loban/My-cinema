import { Checkbox, CheckboxProps } from 'antd';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = CheckboxProps;

const CheckboxComponent = ({ className: customClassName, ...rest }: Props) => {
  return (
    <Checkbox
      className={classNames(styles.checkbox, customClassName)}
      {...rest}
    />
  );
};
export default CheckboxComponent;
