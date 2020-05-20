import React, {ReactElement} from 'react';
import useVideos from 'hooks/useVideos/useVideos';
import Spinner from 'components/Spinner/Spinner';

type Props = {
  id: string;
};

function Videos({id}: Props) {
  const {response, error, isLoading} = useVideos(id);

  return (
    <>
      {!isLoading && response ? (
        response.map(({id, title}) => <div> {title} </div>)
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Videos;
