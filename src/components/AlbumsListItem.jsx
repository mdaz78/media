import { GoTrashcan } from "react-icons/go";
import { useDeleteAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

export default function AlbumsListITem({ album }) {
  const [removeAlbum, results] = useDeleteAlbumMutation();

  const handleDelete = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex items-center space-x-2">
      <Button
        loading={results.isLoading}
        onClick={handleDelete}
        className="rounded-md"
      >
        <GoTrashcan />
      </Button>
      <p>{album.title}</p>
    </div>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album
    </ExpandablePanel>
  );
}
