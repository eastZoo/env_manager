import dayjs from "dayjs";
import { showAlert } from "../../components/containers/Alert";

export const validateDateRange = (
  startDate?: string | null,
  endDate?: string | null,
  range: number = 30 // 범위 추가
): boolean => {
  if (!startDate || !endDate) {
    showAlert("날짜를 입력해주세요.");
    return false;
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const oneMonthLater = start.add(range, "days");

  if (start > end) {
    showAlert("종료 날짜는 시작 날짜보다 이후여야 합니다.");
    return false;
  }
  if (end.isAfter(oneMonthLater)) {
    showAlert(`조회 기간은 ${range}일을 초과할 수 없습니다.`);
    return false;
  }

  return true;
};

export const validateBeforeCheck = (
  startDate?: string | null,
  endDate?: string | null
): boolean => {
  if (!startDate || !endDate) {
    showAlert("날짜를 입력해주세요.");
    return false;
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (start > end) {
    showAlert("종료 날짜는 시작 날짜보다 이후여야 합니다.");
    return false;
  }

  return true;
};
