import useSuccesses from "../../hooks/useSuccesses";
import useErrors from "../../hooks/useErrors";

const Header = ({ userName }) => {
  const { score } = useSuccesses();
  const { errors } = useErrors();
  return (
    <header className="mb-2">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 rounded-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            User: {userName}
          </span>
          <div className="flex items-center lg:order-2">
            <div className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              <span>Aciertos: </span>
              <span>{score ?? 0}</span>
            </div>
            <div className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              <span>Errores: </span>
              <span>{errors ?? 0}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
