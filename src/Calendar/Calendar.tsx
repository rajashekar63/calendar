import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  parse,
} from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { WeekNames } from "./../Constant";
import "./Calendar.scss";
import Days from "./Days";

interface EventData {
  launchDate: string;
  imageFilenameThumb: string;
  imageFilenameFull: string;
  title: string;
  summary: string;
  learnMoreLink: string;
  purchaseLink: string;
}

const Calendar: React.FC = () => {
  const { year = "", month = "" } = useParams<{
    year?: string;
    month?: string;
  }>();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10);

    if (
      !isNaN(parsedYear) &&
      !isNaN(parsedMonth) &&
      parsedMonth >= 1 &&
      parsedMonth <= 12
    ) {
      return new Date(parsedYear, parsedMonth - 1);
    }

    return new Date();
  });

  useEffect(() => {
    fetch("https://amock.io/api/rajashekar6/sony/ps/events")
      .then((res) => res.json())
      .then((res: EventData[]) => setEvents(res));
  }, []);

  useEffect(() => {
    const parsedDate = parse(`${year}-${month}-01`, "yyyy-M-d", new Date());
    if (isNaN(parsedDate.getTime())) {
      navigate("/");
    } else {
      setCurrentMonth(parsedDate);
    }
  }, [year, month, navigate]);

  const nextMonth = () => {
    const nextMonthDate = addMonths(currentMonth, 1);
    navigate(`/${format(nextMonthDate, "yyyy/M")}`);
  };

  const prevMonth = () => {
    const prevMonthDate = subMonths(currentMonth, 1);
    navigate(`/${format(prevMonthDate, "yyyy/M")}`);
  };

  return (
    <div className="calendar" data-testid="calendar">
      <div className="calendar__header">
        <button
          className="calendar__header__btn"
          onClick={prevMonth}
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          className="calendar__header__btn"
          onClick={nextMonth}
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>
      <div className="calendar__days">
        {WeekNames.map((name) => (
          <div key={name} className="calendar__days__day-name">
            {name}
          </div>
        ))}
      </div>
      <Days currentMonth={currentMonth} events={events} />
    </div>
  );
};

export default Calendar;
