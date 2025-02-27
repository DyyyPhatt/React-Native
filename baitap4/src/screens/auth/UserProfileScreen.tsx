import React, {useState, useEffect} from 'react';
import {Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Lock, Sms, User, Camera} from 'iconsax-react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

const UserProfileScreen = ({navigation, route}: any) => {
  const {email} = route.params;
  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    avatar: '',
    address: {
      street: '',
      communes: '',
      district: '',
      city: '',
    },
    isVerified: false,
  });
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [oldPhoneNumber, setOldPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://10.0.2.2:8088/api/users/profile?email=${email}`,
        );
        const fetchedUser = response.data;

        setUser({
          username: fetchedUser.username,
          email: fetchedUser.email,
          phoneNumber: fetchedUser.phoneNumber,
          avatar: fetchedUser.avatar || 'default-avatar-url',
          address: {
            street: fetchedUser.address.street || '',
            communes: fetchedUser.address.communes || '',
            district: fetchedUser.address.district || '',
            city: fetchedUser.address.city || '',
          },
          isVerified: fetchedUser.verified,
        });

        setOldPhoneNumber(fetchedUser.phoneNumber);
        setIsDisable(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const handleInputChange = (field: string, value: any) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleAddressChange = (field: string, value: any) => {
    setUser({
      ...user,
      address: {
        ...user.address,
        [field]: value,
      },
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare the address as a JSON string
      const addressJson = JSON.stringify(user.address);

      // Create FormData to send the data
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('username', user.username);
      formData.append('phoneNumber', user.phoneNumber);
      formData.append('address', addressJson);

      if (user.avatar && user.avatar !== 'default-avatar-url') {
        const avatar = {
          uri: user.avatar,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        };
        formData.append('avatar', avatar);
      }

      const response = await axios.post(
        'http://10.0.2.2:8088/api/users/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data) {
        console.log('User profile updated successfully');
        if (user.phoneNumber !== oldPhoneNumber) {
          navigation.navigate('VerifyOtpScreen', {email: user.email});
        } else {
          setLoading(true);
          const response = await axios.get(
            `http://10.0.2.2:8088/api/users/profile?email=${user.email}`,
          );
          const fetchedUser = response.data;

          setUser({
            username: fetchedUser.username,
            email: fetchedUser.email,
            phoneNumber: fetchedUser.phoneNumber,
            avatar: fetchedUser.avatar || 'default-avatar-url',
            address: {
              street: fetchedUser.address.street || '',
              communes: fetchedUser.address.communes || '',
              district: fetchedUser.address.district || '',
              city: fetchedUser.address.city || '',
            },
            isVerified: fetchedUser.verified,
          });

          setOldPhoneNumber(fetchedUser.phoneNumber);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError('Failed to update profile. Please try again later.');
    }
  };

  const handleAvatarChange = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0].uri;
        setUser({
          ...user,
          avatar: selectedImage,
        });
      }
    });
  };

  if (loading) {
    return (
      <ContainerComponent isImageBackground isScroll>
        <ActivityIndicator size="large" color={appColors.primary} />
        <TextComponent text="Loading user data..." />
      </ContainerComponent>
    );
  }

  if (error) {
    return (
      <ContainerComponent isImageBackground isScroll>
        <TextComponent text={error} color={appColors.danger} />
      </ContainerComponent>
    );
  }

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <TouchableOpacity onPress={handleAvatarChange}>
          <Image
            source={{uri: user.avatar}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20,
            }}
          />
          <Camera
            size={30}
            color={appColors.primary}
            style={{position: 'absolute', bottom: 5, right: 5}}
          />
        </TouchableOpacity>
        <TextComponent size={24} title text="User Profile" />
      </SectionComponent>

      <SectionComponent>
        <InputComponent
          value={user.username}
          placeholder="Username"
          onChange={val => handleInputChange('username', val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={user.email}
          placeholder="Email"
          editable={false} // Disable email field
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={user.phoneNumber}
          placeholder="Phone Number"
          onChange={val => handleInputChange('phoneNumber', val)}
          allowClear
        />
      </SectionComponent>

      <SectionComponent>
        <TextComponent text="Address" size={18} />
        <InputComponent
          value={user.address.street}
          placeholder="Street Address"
          onChange={val => handleAddressChange('street', val)}
          allowClear
        />
        <InputComponent
          value={user.address.communes}
          placeholder="Commune"
          onChange={val => handleAddressChange('communes', val)}
          allowClear
        />
        <InputComponent
          value={user.address.district}
          placeholder="District"
          onChange={val => handleAddressChange('district', val)}
          allowClear
        />
        <InputComponent
          value={user.address.city}
          placeholder="City"
          onChange={val => handleAddressChange('city', val)}
          allowClear
        />
      </SectionComponent>

      <SectionComponent>
        <TextComponent size={16} text="Email Verified: " />
        <TextComponent
          size={16}
          text={user.isVerified ? 'Yes' : 'No'}
          color={user.isVerified ? appColors.primary : appColors.danger}
        />
      </SectionComponent>

      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="SAVE CHANGES"
          onPress={handleSaveChanges}
          type="primary"
        />
      </SectionComponent>

      <SectionComponent>
        <SpaceComponent height={16} />
        <ButtonComponent
          type="link"
          text="Change Password"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </SectionComponent>

      <SectionComponent>
        <SpaceComponent height={16} />
        <ButtonComponent
          type="link"
          text="Back to Dashboard"
          onPress={() => navigation.goBack()}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default UserProfileScreen;
