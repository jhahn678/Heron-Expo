import { Text, Title } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useMapModalStore } from "../../../store/modal/useMapModalStore";
import { useGetCatchFragment, GetCatchRes } from "../../../hooks/queries/useGetCatch";

const CatchesBottomSheet = () => {
  const [data, setData] = useState<GetCatchRes["catch"] | null>(null);
  const getFromCache = useGetCatchFragment();
  const visible = useMapModalStore((store) => store.catchVisible);
  const catchId = useMapModalStore((store) => store.catchId);

  useEffect(() => {
    if (!catchId) setData(null);
    if (catchId) setData(getFromCache(catchId));
  }, [catchId]);

  if (!visible) return null;

  return (
    <BottomSheet
      style={{ paddingHorizontal: 16 }}
      snapPoints={["10%", "40%"]}
      index={0}
    >
      {data && <Title style={styles.title}>{data.title}</Title>}
    </BottomSheet>
  );
};

export default CatchesBottomSheet;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 8,
  },
});
