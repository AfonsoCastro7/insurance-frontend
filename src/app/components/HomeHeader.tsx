import React from "react";

type HomeHeaderProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ setIsModalOpen }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold text-sky-900">MediadorTrack</h1>
        <p className="text-sm text-gray-600 mt-1">
          Acompanha os pedidos e simulaçoes num só lugar.
        </p>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-2 rounded-xl font-semibold transition-transform shadow-md hover:shadow-lg active:scale-95"
      >
        + Nova Simulacao
      </button>
    </div>
  );
};

export default HomeHeader;
