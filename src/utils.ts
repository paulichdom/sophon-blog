import moment from 'moment';

export const range = (start: number, end?: number, step = 1) => {
  const output: number[] = [];
  let localStart = start;
  let localEnd = end;

  if (typeof localEnd === 'undefined') {
    localEnd = localStart;
    localStart = 0;
  }
  for (let i = localStart; i < localEnd; i += step) {
    output.push(i);
  }
  return output;
};

export function formatDateShort(timestamp: string | number | Date): string {
  const date = moment(timestamp);
  const now = moment();

  if (date.isSame(now, 'year')) {
    return date.format('MMM Do');
  }
  return date.format('MMM Do, YYYY');
}
