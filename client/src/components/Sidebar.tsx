import Link from "next/link"

const Sidebar: React.FC = () => (
  <div className="flex w-full h-92v">
    <div className="flex flex-col items-center justify-between h-full py-5 border-r border-primary w-1/18">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-12 h-12 mb-12 rounded-full bg-secondary">
          <i className="h-auto text-xl fas fa-home text-secondary"></i>
        </div>
        <div className="flex items-center justify-center w-12 h-12 mb-12 rounded-full bg-secondary">
          <i className="h-auto text-xl fas fa-plus text-secondary"></i>
        </div>
        <div className="flex items-center justify-center w-12 h-12 mb-12 rounded-full bg-secondary">
          <i className="h-auto text-xl fas fa-users text-secondary"></i>
        </div>
        <div className="flex items-center justify-center w-12 h-12 mb-12 rounded-full bg-secondary">
          <i className="h-auto text-xl fas fa-sign-out-alt text-secondary"></i>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
          <i className="h-auto text-xl fas fa-id-card-alt text-secondary"></i>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;