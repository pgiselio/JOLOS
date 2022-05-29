export function isBlank(str: string | undefined): boolean {
    return (!str || /^\s*$/.test(str));
}