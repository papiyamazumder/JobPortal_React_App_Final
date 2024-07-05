import React, { useState, useEffect } from 'react';
import ProfileDisplay from './profileDisplay.js';
import ProfileForm from './profileform.js';
import { useAuth } from '../../Auth/AuthProvider';
import { getUserProfile } from '../../Api/usersApi'; // Assuming this function fetches user profile
 
function Display() {
  const [profileCreated, setProfileCreated] = useState(false);
  const { userEmail } = useAuth();
 
  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(userEmail); // Fetch user profile
        if (userProfile) {
          setProfileCreated(true); // If profile exists, set profileCreated to true
        } else {
          setProfileCreated(false); // If profile does not exist, set profileCreated to false
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error fetching user profile
      }
    };
 
    if (userEmail) {
      checkUserProfile();
    }
  }, [userEmail]);
 
  const handleProfileCreate = () => {
    setProfileCreated(true); // Set profileCreated to true when profile is created
  };
 
  const handleEdit = () => {
    setProfileCreated(false); // Switch back to ProfileForm
  };
 
  const handleCancel = () => {
    setProfileCreated(true); // Switch back to ProfileDisplay without saving changes
  };
 
  return (
<div>
      {profileCreated ? (
<ProfileDisplay userEmail={userEmail} onEdit={handleEdit} />
      ) : (
<ProfileForm userEmail={userEmail} onCreate={handleProfileCreate} onCancel={handleCancel} />
      )}
</div>
  );
}
 
export default Display;

