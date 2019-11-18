import React, { useState, useMemo, useEffect } from 'react';
import {
    format,
    isEqual,
    subDays,
    addDays,
    setHours,
    isBefore,
    parseISO,
    setSeconds,
    setMinutes,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';
import api from '~/services/api';

const HOUR_RANGE = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState(new Date());

    const dateFormated = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    useEffect(() => {
        async function loadSchedule() {
            const response = await api.get('/schedule', {
                params: {
                    date,
                },
            });

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = HOUR_RANGE.map(hour => {
                const checkDate = setSeconds(
                    setMinutes(setHours(date, hour), 0),
                    0
                );
                const compareDate = utcToZonedTime(checkDate, timezone);

                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find(a =>
                        isEqual(parseISO(a.date), compareDate)
                    ),
                };
            });

            setSchedule(data);
        }

        loadSchedule();
    }, [date]);

    function handlePrevDays() {
        setDate(subDays(date, 1));
    }

    function handleNextDays() {
        setDate(addDays(date, 1));
    }
    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevDays}>
                    <MdChevronLeft size={36} color="#FFF" />
                </button>
                <strong>{dateFormated}</strong>
                <button type="button" onClick={handleNextDays}>
                    <MdChevronRight size={36} color="#FFF" />
                </button>
            </header>

            <ul>
                {schedule.map(time => (
                    <Time
                        past={time.past}
                        available={!time.appointment}
                        key={time.time}
                    >
                        <strong>{time.time}</strong>
                        <span>
                            {time.appointment
                                ? time.appointment.user.name
                                : 'Em aberto'}
                        </span>
                    </Time>
                ))}
            </ul>
        </Container>
    );
}
