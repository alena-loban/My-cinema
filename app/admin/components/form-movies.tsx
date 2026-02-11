'use client';
import { getMovies } from '../api/services';
import { useMoviesStore } from '../store/movies';
import { FormProvider, useForm } from 'react-hook-form';
import SelectComponent from '@/shared/form-items/select';
import { getAllMoviesIds } from '../api/actions';
import styles from './styles.module.scss';
import { ButtonComponent } from '@/shared/ui';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const YEARS_OPTIONS = years.map(year => ({
  value: year,
  label: year,
}));

const currenMonth = new Date().getMonth();

const MONTHS_OPTIONS = [
  { value: 'JANUARY', label: 'Январь' },
  { value: 'FEBRUARY', label: 'Февраль' },
  { value: 'MARCH', label: 'Март' },
  { value: 'APRIL', label: 'Апрель' },
  { value: 'MAY', label: 'Май' },
  { value: 'JUNE', label: 'Июнь' },
  { value: 'JULY', label: 'Июль' },
  { value: 'AUGUST', label: 'Август' },
  { value: 'SEPTEMBER', label: 'Сентябрь' },
  { value: 'OCTOBER', label: 'Октябрь' },
  { value: 'NOVEMBER', label: 'Ноябрь' },
  { value: 'DECEMBER', label: 'Декабрь' },
];
type Form = {
  year: (typeof YEARS_OPTIONS)[0]['value'];
  month: (typeof MONTHS_OPTIONS)[0]['value'];
};

const FormMovies = () => {
  const setDownloadedMoviesIds = useMoviesStore(
    state => state.setDownloadedMoviesIds
  );
  const setPreviewMovies = useMoviesStore(state => state.setPreviewMovies);

  const methods = useForm<Form>({
    defaultValues: {
      month: MONTHS_OPTIONS[currenMonth].value,
      year: currentYear,
    },
    mode: 'onChange',
  });

  const handleGetMovies = async (data: Form) => {
    console.log(data.month, data.year);
    const newMovies = (await getMovies({ month: data.month, year: data.year }))
      ?.items;

    setPreviewMovies(newMovies);
    const moviesIds = await getAllMoviesIds('kinopoiskId');
    setDownloadedMoviesIds(moviesIds);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleGetMovies)}
        className={styles.form}
      >
        <SelectComponent
          main={{
            label: { text: 'Выберите месяц' },
            options: MONTHS_OPTIONS,
          }}
          name="month"
        />
        <SelectComponent
          main={{ label: { text: 'Выберите год' }, options: YEARS_OPTIONS }}
          name="year"
        />
        <ButtonComponent className={styles.btn} htmlType="submit">
          получить
        </ButtonComponent>
      </form>
    </FormProvider>
  );
};
export default FormMovies;
