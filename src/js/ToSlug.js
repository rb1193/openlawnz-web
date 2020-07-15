//Turns string into slug

export function toSlug(string) {
    if (string === undefined) return
    return string.replace(/\s/g, '-').toLowerCase()
}