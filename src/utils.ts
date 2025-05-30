import moment from 'moment';

export const range = (start: number, end?: number, step = 1) => {
  const output: number[] = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export function formatDateShort(timestamp: string | number | Date): string {
  const date = moment(timestamp);
  const now = moment();

  if (date.isSame(now, 'year')) {
    return date.format('MMM Do');
  } else {
    return date.format('MMM Do, YYYY');
  }
}
