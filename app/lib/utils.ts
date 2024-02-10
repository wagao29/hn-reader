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

export const validatePageNum = (pageParams?: string | null): number => {
  const pageNum = Number(pageParams);
  return pageNum && pageNum >= 1 ? pageNum : 1;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
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
