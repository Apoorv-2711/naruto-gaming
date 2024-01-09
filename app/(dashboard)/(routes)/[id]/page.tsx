// import Info from "@/components/Info";
type Props = {
  params: {
    id: string;
  };
};

const anime = async (props: Props) => {
  // const { id } = props.params;

  // const dataforAnimeInfo = async (id: string) => {
  //   const res = await fetch(`http://localhost:3000/api/animeInfo`, {
  //     cache: "no-cache",
  //     method: "POST",
  //     body: JSON.stringify({ id }),
  //   });
  //   const data = await res.json();

  //   if (res.ok) {
  //     return data;
  //   } else {
  //     throw new Error("Error while Fetching Data...");
  //   }
  // };

  // const data = await dataforAnimeInfo(id);

  return (
    <div>
      {/* <Info animeData={data} /> */}
      Hello
    </div>
  );
};

export default anime;
