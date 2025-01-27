import { Link } from 'react-router-dom';


const Header = ( ) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow h-14 items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img src={LogoIcon} alt="Logo" /> */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
