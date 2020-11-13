export default function dateFilter(value, format = 'date') {
    // console.log(value)
    // console.log(format)

    const options = {}

    if (format.includes('date')) {
        options.day = 'numeric'
        options.month = 'numeric'
        options.year = 'numeric'
    }

    if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
    }

    return new Intl.DateTimeFormat(localStorage.getItem('cur_lang'), options).format(new Date(value))
}