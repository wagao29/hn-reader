export const formatTimeAgo = (unixTime: number): string => {
  const diff = Date.now() - unixTime * 1000;
  if (diff <= 0) return '0 minutes ago';

  const elapsed = new Date(diff);
  if (elapsed.getUTCFullYear() - 1970) {
    return `${elapsed.getUTCFullYear() - 1970} ${elapsed.getUTCFullYear() - 1970 === 1 ? 'year ago' : 'years ago'}`;
  } else if (elapsed.getUTCMonth()) {
    return `${elapsed.getUTCMonth()} ${elapsed.getUTCMonth() === 1 ? 'month ago' : 'months ago'}`;
  } else if (elapsed.getUTCDate() - 1) {
    return `${elapsed.getUTCDate() - 1} ${elapsed.getUTCDate() - 1 === 1 ? 'day ago' : 'days ago'}`;
  } else if (elapsed.getUTCHours()) {
    return `${elapsed.getUTCHours()} ${elapsed.getUTCHours() === 1 ? 'hour ago' : 'hours ago'}`;
  } else if (elapsed.getUTCMinutes()) {
    return `${elapsed.getUTCMinutes()} ${elapsed.getUTCMinutes() === 1 ? 'minute ago' : 'minutes ago'}`;
  } else {
    return '0 minutes ago';
  }
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
