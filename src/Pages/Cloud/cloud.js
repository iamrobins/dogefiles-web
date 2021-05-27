import { Text, VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";

import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilesTable from "./files-table";

export default function Cloud() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { fetchValue } = useSelector(state => state.refetchR);

  const { isLoading, data, refetch } = useQuery(
    "listUploads",
    () => listUploads(currentUser.uid),
    {
      cacheTime: 1,
    }
  );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    refetch();
    dispatch(() => dispatch({ type: "toggle" }));
  }, [fetchValue, dispatch, refetch]);

  return (
    <>
      <Skeleton
        // isLoaded={files.length !== 0}
        isLoaded={!isLoading}
        startColor="gray"
        endColor="gray.200"
      >
        <VStack align="left">
          <Text color="gray.400">Recents</Text>
          {!isLoading && <FilesTable files={data} />}
        </VStack>
      </Skeleton>
    </>
  );
}
