import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  if (isLoading || isFetching) {
    return <Skeleton times={3} className="w-full h-10" />;
  }

  if (error) {
    return <div>Error loading albums</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between m-2">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button onClick={handleAddAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>
        {data.map((album) => {
          return (
            <ExpandablePanel key={album.id} header={<div>{album.title}</div>}>
              List of photos in the album
            </ExpandablePanel>
          );
        })}
      </div>
    </div>
  );
}

export default AlbumsList;
