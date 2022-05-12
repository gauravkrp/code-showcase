import dayjs from 'dayjs';
import relativeTimeDayJS from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import Intl from 'intl';
import 'intl/locale-data/jsonp/en-IN';

dayjs.extend(relativeTimeDayJS);
dayjs.extend(utc);
dayjs.extend(tz);

// dayjs.tz.setDefault("America/New_York");
// react native has issues with timezone

export const formateDate = (date) => dayjs(date).format("MMM DD, YYYY, hh:mm A");

export const relativeTime = (date) => dayjs(date).fromNow();

export const formateDateShort = (date) => dayjs(date).format("DD MMM");
