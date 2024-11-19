import { atom } from "recoil";

export const userSignState = atom({
  key: `userSign`,
  default: {
    userInfo: {
      userId: null,
      username: null,
      phoneNumber: null,
      email: null,
      password: null,
      userAssignment: null,
      userAgreement: false,
    },
    userDriverInfo: {
      vehicleNumber: null,
      vehicleType: "차종",
      standard: "규격",
      chassis: "샤시",
      vehicleFeatures: [],
    },
    cargoLicense: null,
    driverLicense: null,
    businessLicense: null,
    carRegistration: null,
    cargoInsuranceCertificate: null,
  },
});
