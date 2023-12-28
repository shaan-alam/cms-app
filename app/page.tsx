"use client";
import Table from "@/components/Table";
import { Row } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["fetch-rows"],
    queryFn: async () => {
      const { data } = await axios.get<{ rows: Row[] }>("/api/row");
      setRows(data.rows);
      return data.rows;
    },
  });

  const { mutate: addRow, isLoading: isAddingNewRow } = useMutation({
    mutationFn: async () => {
      const newRow = {
        address: "",
        email: "",
        firstName: "",
        lastName: "",
      };

      const { data } = await axios.post(`/api/row`, { ...newRow });
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(["fetch-rows"]);
    },
  });

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="container">
        {isLoading && <p>Loading Table....</p>}

        {!isLoading && rows && <Table rows={rows} />}
        <button
          className="my-12 p-4 rounded-md text-white bg-black flex items-center space-x-4"
          onClick={() => addRow()}
        >
          {isAddingNewRow && <Loader2 className="h-4 w-4 animate-spin" />}
          Add Row
        </button>
      </div>
    </main>
  );
}
