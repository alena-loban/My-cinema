'use client';

import { Button, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';
import {
  ClockCircleOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import DateCards from './date-card';
import Halls from './halls';

const dateCardInfo = [{ day: 'пт' }];

const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Выбор сеанса"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.modalWrapper}
        footer={<div></div>}
        centered
        width={{
          xs: '50%',
          sm: '60%',
          md: '70%',
          lg: '80%',
          xl: '80%',
          xxl: '80%',
        }}
      >
        <div className={styles.modal}>
          <div className={styles.top}>
            <div className={styles.hr} />
            <div className={styles.movieInfoWrapper}>
              <div className={styles.info}>
                <Image
                  alt="movie poster"
                  src={''}
                  width={36}
                  height={52}
                  className={styles.poster}
                />
                <div className={styles.detailsWrapper}>
                  <h3>name</h3>
                  <div className={styles.details}>
                    <div>
                      <UserOutlined className={styles.icon} />
                      <span>16+</span>
                    </div>
                    <div>
                      <InfoCircleOutlined className={styles.icon} />
                      <span>драма</span>
                    </div>
                    <div>
                      <ClockCircleOutlined className={styles.icon} />
                      <span>1ч 30 мин</span>
                    </div>
                  </div>
                </div>
              </div>
              <Tooltip title="Подробнее">
                <InfoCircleOutlined className={styles.more} />
              </Tooltip>
            </div>
            <div className={styles.hr} />
          </div>
          <DateCards />
          <Halls />
        </div>
      </Modal>
    </>
  );
};
export default ModalComponent;
