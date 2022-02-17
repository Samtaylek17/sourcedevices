import { FC, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';
import LottieFile from 'assets/404.json';

const NotFound: FC = () => {
  const imageRef = useRef<any>(null);

  const Vector = useCallback(({ style }) => {
    useEffect(() => {
      lottie.loadAnimation({
        container: imageRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: LottieFile
      });
    }, []);

    return <span style={style} ref={imageRef} />;
  }, []);

  return (
    <div className="container">
      <div className="flex h-screen flex-col items-center justify-center">
        <Vector />
        <div className="mx-auto text-center">
          <Link to="/" className="bg-primary text-white py-2 px-4 rounded-md">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
