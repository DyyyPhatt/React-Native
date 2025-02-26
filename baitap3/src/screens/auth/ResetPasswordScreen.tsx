import {Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Lock, Sms} from 'iconsax-react-native';
import {Validate} from '../../utils/validate';
import axios from 'axios';

const ResetPasswordScreen = ({navigation, route}: any) => {
  const {email} = route.params; // Lấy email từ route params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const passwordsMatch = newPassword === confirmPassword;
    const otpIsValid = otp.length === 6;
    if (
      !newPassword ||
      !confirmPassword ||
      !otp ||
      !passwordsMatch ||
      !otpIsValid
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [newPassword, confirmPassword, otp]);

  const handleResetPassword = async () => {
    try {
      // Gọi API để reset mật khẩu
      const response = await axios.post(
        `http://10.0.2.2:8088/api/users/reset-password?email=${email}&newPassword=${newPassword}&otp=${otp}`,
      );

      if (response.data.includes('Password reset successfully')) {
        console.log('Password reset successfully');
        navigation.navigate('LoginScreen'); // Chuyển hướng về màn hình đăng nhập
      } else {
        console.log('Invalid OTP or OTP expired');
      }
    } catch (error) {
      console.error('Error during reset password:', error);
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent size={24} title text="Reset Password" />
        <SpaceComponent height={21} />
        <InputComponent
          value={newPassword}
          placeholder="New Password"
          onChange={val => setNewPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={val => setConfirmPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={otp}
          placeholder="Enter OTP"
          onChange={val => setOtp(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="RESET PASSWORD"
          onPress={handleResetPassword} // Gọi API reset mật khẩu
          type="primary"
        />
      </SectionComponent>
      <SectionComponent>
        <SpaceComponent height={16} />
        <ButtonComponent
          type="link"
          text="Back to Sign In"
          onPress={() => navigation.navigate('LoginScreen')} // Quay lại màn hình đăng nhập
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ResetPasswordScreen;
