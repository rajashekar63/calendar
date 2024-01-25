import {eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth} from "date-fns";
import {chunk} from "../Utils";
import Img from "../Img";
import Hero from "../Hero";
import React, {useEffect, useState} from "react";

interface EventData {
    launchDate: string;
    imageFilenameThumb: string;
    imageFilenameFull: string;
    title: string;
    summary: string;
    learnMoreLink: string;
    purchaseLink: string;
};

interface DaysProps {
    events: EventData[];
    currentMonth: Date;
}
const Days: React.FC<DaysProps> = ({ events, currentMonth }): JSX.Element => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startDayOfWeek = getDay(start);
    const days = eachDayOfInterval({ start, end });
    const orderedDays = [...Array(startDayOfWeek).fill(null), ...days];
    const weeks = chunk(orderedDays, 7);
    const [selectedEvent, setSelectedEvent] = useState<{ [key: number]: EventData; }>({});

    const handleEventClick = (eventData: EventData, weekIndex: number) => {
        const event = { [weekIndex]: eventData };

        setSelectedEvent(
            JSON.stringify(event) === JSON.stringify(selectedEvent) ? {} : event
        );
    };

    useEffect(() => setSelectedEvent([]),[currentMonth])

    return (
        <>
            {weeks.map((week, weekIndex) => {
                const selEvent = selectedEvent[weekIndex];

                return (
                    <div key={weekIndex} className="calendar__days">
                        {week.map((day, index) => {
                            if (!day) {
                                return (
                                    <div key={index + ' day'} className="calendar__days__day-empty" />
                                );
                            }

                            const eventData = events.find((event) => isSameDay(new Date(event.launchDate), day));

                            return (
                                <div key={day.toString()} className="calendar__days__day">
                                    {eventData && (
                                        <button className="calendar__days__day__event-container">
                                            <Img
                                                src={`/assets/${eventData.imageFilenameThumb}.webp`}
                                                alt={eventData.title}
                                                className="calendar__days__day__event-image"
                                                onClick={() => handleEventClick(eventData, weekIndex)}
                                            />
                                        </button>
                                    )}
                                    <span className={`calendar__days__day__number ${eventData ? "calendar__days__day__number--with-event" : ""}`}>
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
                                    subDescription={`Available ${format(new Date(selEvent.launchDate), "MMMM do yyyy")}`}
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

export default Days;