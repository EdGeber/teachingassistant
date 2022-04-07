export function DeepCloneProperties(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}
