"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, useController } from "react-hook-form";

interface ShadcnDatePickerProps {
  name: string;
  control: Control<any>;
  startYear: number;
  endYear: number;
  minDate?: Date;
}

const DatePickerSeparated: React.FC<ShadcnDatePickerProps> = ({
  name,
  control,
  startYear,
  endYear,
  minDate,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const currentDate = value instanceof Date && !isNaN(value.getTime()) ? value : new Date();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleDayChange = (day: string) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const newDate = new Date(year, month, parseInt(day));

    if (newDate < (minDate || new Date())) {
      onChange(newDate);
    } else {
      onChange(newDate);
    }
  };

  const handleMonthChange = (month: string) => {
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    const newDate = new Date(year, months.indexOf(month), day);

    if (newDate < (minDate || new Date())) {
      onChange(newDate);
    } else {
      onChange(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const newDate = new Date(parseInt(year), month, day);

    if (newDate < (minDate || new Date())) {
      onChange(newDate);
    } else {
      onChange(newDate);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-w-[360px] dark:text-white">
      <Select onValueChange={handleDayChange}>
        <SelectTrigger className="h-auto shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0 min-h-[60px]">
          <SelectValue
            placeholder={
              <div className="flex flex-col items-start">
                <span className="font-semibold uppercase text-[0.65rem] text-muted-foreground dark:text-white ">
                  Dia
                </span>
                <span className="font-normal dark:text-white">
                  {currentDate.getDate() || "-"}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-48">
            {Array.from({ length: 31 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select onValueChange={handleMonthChange}>
        <SelectTrigger className="h-auto shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0">
          <SelectValue
            placeholder={
              <div className="flex flex-col items-start">
                <span className="font-semibold uppercase text-[0.65rem] text-muted-foreground dark:text-white">
                  Mês
                </span>
                <span className="font-normal dark:text-white">
                  {months[currentDate.getMonth()] || "-"}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-48">
            {months.map((month, index) => (
              <SelectItem key={index} value={month}>
                {month}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select onValueChange={handleYearChange}>
        <SelectTrigger className="h-auto shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0">
          <SelectValue
            placeholder={
              <div className="flex flex-col items-start">
                <span className="font-semibold uppercase text-[0.65rem] text-muted-foreground dark:text-white">
                  Ano
                </span>
                <span className="font-normal dark:text-white">
                  {currentDate.getFullYear() || "-"}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-48">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
};

export default DatePickerSeparated;
