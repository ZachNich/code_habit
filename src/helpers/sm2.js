// Four inputs: quality score (0 - 5), repetitions count, previous ease factor, previous interval
// Q, R, EF, I

// First review: Q = user assessed, R = 0, EF = 2.5, I = 0

export default function sm2(quality, repetitions, easeFactor, prevInterval) {
    let interval = 0
    if (quality >= 3) {
        if (repetitions === 0) {
            interval = 1
        } else if (repetitions === 1) {
            interval = 6
        } else {
            interval = prevInterval * easeFactor
        }
        interval = Math.ceil(interval)
        repetitions++
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    } else {
        repetitions = 0
        interval = 1
    }
    if (easeFactor < 1.3) {
        easeFactor = 1.3
    }
    return {repetitions, easeFactor, interval}
}