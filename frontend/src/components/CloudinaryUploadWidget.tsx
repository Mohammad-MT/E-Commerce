import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: { createUploadWidget: (config: object, callback: (error: Error | null, result: { event: string; info: { secure_url: string } } | null) => void) => { open: () => void } };
  }
}

interface CloudinaryUploadWidgetProps {
  uwConfig: object; // Replace 'object' with a more specific type if available
  setPublicId: (url: string) => void;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef<{ open: () => void } | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error: Error | null, result: { event: string; info: { secure_url: string } } | null) => {
            if (!error && result && result.event === "success") {
              console.log("Upload successful:", result.info);
              setPublicId(result.info.secure_url);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener("click", handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener("click", handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
