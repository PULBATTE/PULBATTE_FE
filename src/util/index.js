import { ko } from 'date-fns/locale';
import { formatDistanceToNow, format } from 'date-fns';
/**
 *
 * @param {string} createdAt ex) 2023-01-12T00:04:45.020757
 * @returns {string} ex) 방금전, x일 전, 2022년 12월 22일 00:04
 */
export function formatDate(createdAts) {
  const d = new Date(createdAts);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE p', { locale: ko }); // 날짜 포맷
}
