function textFormat(strs, fieldsToFormat = []) {
    const formattedData = strs.map(str => {
        const newObj = { ...str }

        fieldsToFormat.forEach(field => {
            if (newObj[field]) {
                if (newObj[field].includes('_')) {
                    newObj[field] = newObj[field].split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                } else {
                    newObj[field] = newObj[field].charAt(0).toUpperCase() + newObj[field].slice(1)
                }
            }
        })
        return newObj
    })
    return formattedData
}

export {
    textFormat
}