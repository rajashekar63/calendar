import {format, isSameDay} from "date-fns";
import Img from "../Img";
import React from "react";
import { EventData } from "../Constant";

interface DayProps {
    day: Date | string;
    weekIndex: number;
    onClick: Function;
    events: EventData[];
}
const Day: React.FC<DayProps> = ({ day, onClick, events, weekIndex }): JSX.Element => {
    const eventData = events.find((event) => isSameDay(new Date(event.launchDate), day || ''));

    if (!day) {
        return (
            <div key={day} className="calendar__days__day-empty" />
        );
    };

    return (
        <div className="calendar__days__day">
            {eventData && (
                <button className="calendar__days__day__event-container" onClick={() => onClick(eventData, weekIndex)}>
                    <Img
                        src={`/assets/${eventData.imageFilenameThumb}.webp`}
                        alt={eventData.title}
                        className="calendar__days__day__event-image"
                    />
                </button>
            )}
            <span className={`calendar__days__day__number ${eventData ? "calendar__days__day__number--with-event" : ""}`}>
              {format(day, "d")}
            </span>
        </div>
    );
};

export default Day;