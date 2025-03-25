import { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import toast from "react-hot-toast";

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const { uploadImage, imageUrl, uploading } = useProductStore();

  const handleUpload = async () => {
    if (!image) return toast.error("Please select an image first!");

    const formData = new FormData();
    formData.append("productImage", image);
    try {
      uploadImage(formData);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-base-200 border border-base-300  rounded-lg shadow-md">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-fit object-cover rounded-lg border border-base-300"
        />
      )}

      <button
        onClick={handleUpload}
        className={`btn btn-neutral w-full max-w-xs`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && <p>Image Url: {imageUrl}</p>}
    </div>
  );
};

export default UploadImage;
