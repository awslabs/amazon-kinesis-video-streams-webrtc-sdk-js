/* istanbul ignore file */
let realDate: DateConstructor;

export const mockDateClass = (mockDate: Date): void => {
    realDate = Date;
    global.Date = class {
        constructor(date?: Date) {
            if (date) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                return new realDate(date);
            }

            return mockDate;
        }

        static now(): number {
            return mockDate.getTime();
        }
    } as DateConstructor;
};

export const restoreDateClass = (): void => {
    global.Date = realDate;
};
