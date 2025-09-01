import moment from 'moment';

export const range = (start: number, end?: number, step = 1) => {
  const output: number[] = [];
  let rangeStart = start;
  let rangeEnd = end;

  if (typeof rangeEnd === 'undefined') {
    rangeEnd = rangeStart;
    rangeStart = 0;
  }
  for (let i = rangeStart; i < rangeEnd; i += step) {
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
