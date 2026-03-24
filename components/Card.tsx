/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import { convertFileSize } from '@/lib/utils';
// import FormattedDateTime from './FormattedDateTime';
import ActionDropdown from './ActionDropdown';

const Card = ({
  file,
  owner,
}: {
  file: Models.Document;
  owner: string | any;
}) => {
  return (
    <Link href={(file as any).url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={(file as any).type}
          extension={(file as any).extension}
          url={(file as any).url}
          className="size-18"
          // imageClassName="size-11!"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} owner={owner} />
          <p className="body-2">{convertFileSize((file as any).size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{(file as any).name}</p>
        {/* <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">By: {owner}</p> */}
      </div>
    </Link>
  );
};

export default Card;
