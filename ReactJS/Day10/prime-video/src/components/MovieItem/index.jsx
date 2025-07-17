import Popup from 'reactjs-popup';
import ReactPlayer from 'react-player';
import { IoMdClose } from 'react-icons/io';
import 'reactjs-popup/dist/index.css'; // Keep this for base popup styles

/**
 * MovieItem Component:
 * Displays a movie thumbnail that, when clicked, opens a popup with the movie video.
 * Styling is now handled by Tailwind CSS utility classes.
 */
const MovieItem = ({ movieDetails }) => {
  // Destructure movieDetails prop to extract thumbnailUrl and videoUrl
  const { thumbnailUrl, videoUrl } = movieDetails;

  return (
    <div>
      {/* Popup component to display the movie video.
        The 'className' prop here styles the popup's content container.
      */}
      <Popup
        modal
        trigger={
          // Trigger element: an image thumbnail with Tailwind classes
          <img
            className="w-[215px] h-[150px] rounded-lg cursor-pointer xl:w-[254px] xl:h-[170px]"
            src={thumbnailUrl}
            alt="thumbnail"
          />
        }
        // These classes replace the old `.popup-content` CSS rule
        className="bg-white rounded-2xl w-auto max-w-[750px] h-auto"
      >
        {close => (
          // This container replaces the old `.modal-container`
          <div className="flex flex-col p-4 sm:p-6">
            {/* Close button with Tailwind classes */}
            <button
              className="self-end bg-transparent border-none outline-none cursor-pointer"
              type="button"
              data-testid="closeButton"
              onClick={() => close()}
            >
              <IoMdClose size={28} color="#231f20" />
            </button>
            {/* This container replaces `.movie-player-container` and adds responsive aspect ratio.
            */}
            <div className="relative w-full aspect-video mt-2">
              {/* ReactPlayer is now responsive, filling its parent container */}
              <ReactPlayer
                src={videoUrl}
                controls
                width="650px" 
                height="360px"
                className="absolute top-0 left-0"
              />
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default MovieItem;
