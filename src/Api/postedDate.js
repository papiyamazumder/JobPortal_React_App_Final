export const calculateDaysAgoMessage = (postedAt) => {
    const postDate = new Date(postedAt); // Convert postedAt to a Date object
    const currentDate = new Date(); // Current date
    const timeDifference = currentDate.getTime() - postDate.getTime(); // Difference in milliseconds
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

    if (daysAgo === 0) {
        const hoursAgo = Math.floor(timeDifference / (1000 * 3600));
        if (hoursAgo === 0) {
            const minutesAgo = Math.floor(timeDifference / (1000 * 60));
            if (minutesAgo === 0) {
                return 'Posted just now';
            } else {
                return `Posted ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
            }
        } else {
            return `Posted ${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        }
    } else if (daysAgo === 1) {
        return 'Posted yesterday';
    } else {
        // Modify the date format based on your preference
        return `Posted on ${postDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`;
    }
};
