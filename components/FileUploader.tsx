/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
import { MAX_FILE_SIZE } from '@/constants';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/actions/file.actions';
import { usePathname } from 'next/navigation';

interface Props {
  ownerId: string;
  accountId: string;
  className: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );
          toast.error(`${file.name} is too large. Max file size is 50MB`);
          return;
        }

        try {
          const uploadedFile = await uploadFile({
            file,
            ownerId,
            accountId,
            path,
          });

          // 🔥 duplicate detect venit de pe server
          if (uploadedFile?.error) {
            toast(uploadedFile.message);

            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name),
            );
            return;
          }

          // inregistram
          if (uploadedFile) {
            toast(`${file.name} ✅ Successfully Uploaded!`);

            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name),
            );
          }
        } catch (error: any) {
          //controlom pentru oricare eroare
          toast.error(error.message);

          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );
        }
      });
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn('uploader-button cursor-pointer', className)}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item "
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                    className="size-12"
                  />
                  <div className="preview-item-name">
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="Loader"
                      width={32}
                      height={40}
                      className="mr-1"
                    />
                    {file.name}
                  </div>
                </div>
                <Image
                  src="/assets/icons/close-dark.svg"
                  alt="Remove"
                  width={24}
                  height={24}
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
