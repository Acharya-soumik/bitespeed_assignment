const Header = ({ onSave }) => {
  return (
    <header className="bg-gray-100 py-2 px-20 flex flex-col h-[10vh] justify-center">
      <button
        onClick={onSave}
        className="border border-emerald-600 text-emerald-600 py-3 px-5 rounded text-xs hover:shadow-md ml-auto"
      >
        Save Changes
      </button>
    </header>
  );
};

export default Header;
