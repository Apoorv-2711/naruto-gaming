import Info from "@/components/Info";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};

const anime = async (props: Props) => {
  const { id } = props.params;

  return (
    <div>
      <Info id={id} />
    </div>
  );
};

export default anime;
