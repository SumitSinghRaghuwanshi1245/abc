// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../shared/lib/utils";
import loader from "../shared/assets/loadingcartrgs.webp";

const AppLogo = ({ className, width, height }) => {
  return (
    <img
      src={loader}
      alt="Logo"
      className={cn(className, "duration-[10s] object-contain")}
      width={width || 60}
      height={height || 60}
    />
  );
};

export default AppLogo;
