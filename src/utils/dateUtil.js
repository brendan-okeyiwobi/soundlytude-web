const DateUtil = {
    // Helper to safely parse dates
    parseDate: (dateStr) => {
      const date = new Date(dateStr);
      return isNaN(date) ? null : date;
    },
  
    // Get year from date
    getYear: (dateStr) => {
      const date = DateUtil.parseDate(dateStr);
      return date ? date.getFullYear().toString() : '';
    },
  
    // Get full month name (e.g., "April")
    getMonth: (dateStr, locale = 'default') => {
      const date = DateUtil.parseDate(dateStr);
      return date ? date.toLocaleString(locale, { month: 'long' }) : '';
    },
  
    // Get day of the month
    getDay: (dateStr) => {
      const date = DateUtil.parseDate(dateStr);
      return date ? date.getDate().toString() : '';
    },
  
    // Get a simple date (e.g., "April 6, 2025")
    simpleDate: (dateStr, locale = undefined) => {
      const date = DateUtil.parseDate(dateStr);
      return date
        ? date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '';
    },
  
    // Get a relative time
    relativeTime: (dateStr, referenceStr = new Date().toISOString(), sentence = false) => {
      const date = DateUtil.parseDate(dateStr);
      const referenceDate = DateUtil.parseDate(referenceStr);
      if (!date || !referenceDate) return sentence ? 'at an unknown time' : '';
  
      const diffMs = referenceDate - date;
  
      const seconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months =
        referenceDate.getMonth() -
        date.getMonth() +
        12 * (referenceDate.getFullYear() - date.getFullYear());
      const years = referenceDate.getFullYear() - date.getFullYear();
  
      if (years > 0) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return sentence ? `on ${date.toLocaleDateString(undefined, options)}` : date.toLocaleDateString(undefined, options);
      }
  
      if (months > 0) {
        const options = { month: sentence ? 'long' : 'short', day: 'numeric' };
        return sentence ? `on ${date.toLocaleDateString(undefined, options)}` : date.toLocaleDateString(undefined, options);
      }
  
      if (days > 0) {
        return sentence ? `roughly ${days} day${days === 1 ? '' : 's'} ago` : `${days}d ago`;
      }
  
      if (hours > 0) {
        return sentence ? `about ${hours} hour${hours === 1 ? '' : 's'} ago` : `${hours}h ago`;
      }
  
      if (minutes > 0) {
        return sentence ? `around ${minutes} minute${minutes === 1 ? '' : 's'} ago` : `${minutes}m ago`;
      }
  
      return sentence ? 'literally right now' : 'Just now';
    },
  
    // Get the time (custom format)
    getTime: (dateStr, format = '12h', locale = undefined) => {
      const date = DateUtil.parseDate(dateStr);
      if (!date) return '';
  
      switch (format) {
        case '24h':
          return date.toLocaleTimeString(locale, { hour12: false, hour: '2-digit', minute: '2-digit' });
        case '12h':
          return date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', hour12: true });
        case 'withSeconds':
          return date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
        case '24hWithSeconds':
          return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        default:
          return date.toLocaleTimeString(locale);
      }
    },
  };
  
  export default DateUtil;
  