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
import {Sms} from 'iconsax-react-native';
import {Validate} from '../../utils/validate';
import axios from 'axios';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);
    if (!email || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email]);

  const handleResetPassword = async () => {
    try {
      // Gọi API để gửi OTP
      const response = await axios.post(
        `http://10.0.2.2:8088/api/users/forgot-password?email=${email}`,
      );

      if (response.data.includes('OTP')) {
        console.log('OTP sent to email');
        // Chuyển đến màn hình reset password sau khi gửi OTP thành công
        setTimeout(() => {
          navigation.navigate('ResetPassword', {email: email}); // Chuyển đến màn hình Reset Password
        }, 3000); // 3 giây
      } else {
        console.log('Email not found');
      }
    } catch (error) {
      console.error('Error during forgot password:', error);
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
        <TextComponent size={24} title text="Forgot Password" />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder="Enter your email"
          onChange={val => setEmail(val)}
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
          onPress={() => navigation.goBack()} // Quay lại màn hình đăng nhập
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
