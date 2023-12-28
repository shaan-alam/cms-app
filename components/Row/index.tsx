import { Row } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

type RowComponentProps = {
  row: Row;
};

const RowComponent = ({ row }: RowComponentProps) => {
  const queryClient = useQueryClient();

  const [updateRowId, setUpdateRowId] = useState("");
  const [data, setData] = useState<Row>({
    ...row,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const { id, ...payload } = data;
      const { data: responseData } = await axios.post(
        `/api/row/${updateRowId}`,
        payload
      );
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-rows"]);
      setUpdateRowId("");
    },
  });

  const { mutate: deleteRow, isLoading: isDeleting } = useMutation({
    mutationFn: async ({ rowId }: { rowId: string }) => {
      const { data } = await axios.delete(`/api/row/${rowId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(["fetch-rows"]);
    },
  });

  const inputClassName =
    "p-2 border-2 rounded-md outline-none focus:border-blue-500 w-full";

  return (
    <>
      {updateRowId === row.id ? (
        <>
          <tr className="border-b" key={row.id}>
            <td className="p-4">
              <input
                className={inputClassName}
                value={data?.firstName}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
              />
            </td>
            <td className="p-4">
              <input
                className={inputClassName}
                value={data?.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </td>
            <td className="p-4">
              <input
                className={inputClassName}
                value={data?.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </td>
            <td className="p-4">
              <input
                className={inputClassName}
                value={data?.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </td>
            <td className="p-4 flex items-center space-x-4">
              <button
                className="p-2 bg-green-400 text-white rounded-md flex items-center"
                onClick={() => mutate()}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </button>
              <button
                className="p-2 ml-2 bg-red-400 text-white rounded-md"
                onClick={() => setUpdateRowId("")}
              >
                Cancel
              </button>
            </td>
          </tr>
        </>
      ) : (
        <tr className="border-b" key={row.id}>
          <td className="p-4">{row.firstName}</td>
          <td className="p-4">{row.lastName}</td>
          <td className="p-4">{row.email}</td>
          <td className="p-4">{row.address}</td>
          <td className="p-4 flex items-center space-x-2">
            <button
              onClick={() => setUpdateRowId(row.id)}
              className="p-2 bg-blue-400 text-white rounded-md"
            >
              Update
            </button>
            <button
              onClick={() => deleteRow({ rowId: row.id })}
              className="p-2 rounded-md"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {!isDeleting && <X className="text-red-500" />}
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
export default RowComponent;
