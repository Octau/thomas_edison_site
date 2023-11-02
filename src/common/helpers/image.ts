import Resizer from 'react-image-file-resizer';

interface ResizeImageProps {
  imageToResize: any;
  width: number;
  height: number;
  type?: string;
}

export async function ResizeImage(
  props: ResizeImageProps,
): Promise<string | File | Blob | ProgressEvent<FileReader>> {
  const { imageToResize, type = 'JPEG', width, height } = props;

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      imageToResize,
      width,
      height,
      type,
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });
}

const types = ['jpeg', 'jpg', 'png'];
export function ImageUrlConverter(url) {
  if (url.includes('blob')) {
    const _type = types.filter((item) => url?.includes(item));
    const source = url.substring(0, url.length - (_type?.[0]?.length + 1));
    return source;
  }
  return url;
}
