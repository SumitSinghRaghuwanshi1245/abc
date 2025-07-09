import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardFooter } from "../../shared/ui/card";
import { useUserContext } from "../../shared/context/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../shared/axios_API/axios";
import toast from "react-hot-toast";

const ProfileContent = () => {
  const { user, setUser } = useUserContext();
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsUpdated(true);
  };

  const handleUpdateProfile = async () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const userDob = new Date(updatedUser?.dob);
    if (userDob > today || userDob < minDate) {
      toast.error("Enter correct Date of Birth... ");
      return;
    }
    try {
       const id = updatedUser._id;
       console.log(id);
       const response = await axiosInstance.put(`/user/update-profile`,updatedUser);
               toast.success("Profile updated successfully!");
        setUser(updatedUser);
        setIsUpdated(false);  

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error);
    }
  };

  const handleValidation = () => {
    const error = validateAction(tempraryUser);
    if (error && error.length > 0) {
      toast.error(error.join(", "), 1000)
      return false;
    }
    return true
  }

  const handleProfileUpdate = async () => {

    const isValid = handleValidation()
    if (!isValid) return;

    const response = await updateUserprofile(tempraryUser)
    if (!response.success) {
      toast.error(response.message, 1000)
      return;
    }
    setUser(tempraryUser)

    return toast.success(response.message, 1000)
  }

  return (
    <Card className="w-full max-w-4xl m-4 mx-auto ">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="w-full">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="FirstName"
              name="firstName"
              value={updatedUser?.firstName || ""}
              onChange={handleInputChange}
              placeholder="First Name"
              className="mt-2"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="LastName"
              name="lastName"
              value={updatedUser?.lastName || ""}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="mt-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="w-full">
            <Label htmlFor="gender">Gender *</Label>
            <select
  id="gender"
  name="gender"
  value={updatedUser?.gender?.charAt(0).toUpperCase() + updatedUser?.gender?.slice(1) || ""}
  onChange={handleInputChange}
  className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
          </div>
          <div className="w-full">
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input
              id="dob"
              type="date"
              name="dob"
              value={updatedUser?.dob || ""}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
        </div>

        <div className="w-full">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={updatedUser?.email || ""}
            onChange={handleInputChange}
            placeholder="user@example.com"
            className="mt-2"
          />
        </div>

        <div className="w-full">
          <Label htmlFor="phoneNumber">Phone Number (Non-Editable)</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={updatedUser?.phoneNumber || ""}
            readOnly
            className="mt-2 bg-gray-200 cursor-not-allowed"
          />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-end p-6">
        <Button
          onClick={handleUpdateProfile}
          disabled={!isUpdated}
          className={`px-8 py-2 text-white ${
            isUpdated ? "bg-primary hover:bg-primary-dark" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileContent;
