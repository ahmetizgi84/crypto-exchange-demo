import * as yup from 'yup';

const validationMessage = 'Required Field';

// const bDateValidator = (date = null) => {
//   if (date) {
//     let currentYear = moment().year();
//     const splitted = date.split('.')
//     const day = parseInt(splitted[0])
//     const month = parseInt(splitted[1])
//     const year = parseInt(splitted[2])

//     if (day > 31) {
//       return false
//     }

//     if (month > 12) {
//       return false
//     }

//     if (year < 1930 || year > currentYear) {
//       return false
//     }

//     return true
//   }
// }

const verifyIdentityNo = TCNO => {
  let tek = 0,
    cift = 0,
    sonuc = 0,
    TCToplam = 0;

  if (TCNO) {
    if (TCNO.length !== 11) return false;
    if (isNaN(parseInt(TCNO))) return false;
    if (TCNO.charAt(0) === '0') return false;

    tek =
      parseInt(TCNO.charAt(0)) +
      parseInt(TCNO.charAt(2)) +
      parseInt(TCNO.charAt(4)) +
      parseInt(TCNO.charAt(6)) +
      parseInt(TCNO.charAt(8));
    cift = parseInt(TCNO.charAt(1)) + parseInt(TCNO.charAt(3)) + parseInt(TCNO.charAt(5)) + parseInt(TCNO.charAt(7));

    tek = tek * 7;
    sonuc = Math.abs(tek - cift);
    if (sonuc % 10 !== parseInt(TCNO.charAt(9))) return false;

    for (let i = 0; i < 10; i++) {
      TCToplam += parseInt(TCNO.charAt(i));
    }

    if (TCToplam % 10 !== parseInt(TCNO.charAt(10))) return false;

    return true;
  }
};

const verifyTaxNumber = kno => {
  if (kno) {
    if (kno.length === 10) {
      let v = [];
      let lastDigit = Number(kno.charAt(9));
      for (let i = 0; i < 9; i++) {
        let tmp = (Number(kno.charAt(i)) + (9 - i)) % 10;
        v[i] = (tmp * 2 ** (9 - i)) % 9;
        if (tmp !== 0 && v[i] === 0) v[i] = 9;
      }
      let sum = v.reduce((a, b) => a + b, 0) % 10;
      return (10 - (sum % 10)) % 10 === lastDigit;
    }
    return false;
  }
};

function validateIBAN(iban) {
  if (iban) {
    let newIban = iban.toUpperCase().split(' ').join('');
    let modulo = function (divident, divisor) {
      let cDivident = '';
      let cRest = '';

      for (let i in divident) {
        let cChar = divident[i];
        let cOperator = cRest + '' + cDivident + '' + cChar;

        if (cOperator < parseInt(divisor)) {
          cDivident += '' + cChar;
        } else {
          cRest = cOperator % divisor;
          if (cRest === 0) {
            cRest = '';
          }
          cDivident = '';
        }
      }
      cRest += '' + cDivident;
      if (cRest === '') {
        cRest = 0;
      }
      return cRest;
    };

    if (newIban.search(/^[A-Z]{2}/gi) < 0) {
      return false;
    }

    newIban = newIban.substring(4) + newIban.substring(0, 4);

    newIban = newIban.replace(/[A-Z]/g, function (match) {
      return match.charCodeAt(0) - 55;
    });

    return parseInt(modulo(newIban, 97), 10) === 1;
  }
}

const LoginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required(validationMessage),
  password: yup.string().required(validationMessage),
  reCaptcha: yup.string().required(validationMessage)
});

const RegisterSchemaIndividual = yup.object().shape({
  identificationNo: yup
    .string()
    .min(11, 'ID number cannot be less than 11 digits.')
    .max(11, 'ID number cannot be more than 11 digits.')
    .test('test-identityNo', 'Enter a valid ID number', identityNo => verifyIdentityNo(identityNo))
    .required(validationMessage),
  email: yup.string().email('Enter a valid email address').required(validationMessage),
  name: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  surname: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  birthDate: yup.string().required(validationMessage),
  phoneNumber: yup.string().required(validationMessage),
  password: yup
    .string()
    .min(8, ({ min }) => 'Password must be at least ' + min + ' characters!')
    .matches(/\w*[a-z]\w*/, 'Must contain at least one lowercase letter!')
    .matches(/\w*[A-Z]\w*/, 'Must contain at least one capital letter!')
    .matches(/\d/, 'Must contain at least one digit!')
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Must contain at least one special character!')
    .required(validationMessage),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match!'),
  referralID: yup.string(),
  reCaptcha: yup.string().required(validationMessage),
  termsOne: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  termsTwo: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  termsThree: yup.bool().required().oneOf([true], 'Terms must be accepted')
});

