/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import ActionDropdown from './ActionDropdown';
import { convertFileSize } from '@/lib/utils';

const Card = ({
  file,
  owner,
}: {
  file: Models.Document;
  owner: string | any;
}) => {
  return (
    <Link href={(file as any).url} target="_blank" className="file-card">
      <div className="flex justify-between gap-3">
        <Thumbnail
          type={(file as any).type}
          extension={(file as any).extension}
          url={(file as any).url}
          className="size-12"
        />

        <div className="recent-file-details">
          <div className="flex flex-col gap-1">
            <p className="recent-file-name">{(file as any).name}</p>
            <p className="body-2">{convertFileSize((file as any).size)}</p>
          </div>
          <ActionDropdown file={file} owner={owner} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
