export const calculateHoursAgo = (postAt: string | undefined): string => {
  if (!postAt) return "Unknown time" // กรณีไม่มี postAt

  const postTime = new Date(postAt).getTime()
  if (isNaN(postTime)) return "Invalid time" // กรณี postAt ไม่สามารถแปลงเป็นเวลาได้

  const now = Date.now() // เวลาปัจจุบัน
  const differenceInMilliseconds = now - postTime
  const hoursAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)) // แปลงเป็นชั่วโมง

  if (hoursAgo === 0) {
    return "just now"
  } else if (hoursAgo === 1) {
    return "1 hour ago"
  }
  return `${hoursAgo} hours ago`
}
