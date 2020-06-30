//Turns string into slug

export function toSlug(string) {
    return string.replace(/\s/g, '-').toLowerCase()
}