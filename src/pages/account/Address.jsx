// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PencilIcon, MapPinIcon } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import Hint from "../../widgets/hint";
import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { useUserStore } from "../../app/providers/zustandStoreApi";

const Address = () => {
  const navigate = useNavigate();
  const { user, allAddress, isLoading, fetchUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress } = useUserStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ Name: "", Number: "", Pincode: "", Locality: "", Area: "", City: "", State: "" });
  const [editingAddress, setEditingAddress] = useState(null);

  const openPopup = () => {
    setNewAddress({ Name: "", Number: "", Pincode: "", Locality: "", Area: "", City: "", State: "" });
    setEditingAddress(null);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditingAddress(null);
  };

  const handleAddAddress = async () => {
    if (newAddress.Pincode && newAddress.Locality && newAddress.Area && newAddress.City && newAddress.State) {
      const result = await addUserAddress(user.userId, user.phoneNumber, {
        Pincode: newAddress.Pincode,
        Area: newAddress.Area,
        City: newAddress.City,
        State: newAddress.State,
        Locality: newAddress.Locality
      });

      if (result.success) {
        toast.success(result.message);
        closePopup();
        // Refresh addresses to update the cities array in localStorage
        fetchUserAddresses(user.userId);
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("Fill all details...");
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({ ...address });
    setEditingAddress(address);
    setIsPopupOpen(true);
  };

  const handleUpdateAddress = async () => {
    if (!editingAddress) return;
    const result = await updateUserAddress(user.userId, editingAddress);
    if (result.success) {
      toast.success(result.message);
      // Refresh addresses to update the cities array in localStorage
      fetchUserAddresses(user.userId);
      closePopup();
    } else {
      toast.error(result.message);
    }
  };

  // Extract cities from addresses and store in localStorage
  const storeCitiesInLocalStorage = (addresses) => {
    if (!addresses || addresses.length === 0) return;
    
    // Extract unique cities from all addresses
    const uniqueCities = [...new Set(addresses.map(address => address.City).filter(Boolean))];
    
    // Store the array in localStorage
    localStorage.setItem('userCities', JSON.stringify(uniqueCities));
    
    // Optional: log to console for debugging
    console.log('Stored cities in localStorage:', uniqueCities);
  };

  useEffect(() => {
    if (user?.userId) {
      fetchUserAddresses(user.userId);
    }
  }, [user?.userId, fetchUserAddresses]);

  // Effect to update cities in localStorage whenever addresses change
  useEffect(() => {
    if (allAddress && allAddress.length > 0) {
      storeCitiesInLocalStorage(allAddress);
    }
  }, [allAddress]);

  return (
    <Card className="w-full p-0 m-0 mx-auto border-0 rounded-none">
      <CardHeader className="flex flex-col items-center justify-between">
        <div className="flex justify-between w-full">
          <CardTitle>All Saved Addresses</CardTitle>
          <Button className="text-white bg-primary" onClick={openPopup}>Add New Address</Button>
        </div>
      </CardHeader>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="Pincode">Pincode</Label>
                  <Input
                    id="Pincode"
                    value={editingAddress ? editingAddress.Pincode : newAddress.Pincode}
                    onChange={(e) =>
                      editingAddress
                        ? setEditingAddress({ ...editingAddress, Pincode: e.target.value })
                        : setNewAddress({ ...newAddress, Pincode: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="Locality">Locality</Label>
                  <Input
                    id="Locality"
                    value={editingAddress ? editingAddress.Locality : newAddress.Locality}
                    onChange={(e) =>
                      editingAddress
                        ? setEditingAddress({ ...editingAddress, Locality: e.target.value })
                        : setNewAddress({ ...newAddress, Locality: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="Area">Address (Area & Street)</Label>
                  <Input
                    id="Area"
                    value={editingAddress ? editingAddress.Area : newAddress.Area}
                    onChange={(e) =>
                      editingAddress
                        ? setEditingAddress({ ...editingAddress, Area: e.target.value })
                        : setNewAddress({ ...newAddress, Area: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="City">City</Label>
                  <Input
                    id="City"
                    value={editingAddress ? editingAddress.City : newAddress.City}
                    onChange={(e) =>
                      editingAddress
                        ? setEditingAddress({ ...editingAddress, City: e.target.value })
                        : setNewAddress({ ...newAddress, City: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="State">State</Label>
                  <Input
                    id="State"
                    value={editingAddress ? editingAddress.State : newAddress.State}
                    onChange={(e) =>
                      editingAddress
                        ? setEditingAddress({ ...editingAddress, State: e.target.value })
                        : setNewAddress({ ...newAddress, State: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button 
                  onClick={editingAddress ? handleUpdateAddress : handleAddAddress} 
                  className="w-full text-white bg-blue-600 hover:bg-blue-700">
                  {editingAddress ? "Update Address" : "Add Address"}
                </Button>
                <Button 
                  onClick={closePopup} 
                  className="w-full text-white bg-gray-400 hover:bg-gray-500">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CardContent className="w-full my-5">
        {isLoading ? (
          <div className="text-center">Loading addresses...</div>
        ) : allAddress.length === 0 ? (
          <div className="w-full text-sm text-left text-black lg:text-base">No addresses found</div>
        ) : (
          allAddress.map((address) => (
            <div key={address._id} className="flex items-start my-4 space-x-4">
              <MapPinIcon className="w-5 h-5 mt-1 text-gray-500" />
              <div className="flex-grow">
                <h3 className="font-semibold">{address?.Locality}</h3>
                <p className="text-sm text-gray-600">{address.Area} {address.City} {address.State} ({address.Pincode})</p>
              </div>
              <Hint label="Edit">
                <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)}>
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                </Button>
              </Hint>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Address;