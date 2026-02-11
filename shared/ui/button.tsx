import { Button, ButtonProps } from 'antd';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = ButtonProps;

const ButtonComponent = ({ className: customClassName, ...rest }: Props) => {
  return (
    <Button className={classNames(styles.button, customClassName)} {...rest} />
  );
};
export default ButtonComponent;