const RegisterSchemaCorporate = yup.object().shape({
  tenantName: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  identificationNo: yup
    .string()
    .test('test-identityNo', 'Enter a valid tax number', taxNumber => verifyTaxNumber(taxNumber))
    .required(validationMessage),
  subjectOfActivity: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  taxOffice: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  tradeRegisterNumber: yup.string().required(validationMessage),
  address: yup.string().required(validationMessage),
  website: yup
    .string()
    .required(validationMessage)
    .matches(
      /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w[a-zA-Z-_%@?]+)*([^\w[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      'Enter correct url!'
    ),
  workPhoneNumber: yup.string().required(validationMessage),
  workEmail: yup.string().email('Enter a valid email address').required(validationMessage),
  name: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  surname: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Use only letters for this field!')
    .required(validationMessage),
  mobileNumber: yup.string().required(validationMessage),
  email: yup.string().email('Enter a valid email address').required(validationMessage),
  password: yup
    .string()
    .min(8, ({ min }) => 'Password must be at least ' + min + ' characters!')
    .matches(/\w*[a-z]\w*/, 'Must contain at least one lowercase letter!')
    .matches(/\w*[A-Z]\w*/, 'Must contain at least one capital letter!')
    .matches(/\d/, 'Must contain at least one digit!')
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Must contain at least one special character!')
    .required(validationMessage),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match!'),
  reCaptcha: yup.string().required(validationMessage),
  termsOne: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  termsTwo: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  termsThree: yup.bool().required().oneOf([true], 'Terms must be accepted')
});

const UpdatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(validationMessage),
  newPassword: yup
    .string()
    .required(validationMessage)
    .min(8, ({ min }) => 'Password must be at least ' + min + ' characters!')
    .matches(/\w*[a-z]\w*/, 'Must contain at least one lowercase letter!')
    .matches(/\w*[A-Z]\w*/, 'Must contain at least one capital letter!')
    .matches(/\d/, 'Must contain at least one digit!')
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Must contain at least one special character!')
});

const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required(validationMessage),
  reCaptcha: yup.string().required(validationMessage)
});

const CreateSubAccountSchema = yup.object().shape({
  identificationNo: yup
    .string()
    .min(11, 'ID number cannot be less than 11 digits.')
    .max(11, 'ID number cannot be more than 11 digits.')
    //.test('test-identityNo', 'Enter a valid ID number', identityNo => verifyIdentityNo(identityNo))
    .required(validationMessage),
  name: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Bu alan için yalnızca harf kullanmalısınız!')
    .required(validationMessage),
  surname: yup
    .string()
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Bu alan için yalnızca harf kullanmalısınız!')
    .required(validationMessage),
  email: yup.string().email('Geçerli bir eposta adresi girin').required(validationMessage),
  birthDate: yup.string().required(validationMessage),
  phone: yup.string().required(validationMessage),
  password: yup
    .string()
    .min(8, ({ min }) => 'Şifre en az ' + min + ' karakter olmalıdır!')
    .matches(/\w*[a-z]\w*/, 'En az bir adet küçük harf içermelidir!')
    .matches(/\w*[A-Z]\w*/, 'En az bir adet büyük harf içermelidir!')
    .matches(/\d/, 'En az bir adet rakam içermelidir!')
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'En az bir adet özel karakter içermelidir!')
    .required(validationMessage),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor!'),
  referralID: yup.string().required(validationMessage),
  role: yup.string().required(validationMessage)
  //terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const BankAccountSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({ min }) => 'at least ' + min + ' characters!')
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Only letters allowed for this field!')
    .required(validationMessage),
  ownerName: yup
    .string()
    .min(3, ({ min }) => 'at least ' + min + ' characters!')
    .matches(/^[aA-zZğüşöçıİĞÜŞÖÇ\s]+$/, 'Only letters allowed for this field!')
    .required(validationMessage),
  bankName: yup.string().required(validationMessage),
  iban: yup
    .string()
    .required(validationMessage)
    .test('test-ibanNumber', 'Enter a valid iban number', iban => validateIBAN(iban)),
  currencyType: yup.string().required(validationMessage)
});

const AddWhitelistIpSchema = yup.object().shape({
  label: yup.string().required(validationMessage),
  ip: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Enter valid IP address!'
    )
    .required(validationMessage)
});

const AddWhitelistAddressesSchemaOne = yup.object().shape({
  label: yup.string().required(validationMessage),
  coin: yup.string().required(validationMessage),
  address: yup.string().required(validationMessage),
  network: yup.string().required(validationMessage),
  originType: yup.string().required(validationMessage)
});

const AddWhitelistAddressesSchemaTwo = yup.object().shape({
  label: yup.string().required(validationMessage),
  address: yup.string().required(validationMessage),
  network: yup.string().required(validationMessage),
  originType: yup.string().required(validationMessage)
});

const ChangeEmailSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required(validationMessage)
});
const ChangePhoneSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    // .matches(
    //   /([\+]90?)([ ]?)(\([0-9]{3}\))([0-9]{3})([0-9]{2})([0-9]{2})/,
    //   "Telephone number is invalid"
    //   )
    .required(validationMessage)
});

export {
  LoginSchema,
  RegisterSchemaIndividual,
  RegisterSchemaCorporate,
  UpdatePasswordSchema,
  ResetPasswordSchema,
  CreateSubAccountSchema,
  AddWhitelistIpSchema,
  AddWhitelistAddressesSchemaOne,
  AddWhitelistAddressesSchemaTwo,
  BankAccountSchema,
  ChangeEmailSchema,
  ChangePhoneSchema
};
