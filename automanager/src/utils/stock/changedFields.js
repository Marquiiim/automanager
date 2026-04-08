function getChangedFields(original, current, ignoredFields = ['created_at', 'updated_at', 'id']) {
    const changes = {}

    Object.keys(current).forEach(key => {
        if (ignoredFields.includes(key)) return

        const originalValue = original[key]?.toString()
        const currentValue = current[key]?.toString()

        if (originalValue !== currentValue) changes[key] = current[key]
    })

    return changes
}

export {
    getChangedFields
}