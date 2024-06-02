import { useAddPhotosMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";

const PhotosList = ({ album }) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotosMutation();

  const handleAddPhoto = () => addPhoto(album);

  if (isFetching) {
    return <Skeleton className="w-8 h-8" times={4} />;
  }

  if (error) {
    return <div>Error Fetching Photos</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between m-2">
        <h3 className="text-lg font-bold">Photos is {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-wrap space-x-2">
        {data.map((photo) => (
          <PhotosListItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotosList;
