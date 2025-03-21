import { $http } from ".";
interface LogListParams {
  page: number;
  pageSize: number;
}


export const getLogListApi = (params: LogListParams) => {
  return $http({
    url: "/logs",
    method: "GET",
    params,
  });
};
