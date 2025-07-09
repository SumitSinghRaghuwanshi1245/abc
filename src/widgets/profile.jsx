// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import Hint from "./hint";

const Profile = () => {
  return (
    <>
      <Hint label={<p>Profile</p>} align="center" alignOffset={10}>
        <div className="-m-2 flex items-center p-1">
          <Link to="/signup">
            <CircleUserRound
              aria-hidden="true"
              className="h-6 w-6 flex-shrink-0 text-zinc-600 group-hover:text-zinc-700 dark:text-zinc-400"
            />
          </Link>
        </div>
      </Hint>
    </>
  );
};

export default Profile;
