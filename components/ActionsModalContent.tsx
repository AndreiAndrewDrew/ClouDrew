/* eslint-disable @typescript-eslint/no-explicit-any */
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import FormattedDateTime from './FormattedDateTime';
import { convertFileSize, formatDateTime } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail
        type={(file as any).type}
        extension={(file as any).extension}
        url={(file as any).url}
        className="size-42"
      />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{(file as any).name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | any;
}) => (
  <div className="flex">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export const FileDetails = ({
  file,
  owner,
}: {
  file: Models.Document;
  owner: string | any;
}) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <DetailRow label="Format:" value={(file as any).extension} />
      <DetailRow label="Size:" value={convertFileSize((file as any).size)} />
      <DetailRow label="Owner:" value={owner} />
      <DetailRow label="Created:" value={formatDateTime(file.$createdAt)} />
      <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Share file with other Users
        </p>
        <Input
          type="email"
          placeholder="Enter email adress"
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {(file as any).users.length} users
            </p>
          </div>
          <ul className="pt-2">
            {(file as any).users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
