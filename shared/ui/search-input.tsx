import { Input, InputProps } from 'antd';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

type Props = InputProps;
const SearchInput = ({ className: customClassName, ...rest }: Props) => {
  return (
    <Input
      className={classNames(styles.searchInput, customClassName)}
      prefix={<SearchOutlined />}
      allowClear={{ clearIcon: <CloseOutlined /> }}
      {...rest}
    />
  );
};
export default SearchInput;
