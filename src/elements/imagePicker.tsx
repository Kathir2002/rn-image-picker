import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

export interface ImageLibraryOption {
  ImageLibraryOption: ImageLibraryOption;
}
interface ImageProps {
  options: ImageLibraryOptions;
  didCancel?: () => void;
  error?: () => void;
  type: "launchImageLibrary" | "launchCamera";
}

const ImagePicker = ({ options, didCancel, error, type }: ImageProps) => {
  return new Promise((resolve, reject) => {
    if (type == "launchImageLibrary") {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          didCancel ? didCancel() : resolve(response);
        } else if (response.errorCode) {
          error
            ? error()
            : reject(new Error(response.errorMessage || "Unknown error"));
        } else {
          resolve(response.assets);
        }
      });
    } else {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          didCancel ? didCancel() : resolve(response);
        } else if (response.errorCode) {
          error
            ? error()
            : reject(new Error(response.errorMessage || "Unknown error"));
        } else {
          resolve(response.assets);
        }
      });
    }
  });
};

export default ImagePicker;

export type { ImageLibraryOptions };
