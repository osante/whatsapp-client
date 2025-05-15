import { Pipe, PipeTransform } from "@angular/core";
import { format, isToday } from "date-fns";

@Pipe({
    name: "simplifiedDate",
    standalone: true,
})
export class SimplifiedDatePipe implements PipeTransform {
    transform(value: Date | string | null, ...args: unknown[]): string | null {
        if (!value) return null;

        // Convert the value to a Date object if it's not already one
        const date = new Date(value);

        // Check if the provided date is valid
        if (isNaN(date.getTime())) return null;

        // Check if the date is today
        if (isToday(date)) {
            // Return only the hour if the date is today
            return format(date, "HH:mm");
        }
        // Return the date in 'yyyy-MM-dd' format if it's not today
        return format(date, "yyyy-MM-dd");
    }
}
