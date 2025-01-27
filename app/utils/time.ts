import date from 'date-and-time';

export function formatDateTime(inputDate: Date | string): string {
    
    const dateObj = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

    
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format');
    }

    
    const formattedDate = date.format(dateObj, 'YYYY-MM-DD'); 
    const formattedTime = date.format(dateObj, 'h:mmA'); 

    
    return `${formattedTime} ${formattedDate}`;
}


const dateToFormat = '2022-10-10T22:30:00'; 
console.log(formatDateTime(dateToFormat)); 
