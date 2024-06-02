import { GoTrashcan } from "react-icons/go";
import { useRemovePhotosMutation } from "../store";
import Button from "./Button";

const PhotosListItem = ({ photo }) => {
  const [deletePhoto, deletePhotoResult] = useRemovePhotosMutation();

  return (
    <div className="relative cursor-pointer">
      <img src={photo.url} alt="a random image" className="w-20 h-20" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:bg-slate-200 hover:opacity-80">
        <Button loading={deletePhotoResult.isLoading}>
          <GoTrashcan className="text-3xl" onClick={() => deletePhoto(photo)} />
        </Button>
      </div>
    </div>
  );
};

export default PhotosListItem;
