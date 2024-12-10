/* istanbul ignore file */
let realDate: DateConstructor;

export const mockDateClass = (mockDate: Date): void => {
    realDate = Date;
    global.Date = class {
        constructor(date?: Date) {
            if (date) {
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
