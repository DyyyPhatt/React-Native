import {Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Lock, Sms, User} from 'iconsax-react-native';
import {Validate} from '../../utils/validate';
import axios from 'axios';

const SignUpScreen = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);
    const passwordsMatch = password === confirmPassword;
    if (
      !userName ||
      !email ||
      !password ||
      !passwordsMatch ||
      !emailValidation
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [userName, email, password, confirmPassword]);

  const handleSignUp = async () => {
    try {
      // Gọi API đăng ký
      const response = await axios.post(
        'http://10.0.2.2:8088/api/users/register',
        {
          username: userName,
          email: email,
          password: password,
        },
      );

      // Kiểm tra đăng ký thành công
      if (response.data) {
        console.log('Registration successful');

        // Sau khi đăng ký thành công, chờ 3 giây rồi chuyển sang màn hình xác thực OTP
        setTimeout(() => {
          navigation.navigate('VerifyOtpScreen', {email: email});
        }, 3000);
      } else {
        console.log('Registration failed', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
        <TextComponent size={24} title text="Create Account" />
        <SpaceComponent height={21} />
        <InputComponent
          value={userName}
          placeholder="User Name"
          onChange={val => setUserName(val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
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
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="SIGN UP"
          onPress={handleSignUp} // Gọi API đăng ký
          type="primary"
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Already have an account?" />
          <ButtonComponent
            type="link"
            text="Sign in"
            onPress={() => navigation.goBack()}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
