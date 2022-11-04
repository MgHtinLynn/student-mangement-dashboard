
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function transformQueryString(q: any) {
    let textStr = Object.keys(q).filter((i) => !!q[i]).map((key) => `${key}=${q[key]}`).join('&')
    textStr = (textStr) ? `?${textStr}` : ''
    return textStr
}

export function permissionScope(permission: string[], role: string): boolean {
    return permission.includes('*') || (!permission.includes('*') && permission.includes(role));
}