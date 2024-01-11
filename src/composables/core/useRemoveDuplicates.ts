export default function useRemoveDuplicates() {
    const removeDuplicates = (array) => {
        const unique = Array.from(new Set(array.map((item) => JSON.stringify(item))))
                          .map((item) => JSON.parse(item))
        return unique
    }

    return { removeDuplicates }
}
