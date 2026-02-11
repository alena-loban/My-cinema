'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Carousel } from 'antd';
const date = new Date();
const today = date.getDate();
const dayOfWeek = date.getDay();

const monthNames = [
  'янв.',
  'фев.',
  'мар.',
  'апр.',
  'мая',
  'июня',
  'июля',
  'авг.',
  'сен.',
  'окт.',
  'нояб',
  'дек.',
];
const monthName = monthNames[date.getMonth()];

const shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const dayName = shortDays[dayOfWeek];

const DateCards = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  return (
    // <div className={styles.dateCardsWrapper}>
    <Carousel
      arrows={true}
      infinite={false}
      dots={false}
      className={styles.carousel}
      slidesToShow={7}
      slidesToScroll={2}
      responsive={[
        {
          breakpoint: 1750,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ]}
    >
      {shortDays.map((day, index) => (
        <div
          key={index}
          className={classNames(styles.card, {
            [styles.selected]: selectedDateIndex === index,
          })}
          onClick={() => setSelectedDateIndex(index)}
        >
          <p>{day}</p>
          <p className={styles.day}>{today + index}</p>
          <p>{monthName}</p>
        </div>
      ))}
    </Carousel>
    // </div>
  );
};
export default DateCards;
