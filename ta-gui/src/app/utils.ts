export type ErrorSource = string;

export interface ErrorHandlers { [index: number]: () => void }

export function DeepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}
