import { eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from "date-fns";
import { chunk } from "../Utils";
import Hero from "../Hero";
import React, { useEffect, useState } from "react";
import Day from "./Day";
import { EventData } from "../Constant";

interface DaysProps {
    events: EventData[];
    currentMonth: Date;
}
const Days: React.FC<DaysProps> = ({ events, currentMonth }): JSX.Element => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startDayOfWeek = getDay(start);
    const days = eachDayOfInterval({ start, end });
    const orderedDays = [...Array(startDayOfWeek).fill(''), ...days];
    const weeks = chunk(orderedDays, 7);
    const [selectedEvent, setSelectedEvent] = useState<{ [key: number]: EventData; }>({});

    const handleEventClick = (eventData: EventData, weekIndex: number) => {
        if (typeof eventData !== 'undefined') {
            const event = { [weekIndex]: eventData };

            setSelectedEvent(
                JSON.stringify(event) === JSON.stringify(selectedEvent) ? {} : event
            );
        }
    };

    useEffect(() => setSelectedEvent([]),[currentMonth])

    return (
        <>
            {weeks.map((week, weekIndex) => {
                const selEvent = selectedEvent[weekIndex];

                return (
                    <div key={weekIndex} className="calendar__days">
                        {week.map((day, index) => {
                            return <Day key={day.toString() + index} day={day} weekIndex={weekIndex} onClick={handleEventClick} events={events} />
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