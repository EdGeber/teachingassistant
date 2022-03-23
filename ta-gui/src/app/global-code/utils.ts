export type ErrorSource = string;

export interface ErrorHandlers { [index: number]: () => void }

export function DeepCloneProperties(obj: any): any {
    return <any> JSON.parse(JSON.stringify(obj));
}
