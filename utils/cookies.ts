export const setCookie = (
    name: string,
    value: string,
    days: number
) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export const getCookie = (name: string): string | null => {
    const nameEQ = name + "="
    const cookies = document.cookie.split(";")

    for (let c of cookies) {
        c = c.trim()
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length)
        }
    }
    return null
}
