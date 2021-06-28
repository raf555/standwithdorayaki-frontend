const variant = [
    "base",
    "lighten-5",
    "lighten-4",
    "lighten-3",
    "lighten-2",
    "lighten-1",
    "darken-1",
    "darken-2",
    "darken-3",
    "darken-4",
    "accent-1",
    "accent-2",
    "accent-3",
    "accent-4"
]

const color = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "blue-grey",
    "grey",
]

export default (includevariant = false) => {
    let out = color[Math.floor(Math.random() * color.length)];
    if (includevariant) {
        out += " " + variant[Math.floor(Math.random() * variant.length)];
    }

    return out;
}