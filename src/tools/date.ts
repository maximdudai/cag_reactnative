

import { parse, differenceInDays, differenceInHours } from 'date-fns';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

// ex: "2024/04/15 09:00:00"
export default function calculateDaysAndHours(date: string) {
    const now = new Date();
    const auctionDate = parse(date, FORMAT, new Date());
    const days = differenceInDays(auctionDate, now);
    const hours = differenceInHours(auctionDate, now) % 24;

    return { 
        days, 
        hours 
    };
}