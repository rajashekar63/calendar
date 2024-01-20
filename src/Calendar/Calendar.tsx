import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parse,
  isSameDay,
  getDay,
} from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { chunk } from "./../Utils";
import { WeekNames } from "./../Constant";
import "./Calendar.scss";
import Hero from "./../Hero";

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
  const [selectedEvent, setSelectedEvent] = useState<{
    [key: number]: EventData;
  }>({});
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
    setSelectedEvent({});
    const nextMonthDate = addMonths(currentMonth, 1);
    navigate(`/${format(nextMonthDate, "yyyy/M")}`);
  };

  const prevMonth = () => {
    setSelectedEvent({});
    const prevMonthDate = subMonths(currentMonth, 1);
    navigate(`/${format(prevMonthDate, "yyyy/M")}`);
  };

  const handleEventClick = (eventData: EventData, weekIndex: number) => {
    const event = { [weekIndex]: eventData };

    setSelectedEvent(
      JSON.stringify(event) === JSON.stringify(selectedEvent) ? {} : event
    );
  };

  const renderDays = (): JSX.Element => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startDayOfWeek = getDay(start);
    const days = eachDayOfInterval({ start, end });
    const orderedDays = [...Array(startDayOfWeek).fill(null), ...days];
    const weeks = chunk(orderedDays, 7);

    return (
      <>
        {weeks.map((week, weekIndex) => {
          const selEvent = selectedEvent[weekIndex];

          return (
            <div key={weekIndex} className="calendar__days">
              {week.map((day) => {
                if (!day) {
                  return (
                    <div
                      key={Math.random()}
                      className="calendar__days__day-empty"
                    />
                  );
                }

                const eventData = events.find((event) =>
                  isSameDay(new Date(event.launchDate), day)
                );

                return (
                  <div key={day.toString()} className="calendar__days__day">
                    {eventData && (
                      <div className="calendar__days__day__event-container">
                        <img
                          src={`/assets/${eventData.imageFilenameThumb}.webp`}
                          alt={eventData.title}
                          className="calendar__days__day__event-image"
                          onClick={() => handleEventClick(eventData, weekIndex)}
                        />
                      </div>
                    )}
                    <span
                      className={`calendar__days__day__number ${
                        eventData
                          ? "calendar__days__day__number--with-event"
                          : ""
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                );
              })}
              {selEvent && (
                <div className="calendar__days__event">
                  <Hero
                    image={`/assets/${selEvent.imageFilenameFull}.webp`}
                    title={selEvent.title}
                    description={selEvent.summary}
                    subDescription={`Available ${format(
                      new Date(selEvent.launchDate),
                      "MMMM do yyyy"
                    )}`}
                    learnMoreLink={selEvent.learnMoreLink}
                    preorderLink={selEvent.purchaseLink}
                  />
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="calendar">
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
      {renderDays()}
    </div>
  );
};

export default Calendar;
