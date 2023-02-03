import { useEffect, useMemo, useState } from 'react';
import uniqueId from 'lodash.uniqueid';

import i18n from 'i18n';

import { CalendarEvent } from '../../Calendar.types';
import { formatToYearMonthDate } from '../../Calendar.utils';
import { CalendarDate } from './CalendarDate';
import { createCalendar, getMonthName, shortWeekDaysArray } from './MonthCalendar.utils';
import { MonthCalendarProps, MonthObject } from './MonthCalendar.types';
import {
  StyledMonth,
  StyledMonthName,
  StyledDay,
  StyledDaysWrapper,
  StyledMonthInside,
} from './MonthCalendar.styles';

export const MonthCalendar = ({
  date,
  events,
  localizer,
  setDate,
  setActiveView,
}: MonthCalendarProps) => {
  const langLocale = i18n.language;
  const [calendar, setCalendar] = useState<MonthObject | null>(null);

  const handleDayClick = (date: Date) => {
    setDate(date);
    setActiveView('day');
  };

  const monthDates = useMemo(
    () =>
      calendar &&
      calendar.weeks.map((week, index) => (
        <StyledDaysWrapper key={index}>
          {week.map((date, index) => {
            const currentDateEvents = events?.filter(
              (event) => formatToYearMonthDate(event.start) === formatToYearMonthDate(date),
            );

            return (
              <CalendarDate
                key={index}
                dateToRender={date}
                dateOfMonth={calendar.date}
                onDayClick={handleDayClick}
                events={currentDateEvents as CalendarEvent[]}
              />
            );
          })}
        </StyledDaysWrapper>
      )),
    [calendar, events],
  );

  useEffect(() => {
    date && setCalendar(createCalendar(date, localizer));
  }, [date]);

  return (
    calendar && (
      <StyledMonth>
        <StyledMonthInside>
          <StyledMonthName>{getMonthName(calendar.date, langLocale)}</StyledMonthName>
          <StyledDaysWrapper>
            {shortWeekDaysArray(langLocale).map((day) => (
              <StyledDay key={uniqueId()}>{day}</StyledDay>
            ))}
          </StyledDaysWrapper>
          {monthDates}
        </StyledMonthInside>
      </StyledMonth>
    )
  );
};
