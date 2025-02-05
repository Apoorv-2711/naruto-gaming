import Info from "@/components/Info";
import { getAnimeAboutInfo } from "@/server/narutogaming/scrappers/animeAboutInfo";
import { QueryClient } from "@tanstack/react-query";
type Props = {
  params: {
    id: string;
  };
};

const anime = async (props: Props) => {
  const { id } = props.params;

  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["animeAboutInfo", id],
    queryFn: () => getAnimeAboutInfo(id),
    staleTime: 0,
  });

  console.log(data, "data");

  return (
    <div>
      <Info animeData={data} />
    </div>
  );
};

export default anime;
